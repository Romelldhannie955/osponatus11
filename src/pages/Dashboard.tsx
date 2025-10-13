import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Mail, TrendingUp, Activity, Tag, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Stats {
  totalCustomers: number;
  activeCustomers: number;
  totalCampaigns: number;
  sentCampaigns: number;
  recentInteractions: number;
  topTags: Array<{ tag: string; count: number }>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalCustomers: 0,
    activeCustomers: 0,
    totalCampaigns: 0,
    sentCampaigns: 0,
    recentInteractions: 0,
    topTags: [],
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const [customersRes, campaignsRes, interactionsRes] = await Promise.all([
        supabase.from('customers').select('status, tags'),
        supabase.from('email_campaigns').select('status'),
        supabase
          .from('customer_interactions')
          .select('*, customers(first_name, last_name, email)')
          .order('created_at', { ascending: false })
          .limit(10),
      ]);

      const customers = customersRes.data || [];
      const campaigns = campaignsRes.data || [];
      const interactions = interactionsRes.data || [];

      const activeCustomers = customers.filter((c) => c.status === 'active').length;
      const sentCampaigns = campaigns.filter((c) => c.status === 'sent').length;

      const tagCounts: Record<string, number> = {};
      customers.forEach((customer) => {
        customer.tags?.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

      const topTags = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentInteractions = interactions.filter(
        (i) => new Date(i.created_at) > sevenDaysAgo
      ).length;

      setStats({
        totalCustomers: customers.length,
        activeCustomers,
        totalCampaigns: campaigns.length,
        sentCampaigns,
        recentInteractions,
        topTags,
      });

      setRecentActivity(interactions);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Overview of your customer automation system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="text-blue-600" size={24} />}
            title="Total Customers"
            value={stats.totalCustomers}
            subtitle={`${stats.activeCustomers} active`}
            link="/customers"
          />
          <StatCard
            icon={<Mail className="text-green-600" size={24} />}
            title="Campaigns"
            value={stats.totalCampaigns}
            subtitle={`${stats.sentCampaigns} sent`}
            link="/campaigns"
          />
          <StatCard
            icon={<Activity className="text-purple-600" size={24} />}
            title="Recent Activity"
            value={stats.recentInteractions}
            subtitle="Last 7 days"
          />
          <StatCard
            icon={<TrendingUp className="text-orange-600" size={24} />}
            title="Active Rate"
            value={
              stats.totalCustomers > 0
                ? `${Math.round((stats.activeCustomers / stats.totalCustomers) * 100)}%`
                : '0%'
            }
            subtitle="Customer engagement"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="text-gray-600 dark:text-gray-400" size={20} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Top Customer Tags
              </h2>
            </div>
            {stats.topTags.length > 0 ? (
              <div className="space-y-3">
                {stats.topTags.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                        {item.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(item.count / stats.totalCustomers) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No tags yet. Add tags to customers to see segmentation.
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-gray-600 dark:text-gray-400" size={20} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            {recentActivity.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Activity size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white font-medium">
                        {activity.customers?.first_name} {activity.customers?.last_name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No recent activity
              </p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to engage your customers?</h2>
              <p className="text-blue-100 mb-4">
                Create personalized campaigns and automate your customer communications
              </p>
              <div className="flex gap-3">
                <Link
                  to="/customers"
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
                >
                  Add Customers
                </Link>
                <Link
                  to="/campaigns"
                  className="bg-blue-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-900 transition"
                >
                  Create Campaign
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <Mail size={120} className="text-blue-400 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  link?: string;
}) {
  const content = (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500">{subtitle}</p>
    </div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
}
