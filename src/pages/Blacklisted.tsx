import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Search, AlertTriangle, User, Clock, Shield } from 'lucide-react';
import { Button } from '../components/Button';
export function Blacklisted() {
  const [searchTerm, setSearchTerm] = useState('');
  // Sample blacklisted profiles data
  const blacklistedProfiles = [{
    id: 1,
    name: 'John Smith',
    age: 32,
    location: 'Lagos',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    reason: 'Payment fraud, fake profile',
    reportedBy: 'Multiple users',
    blacklistedDate: '2023-08-15',
    evidence: 'Multiple payment receipts without service'
  }, {
    id: 2,
    name: 'Rebecca Jones',
    age: 28,
    location: 'Abuja',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3',
    reason: 'Identity theft, using fake photos',
    reportedBy: 'User #104',
    blacklistedDate: '2023-09-22',
    evidence: 'Original photos found on stock websites'
  }, {
    id: 3,
    name: 'Michael Thomas',
    age: 35,
    location: 'Port Harcourt',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    reason: 'Aggressive behavior, threats',
    reportedBy: 'Multiple users',
    blacklistedDate: '2023-10-05',
    evidence: 'Screenshot of threatening messages'
  }, {
    id: 4,
    name: 'Sarah Williams',
    age: 26,
    location: 'Lagos',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    reason: 'Scamming, requesting advance payments',
    reportedBy: 'User #156',
    blacklistedDate: '2023-11-10',
    evidence: 'Payment receipts and chat logs'
  }];
  const filteredProfiles = blacklistedProfiles.filter(profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || profile.location.toLowerCase().includes(searchTerm.toLowerCase()) || profile.reason.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Blacklisted Profiles
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              These individuals have been reported and verified for fraudulent
              activities or harmful behavior. Protect yourself by checking this
              list before engaging with new contacts.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <input type="text" placeholder="Search by name, location, or reason..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-6">
              <div className="p-4 bg-slate-700 flex items-center">
                <AlertTriangle size={20} className="text-rose-500 mr-2" />
                <p className="text-white font-medium">
                  Warning: The individuals listed here have been reported for
                  misconduct. Exercise caution.
                </p>
              </div>
            </div>
            {filteredProfiles.length > 0 ? <div className="space-y-6">
                {filteredProfiles.map(profile => <div key={profile.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 h-48">
                        <div className="relative h-full">
                          <img src={profile.image} alt={profile.name} className="w-full h-full object-cover filter grayscale" />
                          <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center">
                            <Shield size={40} className="text-rose-500" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              {profile.name}, {profile.age}
                            </h3>
                            <p className="text-gray-400">{profile.location}</p>
                          </div>
                          <span className="bg-rose-500/20 text-rose-400 text-xs px-3 py-1 rounded-full flex items-center">
                            <AlertTriangle size={12} className="mr-1" />
                            Blacklisted
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-gray-300">
                              Reason:
                            </h4>
                            <p className="text-white">{profile.reason}</p>
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <User size={14} className="mr-1" />
                            <span>Reported by: {profile.reportedBy}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <Clock size={14} className="mr-1" />
                            <span>
                              Blacklisted on: {profile.blacklistedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-slate-700 p-4 bg-slate-700/50">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Evidence:
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {profile.evidence}
                      </p>
                    </div>
                  </div>)}
              </div> : <div className="text-center py-12">
                <AlertTriangle size={48} className="text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-400">
                  No blacklisted profiles match your search criteria.
                </p>
              </div>}
            <div className="mt-10 bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Report a User
              </h2>
              <p className="text-gray-300 mb-4">
                If you've had a negative experience with a user who engaged in
                fraudulent or harmful behavior, please report them to protect
                our community.
              </p>
              <Button variant="primary">
                <AlertTriangle size={16} className="mr-2" />
                Submit a Report
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}