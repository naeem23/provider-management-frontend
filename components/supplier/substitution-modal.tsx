import React, { SetStateAction, useEffect, useState } from 'react';
import { X, RefreshCw, DollarSign, User, AlertCircle, Search } from 'lucide-react';
import { ServiceOrder } from '@/types/service-type';
import { SpecialistDetails } from '@/types/user';
import { fetchWithAuth } from '@/lib/auth';


const getExperienceColor = (grade: string) => {
  switch (grade) {
    case 'LEAD': return 'bg-green-100 text-green-800';
    case 'EXPERT': return 'bg-blue-100 text-blue-800';
    case 'SENIOR': return 'bg-yellow-100 text-yellow-800';
    case 'MID': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
interface SubstitutionFormData {
  outgoingSpecialistName: string;
  incomingSpecialistId: string;
  incomingSpecialistName: string;
  incomingSpecialistDailyRate: number | string;
  reason: string;
}
interface SubstitutionModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  serviceOrder: ServiceOrder;
}

export const SubstitutionModal: React.FC<SubstitutionModalProps> = ({ isOpen, onClose, serviceOrder }) => {
  const [formData, setFormData] = useState<SubstitutionFormData>({
    outgoingSpecialistName: serviceOrder.current_specialist_name,
    incomingSpecialistId: '',
    incomingSpecialistName: '',
    incomingSpecialistDailyRate: 0,
    reason: ''
  });

  const [availableSpecialists, setAvailableSpecialists] = useState<SpecialistDetails[]>([]);
  const [showSpecialistDropdown, setShowSpecialistDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistDetails | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setAvailableSpecialists([]);
      return;
    }

    const timer = setTimeout(() => {
      searchSpeacialist(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchSpeacialist = async (query: string) => {
    setIsSearching(true);

    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/specialists/specialists?q=${query}`);
      if (response.ok) {
        const data = await response.json();
        setAvailableSpecialists(data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSpecialistSelect = (specialist: SpecialistDetails) => {
    setSelectedSpecialist(specialist)
    setFormData({
      ...formData,
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

    if (!formData.reason) {
      newErrors.reason = 'Please select a reason for substitution';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GROUP3C_API_BASE_URL}/orders/substitutions/`, 
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({
            service_order: serviceOrder.id,
            initiated_by: 'SUPPLIER_REPRESENTATIVE',
            outgoing_specialist_id: serviceOrder.current_specialist_id,
            outgoing_specialist_name: formData.outgoingSpecialistName,
            incoming_specialist_id: formData.incomingSpecialistId,
            incoming_specialist_name: formData.incomingSpecialistName,
            incoming_specialist_daily_rate: formData.incomingSpecialistDailyRate,
            reason: formData.reason
          })
        }
      );

      if (response.ok) {
        alert('Substitution request submitted successfully!');
      } else {
        alert('Failed to submit Substitution request!');
      }
    } catch (error) {
      console.log('Error submitting substitution request', error)
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
      onClose(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <RefreshCw className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Request Specialist Substitution</h3>
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
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-900 mb-1">
              <span className="font-semibold">Service Order:</span> SO-{serviceOrder.id.slice(0,6)}
            </p>
            <p className="text-sm text-purple-900">
              <span className="font-semibold">Title:</span> {serviceOrder.title}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Outgoing Specialist (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Specialist (Outgoing)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.outgoingSpecialistName}
                  readOnly
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
                />
              </div>
            </div>

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

            {/* Reason (Select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Substitution *
              </label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.reason ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a reason...</option>
                <option value="LOW_PERFORMANCE">Low Performance</option>
                <option value="JOB_CHANGE">Specialist Job Change</option>
                <option value="HEALTH_ISSUES">Health Issues</option>
                <option value="PERSONAL_REASONS">Personal Reasons</option>
                <option value="SKILL_MISMATCH">Skill Mismatch</option>
                <option value="CLIENT_REQUEST">Client Request</option>
                <option value="OTHER">Other</option>
              </select>
              {errors.reason && (
                <p className="text-sm text-red-600 mt-1">{errors.reason}</p>
              )}
            </div>

            {/* Warning if reason is LOW_PERFORMANCE */}
            {formData.reason === 'LOW_PERFORMANCE' && (
              <div className="flex items-start bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Performance Issues Documentation</p>
                  <p>
                    When substituting due to low performance, ensure you provide specific examples in the detailed explanation above.
                  </p>
                </div>
              </div>
            )}
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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Substitution Request'}
          </button>
        </div>
      </div>
    </div>
  );
};


interface SelectedSpecialistSummaryProps {
  specialist: SpecialistDetails;
  onRemove?: () => void;
  onSelect?: (specialist: SpecialistDetails) => void;
}
export const SpecialistSummary = ({ specialist, onRemove, onSelect }: SelectedSpecialistSummaryProps) => {
  return (
    <div
      onClick={() => onSelect && onSelect(specialist)}
      className={`p-3 hover:bg-purple-50 cursor-pointer last:border-b-0 ${onRemove ? "bg-purple-50 border-purple-200 border rounded-sm" : "border-b border-gray-100"}`}
    >
      <div className="flex items-start mb-3">
        <h4 className="font-bold text-gray-900 mr-2">{specialist.first_name} {specialist.last_name}</h4>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getExperienceColor(specialist.experience_level)}`}>
          {specialist.experience_level}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <p className="text-sm text-gray-500 mb-1">Role: {specialist.role_name}</p>
        <p className="text-sm text-gray-500 mb-1">Specialization: {specialist.specialization}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500">Avg. Rate</p>
          <span className="font-bold text-gray-900">€{specialist.avg_daily_rate} / day</span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Available</p>
          <span className="font-bold text-gray-900">{specialist.available_from} - {specialist.available_until}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-sm text-gray-500">Skills</p>
          <p className="text-xs font-bold text-blue-600">{specialist.skills}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Certifications</p>
          <p className="text-xs font-bold text-purple-600">{specialist.certifications}</p>
        </div>
      </div>
      
      {onSelect && (
        <button
          onClick={() => onSelect(specialist)}
          className="cursor-pointer w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          Select Specialist
        </button>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="cursor-pointer w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          Remove Specialist
        </button>
      )}
    </div>
  )
}