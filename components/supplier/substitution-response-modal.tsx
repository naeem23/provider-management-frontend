import React, { useState, useEffect, SetStateAction } from 'react';
import { X, TrendingUp, Calendar, DollarSign, RefreshCw, User, Search } from 'lucide-react';
import { fetchWithAuth } from '@/lib/auth';
import { ExtensionType, SubstitutionType } from '@/types/service-type';
import Link from 'next/link';
import { SpecialistDetails } from '@/types/user';
import { SpecialistSummary } from './substitution-modal';

interface SubstitutionFormData {
  incomingSpecialistId: string;
  incomingSpecialistName: string;
  incomingSpecialistDailyRate: number | string;
}

interface ResponseModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  subsId: string;
}

export const SubstitutionResponseModal: React.FC<ResponseModalProps> = ({ isOpen, onClose, subsId }) => {
  const [formData, setFormData] = useState<SubstitutionFormData>({
    incomingSpecialistId: '',
    incomingSpecialistName: '',
    incomingSpecialistDailyRate: 0,
  });
  const [availableSpecialists, setAvailableSpecialists] = useState<SpecialistDetails[]>([]);
  const [substitutionDetails, setSubstitutionDetails] = useState<SubstitutionType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSpecialistDropdown, setShowSpecialistDropdown] = useState(false);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rejectionErrors, setRejectionErrors] = useState<string>("");
  const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistDetails | null>(null);

  // Auto-calculate additional cost when man days change
  useEffect(() => {
    if (subsId) {
      fetchSubstitutionDetails(subsId)
    }
  }, [subsId]);

  const fetchSubstitutionDetails = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GROUP3C_API_BASE_URL}/orders/substitutions/${id}`)

      if (response.ok) {
        const data = await response.json()
        setSubstitutionDetails(data)
      }
    } catch (error) {
      console.error('Error fetching extension details:', error)
    }
  }

  const handleSpecialistSelect = (specialist: SpecialistDetails) => {
    setSelectedSpecialist(specialist)
    setFormData({
      incomingSpecialistId: specialist.id,
      incomingSpecialistName: `${specialist.first_name} ${specialist.last_name}`,
      incomingSpecialistDailyRate: specialist.avg_daily_rate
    });
    setSearchTerm(`${specialist.first_name} ${specialist.last_name}`);
    setShowSpecialistDropdown(false);
  };

  const removeSpecialistSelect = () => {
    setSelectedSpecialist(null)
    setFormData({
      ...formData,
      incomingSpecialistId: '',
      incomingSpecialistName: '',
      incomingSpecialistDailyRate: 0
    });
    setSearchTerm('');
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.incomingSpecialistId) {
      newErrors.incomingSpecialist = 'Please select a replacement specialist';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (action: string) => {
    if (action === 'reject' && !rejectionReason.trim()){
      setRejectionErrors("Rejection reason is required");
      return
    } else if (action === 'approv' && !validateForm()) {      
      return;
    }

    setIsSubmitting(true);

    let url: string = `${process.env.NEXT_PUBLIC_GROUP3C_API_BASE_URL}/orders/substitutions/${subsId}/approve_substitution/`;
    let payload: any = {
      user_role: "SUPPLIER_REP",
      incoming_specialist_id: formData.incomingSpecialistId,
      incoming_specialist_name: formData.incomingSpecialistName,
      incoming_specialist_daily_rate: formData.incomingSpecialistDailyRate,
    }

    if (action === 'reject') {
      url = `${process.env.NEXT_PUBLIC_GROUP3C_API_BASE_URL}/orders/substitutions/${subsId}/reject/`;
      payload = {
        user_role: "SUPPLIER_REP",
        reason: rejectionReason,
      }
    }

    try {
      const response = await fetch(
        url, 
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        alert(`Substitution request ${action}ed successfully!`);
      } else {
        alert(`Failed to ${action} Substitution request!`);
      }
    } catch (error) {
      console.log(error);
      alert(`Network error. Please check your connection and try again.`);
    } finally {
      setIsSubmitting(false);
      onClose(false);
    }
  };

  if (!isOpen || !substitutionDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <RefreshCw className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Request Substitution</h3>
          </div>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Service Order Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Service Order:</span> SO-{substitutionDetails.service_order.slice(0,6)}
            </p>
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Title:</span> {substitutionDetails.service_order_title}
            </p>
            <p className="text-sm text-blue-900 mb-1 group">
              <span className="font-semibold">Current Specialist (Outgoing):</span> 
              <Link className='group-hover:cursor-pointer' href={`/dashboard/specialists/${substitutionDetails.outgoing_specialist_id}`}>{substitutionDetails.outgoing_specialist_name}</Link>
            </p>
            {/* <p className="text-sm text-blue-900 mb-1 group">
              <span className="font-semibold">Incoming Specialist:</span> 
              <Link className='group-hover:cursor-pointer' href={`/dashboard/specialists/${substitutionDetails.incoming_specialist_id}`}>{substitutionDetails.incoming_specialist_name}</Link>
            </p>
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Incoming Specialist Daily Rate:</span> €{substitutionDetails.incoming_specialist_daily_rate}
            </p> */}
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Reason For Substitution:</span> {substitutionDetails.reason}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Incoming Specialist (Searchable Select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Replacement Specialist *
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSpecialistDropdown(true);
                  }}
                  onFocus={() => setShowSpecialistDropdown(true)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.incomingSpecialist ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Search for specialist..."
                />
                
                {/* Dropdown */}
                {showSpecialistDropdown && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {availableSpecialists.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No specialists found
                      </div>
                    ) : (
                      availableSpecialists.map((specialist) => (
                        <SpecialistSummary 
                          key={specialist.id}
                          specialist={specialist}
                          onSelect={(s) => {
                            handleSpecialistSelect(s);
                          }}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
              {errors.incomingSpecialist && (
                <p className="text-sm text-red-600 mt-1">{errors.incomingSpecialist}</p>
              )}
            </div>

            {selectedSpecialist && (
              <SpecialistSummary 
                specialist={selectedSpecialist}
                onRemove={removeSpecialistSelect}      
              />
            )}

            {/* Incoming Specialist Daily Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Replacement Specialist Daily Rate (€) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={formData.incomingSpecialistDailyRate || ''}
                  onChange={(e) => setFormData({ ...formData, incomingSpecialistDailyRate: parseFloat(e.target.value) || 0 })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Auto-filled when specialist is selected"
                  min="0"
                  step="0.01"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Auto-filled with specialist's average rate, but can be adjusted
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Rejection *
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  rejectionErrors ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Provide detailed reason for rejecting extension..."
              />
              {rejectionErrors && (
                <p className="text-sm text-red-600 mt-1">{rejectionErrors}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {rejectionReason.length} characters
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={() => onClose(false)}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit('reject')}
            disabled={isSubmitting}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isSubmitting ? 'Rejecting...' : 'Reject'}
          </button>
          <button
            onClick={() => handleSubmit('approv')}
            disabled={isSubmitting}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Approving...' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  );
};