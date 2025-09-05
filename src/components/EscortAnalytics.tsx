import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Eye, Phone, Download } from 'lucide-react';
import { Button } from './Button';

interface EscortAnalyticsProps {
  escortId: string;
  className?: string;
}

interface AnalyticsData {
  profileViews: {
    total: number;
    thisMonth: number;
    growth: number;
  };
  contactPurchases: {
    total: number;
    thisMonth: number;
    revenue: number;
    growth: number;
  };
  demographics: {
    ageGroups: Array<{ age: string; count: number; percentage: number }>;
    locations: Array<{ location: string; count: number; percentage: number }>;
  };
  performance: {
    conversionRate: number;
    averageViewTime: number;
  };
}

export function EscortAnalytics({ escortId, className = '' }: EscortAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    profileViews: {
      total: 1247,
      thisMonth: 342,
      growth: 23
    },
    contactPurchases: {
      total: 89,
      thisMonth: 24,
      revenue: 890000,
      growth: 18
    },
    demographics: {
      ageGroups: [
        { age: '25-34', count: 45, percentage: 35.4 },
        { age: '35-44', count: 38, percentage: 29.9 },
        { age: '45-54', count: 28, percentage: 22.0 },
        { age: '19-24', count: 16, percentage: 12.6 }
      ],
      locations: [
        { location: 'Lagos', count: 67, percentage: 52.8 },
        { location: 'Abuja', count: 34, percentage: 26.8 },
        { location: 'Port Harcourt', count: 18, percentage: 14.2 },
        { location: 'Ibadan', count: 8, percentage: 6.3 }
      ]
    },
    performance: {
      conversionRate: 7.2,
      averageViewTime: 145
    }
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    // Mock analytics data - in real app, fetch from API
    const mockData: AnalyticsData = {
      profileViews: {
        total: 2847,
        thisMonth: 456,
        growth: 23.5
      },
      contactPurchases: {
        total: 127,
        thisMonth: 23,
        revenue: 254000,
        growth: 18.2
      },
      demographics: {
        ageGroups: [
          { age: '25-34', count: 45, percentage: 35.4 },
          { age: '35-44', count: 38, percentage: 29.9 },
          { age: '45-54', count: 28, percentage: 22.0 },
          { age: '19-24', count: 16, percentage: 12.6 }
        ],
        locations: [
          { location: 'Lagos', count: 67, percentage: 52.8 },
          { location: 'Abuja', count: 34, percentage: 26.8 },
          { location: 'Port Harcourt', count: 18, percentage: 14.2 },
          { location: 'Ibadan', count: 8, percentage: 6.3 }
        ]
      },
      performance: {
        conversionRate: 8.1,
        averageViewTime: 145
      }
    };

    setTimeout(() => {
      setAnalytics(mockData);
      setLoading(false);
    }, 1000);
  }, [escortId, dateRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (!analytics) return null;

  const statCards = [
    {
      title: 'Profile Views',
      value: analytics.profileViews.total.toLocaleString(),
      change: `+${analytics.profileViews.growth}%`,
      period: 'this month',
      icon: <Eye size={24} />,
      color: 'text-blue-400'
    },
    {
      title: 'Contact Purchases',
      value: analytics.contactPurchases.total.toString(),
      change: `+${analytics.contactPurchases.growth}%`,
      period: 'this month',
      icon: <Phone size={24} />,
      color: 'text-green-400'
    },
    {
      title: 'Revenue Generated',
      value: `₦${analytics.contactPurchases.revenue.toLocaleString()}`,
      change: `+${analytics.contactPurchases.growth}%`,
      period: 'this month',
      icon: <DollarSign size={24} />,
      color: 'text-amber-400'
    },
    {
      title: 'Conversion Rate',
      value: `${analytics.performance.conversionRate}%`,
      change: '+2.1%',
      period: 'this month',
      icon: <TrendingUp size={24} />,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-gray-400">Track your profile performance and earnings</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" size="sm" icon={<Download size={16} />}>
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-slate-700 ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <p className="text-gray-500 text-xs">{stat.period}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Profile Views Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Profile Views Trend</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Total Views</span>
              <span className="text-amber-400 font-bold">{analytics.profileViews.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">This Month</span>
              <span className="text-green-400 font-bold">{analytics.profileViews.thisMonth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Growth</span>
              <span className="text-green-400 font-bold">+{analytics.profileViews.growth}%</span>
            </div>
            <div className="mt-4 p-4 bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <TrendingUp className="text-green-400" size={16} />
                <span>Trending upward - great profile performance!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Total Revenue</span>
              <span className="text-green-400 font-bold">₦{analytics.contactPurchases.revenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Contact Purchases</span>
              <span className="text-blue-400 font-bold">{analytics.contactPurchases.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">This Month</span>
              <span className="text-green-400 font-bold">{analytics.contactPurchases.thisMonth} purchases</span>
            </div>
            <div className="mt-4 p-4 bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <DollarSign className="text-green-400" size={16} />
                <span>Revenue increased {analytics.contactPurchases.growth}% this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demographics and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Age Demographics */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Client Demographics</h3>
          <div className="space-y-3">
            {analytics.demographics.ageGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300">{group.age}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full"
                      style={{ width: `${group.percentage}%` }}
                    />
                  </div>
                  <span className="text-purple-400 text-sm font-medium">{group.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Top Locations</h3>
          <div className="space-y-3">
            {analytics.demographics.locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300">{location.location}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-amber-400 h-2 rounded-full"
                      style={{ width: `${(location.count / analytics.demographics.locations[0].count) * 100}%` }}
                    />
                  </div>
                  <span className="text-amber-400 text-sm font-medium">{location.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Conversion Rate</span>
                <span className="text-green-400">{analytics.performance.conversionRate}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: `${analytics.performance.conversionRate * 10}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Avg. View Time</span>
                <span className="text-blue-400">{analytics.performance.averageViewTime}s</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full"
                  style={{ width: `${Math.min(analytics.performance.averageViewTime / 3, 100)}%` }}
                />
              </div>
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Top Performing Content</h4>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Profile Picture</span>
                <span>1,247 views</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Gallery Photos</span>
                <span>890 views</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Description</span>
                <span>756 reads</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-400 mb-2">What's Working Well</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                Your conversion rate is above average for your tier
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                Profile views increased by {analytics.profileViews.growth}% this month
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                Peak activity hours align with client preferences
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-amber-400 mb-2">Areas for Improvement</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                Consider updating your gallery with fresh photos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                Expand your bio to highlight unique services
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                Upgrade to Premium for better visibility
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
