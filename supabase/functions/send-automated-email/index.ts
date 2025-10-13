import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

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

      let personalizedContent = content;

      // AI personalization (placeholder for your AI API integration)
      if (useAI) {
        personalizedContent = await personalizeWithAI(content, customer);
      }

      // Simulate email sending (integrate with SendGrid, Resend, etc.)
      const emailResult = await sendEmail(customer.email, subject, personalizedContent);

      // Log interaction
      await supabase.from('customer_interactions').insert({
        customer_id: customerId,
        interaction_type: 'email_sent',
        description: `Sent email: ${subject}`,
        metadata: { subject, ai_personalized: useAI },
      });

      return new Response(
        JSON.stringify({ success: true, message: 'Email sent', emailResult }),
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
        let personalizedContent = campaign.content;

        if (campaign.ai_personalized) {
          personalizedContent = await personalizeWithAI(campaign.content, customer);
        }

        const emailResult = await sendEmail(customer.email, campaign.subject, personalizedContent);
        results.push({ customer: customer.email, status: emailResult.success ? 'sent' : 'failed' });

        // Log interaction
        await supabase.from('customer_interactions').insert({
          customer_id: customer.id,
          interaction_type: 'email_sent',
          description: `Campaign: ${campaign.name}`,
          metadata: { campaign_id: campaignId, subject: campaign.subject },
        });
      }

      // Update campaign status
      await supabase
        .from('email_campaigns')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', campaignId);

      return new Response(
        JSON.stringify({ success: true, message: `Sent ${results.length} emails`, results }),
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

// AI personalization function (integrate with OpenAI, Anthropic, etc.)
async function personalizeWithAI(content: string, customer: Customer): Promise<string> {
  // Replace {{first_name}}, {{company}}, etc. with customer data
  let personalized = content
    .replace(/{{first_name}}/g, customer.first_name || 'there')
    .replace(/{{last_name}}/g, customer.last_name || '')
    .replace(/{{company}}/g, customer.company || 'your company')
    .replace(/{{email}}/g, customer.email);

  // TODO: Add actual AI API call here
  // Example with OpenAI:
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     model: 'gpt-4',
  //     messages: [{
  //       role: 'user',
  //       content: `Personalize this email for ${customer.first_name}: ${personalized}`
  //     }]
  //   })
  // });

  return personalized;
}

// Email sending function (integrate with SendGrid, Resend, etc.)
async function sendEmail(to: string, subject: string, content: string) {
  // TODO: Replace with actual email service integration
  // Example with Resend:
  // const response = await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     from: 'noreply@yourdomain.com',
  //     to,
  //     subject,
  //     html: content,
  //   })
  // });

  console.log(`Simulated email sent to ${to}: ${subject}`);
  return { success: true, message: 'Email sent (simulated)' };
}
