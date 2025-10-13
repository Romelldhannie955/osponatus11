import { useEffect, useState } from 'react';
import { supabase, EmailCampaign, Customer } from '../lib/supabase';
import { Plus, Send, Edit, Trash2, Calendar, Tag, Sparkles } from 'lucide-react';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<EmailCampaign | null>(null);
  const [sending, setSending] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    try {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCampaign(id: string) {
    if (!confirm('Are you sure you want to delete this campaign?')) return;

    try {
      const { error } = await supabase.from('email_campaigns').delete().eq('id', id);
      if (error) throw error;
      fetchCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  }

  async function sendCampaign(campaignId: string) {
    if (!confirm('Are you sure you want to send this campaign?')) return;

    setSending(campaignId);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/send-automated-email`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campaignId }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Campaign sent successfully! ${result.message}`);
        fetchCampaigns();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending campaign:', error);
      alert('Error sending campaign');
    } finally {
      setSending(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Email Campaigns</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create and manage automated email campaigns
            </p>
          </div>
          <button
            onClick={() => {
              setEditingCampaign(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            New Campaign
          </button>
        </div>

        <div className="grid gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {campaign.name}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'sent'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : campaign.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : campaign.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {campaign.status}
                    </span>
                    {campaign.ai_personalized && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                        <Sparkles size={12} />
                        AI Personalized
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    <strong>Subject:</strong> {campaign.subject}
                  </p>
                  {campaign.target_tags && campaign.target_tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <Tag size={16} className="text-gray-400" />
                      <div className="flex gap-1 flex-wrap">
                        {campaign.target_tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {campaign.scheduled_for && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar size={16} />
                      Scheduled for: {new Date(campaign.scheduled_for).toLocaleString()}
                    </div>
                  )}
                  {campaign.sent_at && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Send size={16} />
                      Sent: {new Date(campaign.sent_at).toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {campaign.status === 'draft' && (
                    <button
                      onClick={() => sendCampaign(campaign.id)}
                      disabled={sending === campaign.id}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      <Send size={18} />
                      {sending === campaign.id ? 'Sending...' : 'Send Now'}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditingCampaign(campaign);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => deleteCampaign(campaign.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {campaign.content.substring(0, 200)}
                  {campaign.content.length > 200 && '...'}
                </p>
              </div>
            </div>
          ))}

          {campaigns.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No campaigns yet</p>
              <button
                onClick={() => {
                  setEditingCampaign(null);
                  setShowModal(true);
                }}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Create your first campaign
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <CampaignModal
          campaign={editingCampaign}
          onClose={() => {
            setShowModal(false);
            setEditingCampaign(null);
          }}
          onSave={() => {
            setShowModal(false);
            setEditingCampaign(null);
            fetchCampaigns();
          }}
        />
      )}
    </div>
  );
}

function CampaignModal({
  campaign,
  onClose,
  onSave,
}: {
  campaign: EmailCampaign | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    name: campaign?.name || '',
    subject: campaign?.subject || '',
    content: campaign?.content || '',
    status: campaign?.status || 'draft',
    target_tags: campaign?.target_tags?.join(', ') || '',
    ai_personalized: campaign?.ai_personalized || false,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const campaignData = {
        ...formData,
        target_tags: formData.target_tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        created_by: campaign?.created_by,
      };

      if (campaign) {
        const { error } = await supabase
          .from('email_campaigns')
          .update(campaignData)
          .eq('id', campaign.id);
        if (error) throw error;
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { error } = await supabase
          .from('email_campaigns')
          .insert([{ ...campaignData, created_by: user?.id }]);
        if (error) throw error;
      }

      onSave();
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Error saving campaign');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {campaign ? 'Edit Campaign' : 'Create Campaign'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Campaign Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Summer Sale 2024"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Hi {{first_name}}, check out our summer deals!"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Use {'{{first_name}}'}, {'{{last_name}}'}, {'{{company}}'} for personalization
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Content *
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                placeholder="Hi {{first_name}},&#10;&#10;We're excited to share our summer sale with you!&#10;&#10;Best regards,&#10;Your Team"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Supports same personalization tags as subject
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.target_tags}
                onChange={(e) => setFormData({ ...formData, target_tags: e.target.value })}
                placeholder="vip, active, enterprise"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave empty to target all active customers
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ai_personalized"
                checked={formData.ai_personalized}
                onChange={(e) => setFormData({ ...formData, ai_personalized: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="ai_personalized"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <Sparkles size={16} className="text-purple-600" />
                Enable AI Personalization
              </label>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : campaign ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
