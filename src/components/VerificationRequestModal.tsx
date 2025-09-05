import { useState } from 'react';
import { X, Phone, Video, MessageSquare, Calendar, Clock, User, Shield, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface VerificationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VerificationRequestData) => void;
  profile: {
    id: number;
    name: string;
    age: number;
    location: string;
    phone?: string;
    email?: string;
  } | null;
}

export interface VerificationRequestData {
  profileId: number;
  method: 'phone_call' | 'video_call' | 'in_person' | 'document_review' | 'other';
  scheduledDate?: string;
  scheduledTime?: string;
  notes: string;
  contactMethod: string;
  priority: 'low' | 'medium' | 'high';
  requirements: string[];
}

export function VerificationRequestModal({
  isOpen,
  onClose,
  onSubmit,
  profile
}: VerificationRequestModalProps) {
  const [formData, setFormData] = useState<Partial<VerificationRequestData>>({
    method: 'phone_call',
    priority: 'medium',
    notes: '',
    contactMethod: '',
    requirements: []
  });

  if (!isOpen || !profile) return null;

  const verificationMethods = [
    {
      id: 'phone_call',
      label: 'Phone Call Verification',
      description: 'Conduct a voice call to verify identity and authenticity',
      icon: <Phone size={16} className="text-green-400" />,
      requirements: ['Valid phone number', 'Government ID ready', 'Quiet environment']
    },
    {
      id: 'video_call',
      label: 'Video Call Verification',
      description: 'Video call to verify physical appearance and identity documents',
      icon: <Video size={16} className="text-blue-400" />,
      requirements: ['Stable internet connection', 'Camera access', 'Government ID', 'Good lighting']
    },
    {
      id: 'in_person',
      label: 'In-Person Meeting',
      description: 'Physical meeting at designated location for thorough verification',
      icon: <User size={16} className="text-purple-400" />,
      requirements: ['Available for meeting', 'Government ID', 'Transportation']
    },
    {
      id: 'document_review',
      label: 'Document Review',
      description: 'Submit and review identity documents digitally',
      icon: <Shield size={16} className="text-orange-400" />,
      requirements: ['Clear photos of ID', 'Proof of address', 'Recent photo']
    },
    {
      id: 'other',
      label: 'Custom Method',
      description: 'Alternative verification method based on specific circumstances',
      icon: <MessageSquare size={16} className="text-gray-400" />,
      requirements: ['Details to be specified in notes']
    }
  ];

  const selectedMethod = verificationMethods.find(m => m.id === formData.method);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.method || !formData.notes?.trim()) return;

    onSubmit({
      profileId: profile.id,
      method: formData.method,
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      notes: formData.notes,
      contactMethod: formData.contactMethod || profile.phone || profile.email || '',
      priority: formData.priority || 'medium',
      requirements: selectedMethod?.requirements || []
    } as VerificationRequestData);

    // Reset form
    setFormData({
      method: 'phone_call',
      priority: 'medium',
      notes: '',
      contactMethod: '',
      requirements: []
    });
    onClose();
  };

  const handleMethodChange = (method: string) => {
    setFormData(prev => ({
      ...prev,
      method: method as any,
      requirements: verificationMethods.find(m => m.id === method)?.requirements || []
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full border border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Shield size={20} className="mr-2 text-amber-400" />
            Request Verification - {profile.name}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition p-2 hover:bg-slate-700 rounded-full"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Info */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-2">Profile Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Name:</span>
                <span className="text-white ml-2">{profile.name}</span>
              </div>
              <div>
                <span className="text-gray-400">Age:</span>
                <span className="text-white ml-2">{profile.age}</span>
              </div>
              <div>
                <span className="text-gray-400">Location:</span>
                <span className="text-white ml-2">{profile.location}</span>
              </div>
              <div>
                <span className="text-gray-400">Contact:</span>
                <span className="text-white ml-2">{profile.phone || profile.email || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Verification Method */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Verification Method <span className="text-rose-400">*</span>
            </label>
            <div className="space-y-3">
              {verificationMethods.map((method) => (
                <label key={method.id} className="flex items-start space-x-3 p-3 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
                  <input
                    type="radio"
                    name="method"
                    value={method.id}
                    checked={formData.method === method.id}
                    onChange={(e) => handleMethodChange(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      {method.icon}
                      <span className="text-white font-medium ml-2">{method.label}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{method.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {method.requirements.map((req, index) => (
                        <span key={index} className="bg-slate-600 text-gray-300 text-xs px-2 py-1 rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Scheduling (for call-based methods) */}
          {(formData.method === 'phone_call' || formData.method === 'video_call' || formData.method === 'in_person') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar size={14} className="inline mr-1" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.scheduledDate || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Clock size={14} className="inline mr-1" />
                  Preferred Time
                </label>
                <input
                  type="time"
                  value={formData.scheduledTime || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>
          )}

          {/* Contact Method */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contact Method
            </label>
            <input
              type="text"
              value={formData.contactMethod}
              onChange={(e) => setFormData(prev => ({ ...prev, contactMethod: e.target.value }))}
              placeholder={`${profile.phone ? `Phone: ${profile.phone}` : ''} ${profile.email ? `Email: ${profile.email}` : ''}`}
              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              How should we contact them? Leave blank to use their provided contact info.
            </p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="low">Low - Standard processing</option>
              <option value="medium">Medium - Normal priority</option>
              <option value="high">High - Urgent verification</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Notes <span className="text-rose-400">*</span>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Provide specific instructions, concerns, or additional information for the verification process..."
              rows={4}
              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          {/* Requirements Checklist */}
          {selectedMethod && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertCircle size={16} className="text-blue-400 mr-2" />
                <h4 className="text-blue-400 font-medium">Verification Requirements</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                {selectedMethod.requirements.map((req, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={!formData.method || !formData.notes?.trim()}
            >
              <Shield size={16} className="mr-2" />
              Request Verification
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
