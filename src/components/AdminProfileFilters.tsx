import React, { useState } from 'react';
import { Filter, X, CheckCircle, Star, Crown, Diamond, Search } from 'lucide-react';
import { Button } from './Button';
interface FilterOptions {
  status: string;
  membershipTier: string;
  isVip: string;
  gender: string;
  priceRange: {
    min: string;
    max: string;
  };
  location: string;
  sortBy: string;
}
interface AdminProfileFiltersProps {
  onApplyFilters: (filters: FilterOptions) => void;
  onResetFilters: () => void;
}
export function AdminProfileFilters({
  onApplyFilters,
  onResetFilters
}: AdminProfileFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    membershipTier: 'all',
    isVip: 'all',
    gender: 'all',
    priceRange: {
      min: '',
      max: ''
    },
    location: '',
    sortBy: 'newest'
  });
  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handlePriceRangeChange = (field: 'min' | 'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: value
      }
    }));
  };
  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };
  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      membershipTier: 'all',
      isVip: 'all',
      gender: 'all',
      priceRange: {
        min: '',
        max: ''
      },
      location: '',
      sortBy: 'newest'
    });
    onResetFilters();
  };
  return <div className="bg-slate-700 rounded-lg border border-slate-600 mb-6">
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Filter size={18} className="text-amber-400 mr-2" />
          <h3 className="font-medium text-white">Profile Filters</h3>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      {isExpanded && <div className="p-4 border-t border-slate-600">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select value={filters.status} onChange={e => handleFilterChange('status', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="all">All Statuses</option>
                <option value="pending">Pending Verification</option>
                <option value="verified">Verified</option>
                <option value="featured">Featured</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Membership Tier
              </label>
              <select value={filters.membershipTier} onChange={e => handleFilterChange('membershipTier', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="all">All Tiers</option>
                <option value="none">No Membership</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="diamond">Diamond</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                VIP Status
              </label>
              <select value={filters.isVip} onChange={e => handleFilterChange('isVip', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="all">All Profiles</option>
                <option value="vip">VIP Only</option>
                <option value="non-vip">Non-VIP Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Gender
              </label>
              <select value={filters.gender} onChange={e => handleFilterChange('gender', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="all">All Genders</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input type="number" placeholder="Min" value={filters.priceRange.min} onChange={e => handlePriceRangeChange('min', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <span className="text-gray-400">-</span>
                <input type="number" placeholder="Max" value={filters.priceRange.max} onChange={e => handlePriceRangeChange('max', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Location
              </label>
              <input type="text" placeholder="City or region" value={filters.location} onChange={e => handleFilterChange('location', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Sort By
              </label>
              <select value={filters.sortBy} onChange={e => handleFilterChange('sortBy', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-3 mt-6">
            <Button variant="outline" onClick={handleResetFilters}>
              <X size={16} className="mr-2" />
              Reset Filters
            </Button>
            <Button onClick={handleApplyFilters}>
              <Filter size={16} className="mr-2" />
              Apply Filters
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.status !== 'all' && <div className="bg-slate-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
                Status: {filters.status}
                <button className="ml-1 text-gray-300 hover:text-white" onClick={() => handleFilterChange('status', 'all')}>
                  <X size={14} />
                </button>
              </div>}
            {filters.membershipTier !== 'all' && <div className="bg-slate-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
                Membership: {filters.membershipTier}
                <button className="ml-1 text-gray-300 hover:text-white" onClick={() => handleFilterChange('membershipTier', 'all')}>
                  <X size={14} />
                </button>
              </div>}
            {filters.isVip !== 'all' && <div className="bg-slate-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
                {filters.isVip === 'vip' ? 'VIP Only' : 'Non-VIP Only'}
                <button className="ml-1 text-gray-300 hover:text-white" onClick={() => handleFilterChange('isVip', 'all')}>
                  <X size={14} />
                </button>
              </div>}
            {filters.gender !== 'all' && <div className="bg-slate-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
                Gender: {filters.gender}
                <button className="ml-1 text-gray-300 hover:text-white" onClick={() => handleFilterChange('gender', 'all')}>
                  <X size={14} />
                </button>
              </div>}
            {(filters.priceRange.min || filters.priceRange.max) && <div className="bg-slate-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
                Price: {filters.priceRange.min || '0'} -{' '}
                {filters.priceRange.max || '∞'}
                <button className="ml-1 text-gray-300 hover:text-white" onClick={() => setFilters(prev => ({
            ...prev,
            priceRange: {
              min: '',
              max: ''
            }
          }))}>
                  <X size={14} />
                </button>
              </div>}
            {filters.location && <div className="bg-slate-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
                Location: {filters.location}
                <button className="ml-1 text-gray-300 hover:text-white" onClick={() => handleFilterChange('location', '')}>
                  <X size={14} />
                </button>
              </div>}
          </div>
        </div>}
    </div>;
}