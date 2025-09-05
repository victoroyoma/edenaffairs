import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DollarSign, Calendar, BarChart, Target, Users, CheckCircle, X } from 'lucide-react';
import { Button } from '../components/Button';
export function Adverts() {
  // Sample advertising packages
  const advertisingPackages = [{
    id: 1,
    title: 'Basic Visibility',
    price: '₦15,000',
    duration: '1 month',
    features: ['Banner ad on browse page', '7 days featured in rotation', 'Basic analytics dashboard', 'Email support'],
    notIncluded: ['Homepage placement', 'Featured in search results', 'Dedicated account manager'],
    recommended: false,
    color: 'border-slate-600'
  }, {
    id: 2,
    title: 'Premium Spotlight',
    price: '₦45,000',
    duration: '1 month',
    features: ['Banner ad on browse page', '30 days featured in rotation', 'Homepage featured placement', 'Enhanced analytics dashboard', 'Priority in search results', 'Priority email support'],
    notIncluded: ['Dedicated account manager', 'Custom campaign design'],
    recommended: true,
    color: 'border-amber-400'
  }, {
    id: 3,
    title: 'VIP Campaign',
    price: '₦120,000',
    duration: '3 months',
    features: ['Premium banner placement site-wide', '90 days featured placement', 'Top position in homepage carousel', 'Priority in all search results', 'Advanced analytics & reporting', 'Dedicated account manager', 'Custom campaign design', '24/7 priority support'],
    notIncluded: [],
    recommended: false,
    color: 'border-slate-600'
  }];
  // Sample business advertisers
  const businessAdvertisers = [{
    name: 'Luxury Suites Hotel',
    logo: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.0.3',
    industry: 'Hospitality'
  }, {
    name: 'Crystal Nightclub',
    logo: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    industry: 'Entertainment'
  }, {
    name: 'Elite Transportation',
    logo: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    industry: 'Transportation'
  }, {
    name: 'Bliss Spa & Wellness',
    logo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    industry: 'Wellness'
  }];
  return <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advertise With Us
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Reach a premium audience of sophisticated individuals looking for
              exclusive experiences and connections.
            </p>
          </div>
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Why Advertise on EdenAffairs?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-amber-400/20 p-2 rounded-full">
                      <Target size={20} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        Premium Audience
                      </h3>
                      <p className="text-gray-400">
                        Access to high-income, sophisticated users seeking
                        luxury experiences.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-amber-400/20 p-2 rounded-full">
                      <Users size={20} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        Growing User Base
                      </h3>
                      <p className="text-gray-400">
                        Reach thousands of active users across major Nigerian
                        cities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-amber-400/20 p-2 rounded-full">
                      <BarChart size={20} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        Detailed Analytics
                      </h3>
                      <p className="text-gray-400">
                        Track performance with comprehensive metrics and
                        reporting.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-amber-400/20 p-2 rounded-full">
                      <Calendar size={20} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        Flexible Campaigns
                      </h3>
                      <p className="text-gray-400">
                        Options from short-term promotions to long-term
                        partnerships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 rounded-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Advertising benefits" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Perfect For:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-amber-400 mr-2" />
                      <span>Luxury hotels and accommodations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-amber-400 mr-2" />
                      <span>Exclusive restaurants and lounges</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-amber-400 mr-2" />
                      <span>High-end fashion and accessories</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-amber-400 mr-2" />
                      <span>Premium transportation services</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-amber-400 mr-2" />
                      <span>Event planning and entertainment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Advertising Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {advertisingPackages.map(pkg => <div key={pkg.id} className={`bg-slate-800 rounded-xl border-2 ${pkg.recommended ? pkg.color + ' relative' : pkg.color} overflow-hidden`}>
                  {pkg.recommended && <div className="absolute top-0 right-0 bg-amber-400 text-slate-900 px-4 py-1 text-sm font-medium">
                      Most Popular
                    </div>}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {pkg.title}
                    </h3>
                    <div className="flex items-end mb-4">
                      <span className="text-3xl font-bold text-white">
                        {pkg.price}
                      </span>
                      <span className="text-gray-400 ml-2">
                        / {pkg.duration}
                      </span>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-300 mb-2">
                        Includes:
                      </h4>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, index) => <li key={index} className="flex items-center text-sm">
                            <CheckCircle size={16} className="text-green-400 mr-2" />
                            <span>{feature}</span>
                          </li>)}
                      </ul>
                    </div>
                    {pkg.notIncluded.length > 0 && <div className="mb-6">
                        <h4 className="font-medium text-gray-300 mb-2">
                          Not included:
                        </h4>
                        <ul className="space-y-2">
                          {pkg.notIncluded.map((feature, index) => <li key={index} className="flex items-center text-sm text-gray-400">
                              <X size={16} className="text-gray-500 mr-2" />
                              <span>{feature}</span>
                            </li>)}
                        </ul>
                      </div>}
                    <Button variant={pkg.recommended ? 'primary' : 'outline'} fullWidth>
                      <DollarSign size={16} className="mr-2" />
                      Select Package
                    </Button>
                  </div>
                </div>)}
            </div>
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Trusted By
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {businessAdvertisers.map((business, index) => <div key={index} className="bg-slate-800 rounded-xl p-4 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img src={business.logo} alt={business.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-white text-center">
                      {business.name}
                    </h3>
                    <p className="text-gray-400 text-sm text-center">
                      {business.industry}
                    </p>
                  </div>)}
              </div>
            </div>
            <div className="mt-16 bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Promote Your Business?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Contact our advertising team today to discuss custom packages
                and special promotions tailored to your business needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="primary">Get Started</Button>
                <Button variant="outline">Download Media Kit</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}