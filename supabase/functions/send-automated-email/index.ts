import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { Resend } from 'npm:resend@3.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface EmailRequest {
  campaignId?: string;
  customerId?: string;
  subject?: string;
  content?: string;
  useAI?: boolean;
}

interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  metadata: Record<string, any>;
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'RESEND_API_KEY not configured',
          instructions: 'Get your API key from https://resend.com/api-keys and add it to your Supabase project secrets'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const fromEmail = Deno.env.get('FROM_EMAIL') || 'onboarding@resend.dev';

    const { campaignId, customerId, subject, content, useAI }: EmailRequest = await req.json();

    // Send single email to specific customer
    if (customerId && subject && content) {
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .maybeSingle();

      if (customerError || !customer) {
        return new Response(
          JSON.stringify({ error: 'Customer not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      let personalizedSubject = subject;
      let personalizedContent = content;

      // Personalization
      if (useAI) {
        personalizedSubject = personalizeContent(personalizedSubject, customer);
        personalizedContent = personalizeContent(personalizedContent, customer);
      }

      // Send email via Resend
      const emailResult = await sendEmail(
        resendApiKey,
        fromEmail,
        customer.email,
        personalizedSubject,
        personalizedContent
      );

      if (!emailResult.success) {
        return new Response(
          JSON.stringify({ error: 'Failed to send email', details: emailResult.error }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Log interaction
      await supabase.from('customer_interactions').insert({
        customer_id: customerId,
        interaction_type: 'email_sent',
        description: `Sent email: ${personalizedSubject}`,
        metadata: { subject: personalizedSubject, ai_personalized: useAI, email_id: emailResult.id },
      });

      return new Response(
        JSON.stringify({ success: true, message: 'Email sent successfully', emailId: emailResult.id }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send campaign to multiple customers
    if (campaignId) {
      const { data: campaign, error: campaignError } = await supabase
        .from('email_campaigns')
        .select('*')
        .eq('id', campaignId)
        .maybeSingle();

      if (campaignError || !campaign) {
        return new Response(
          JSON.stringify({ error: 'Campaign not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get customers matching campaign tags
      let query = supabase.from('customers').select('*').eq('status', 'active');
      
      if (campaign.target_tags && campaign.target_tags.length > 0) {
        query = query.overlaps('tags', campaign.target_tags);
      }

      const { data: customers, error: customersError } = await query;

      if (customersError || !customers || customers.length === 0) {
        return new Response(
          JSON.stringify({ error: 'No customers found for campaign' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const results = [];
      for (const customer of customers) {
        let personalizedSubject = campaign.subject;
        let personalizedContent = campaign.content;

        if (campaign.ai_personalized) {
          personalizedSubject = personalizeContent(personalizedSubject, customer);
          personalizedContent = personalizeContent(personalizedContent, customer);
        }

        const emailResult = await sendEmail(
          resendApiKey,
          fromEmail,
          customer.email,
          personalizedSubject,
          personalizedContent
        );

        results.push({ 
          customer: customer.email, 
          status: emailResult.success ? 'sent' : 'failed',
          error: emailResult.error,
          emailId: emailResult.id
        });

        // Log interaction
        await supabase.from('customer_interactions').insert({
          customer_id: customer.id,
          interaction_type: 'email_sent',
          description: `Campaign: ${campaign.name}`,
          metadata: { 
            campaign_id: campaignId, 
            subject: personalizedSubject,
            email_id: emailResult.id,
            success: emailResult.success
          },
        });
      }

      // Update campaign status
      await supabase
        .from('email_campaigns')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', campaignId);

      const successCount = results.filter(r => r.status === 'sent').length;

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Sent ${successCount}/${results.length} emails successfully`, 
          results 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid request. Provide campaignId or (customerId + subject + content)' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Personalization function - replaces template variables with customer data
function personalizeContent(content: string, customer: Customer): string {
  return content
    .replace(/{{first_name}}/g, customer.first_name || 'there')
    .replace(/{{last_name}}/g, customer.last_name || '')
    .replace(/{{company}}/g, customer.company || 'your company')
    .replace(/{{email}}/g, customer.email);
}

// Email sending function using Resend
async function sendEmail(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  content: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html: content,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message || JSON.stringify(error) };
    }

    console.log(`Email sent successfully to ${to}, ID: ${data?.id}`);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}
