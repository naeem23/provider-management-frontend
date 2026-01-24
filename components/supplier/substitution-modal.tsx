import React, { SetStateAction, useState } from 'react';
import { X, RefreshCw, DollarSign, User, AlertCircle, Search } from 'lucide-react';
import { ServiceOrder } from '@/types/service-type';


interface SubstitutionFormData {
  outgoingSpecialistName: string;
  incomingSpecialistId: string;
  incomingSpecialistName: string;
  incomingSpecialistDailyRate: number;
  reason: string;
}


interface SubstitutionModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  serviceOrder: ServiceOrder;
}

export const SubstitutionModal: React.FC<SubstitutionModalProps> = ({ isOpen, onClose, serviceOrder }) => {
  // Mock specialists data
  const availableSpecialists: any[] = [
    {
      id: 'SPEC-005',
      name: 'Sarah Johnson',
      assignedRoles: [{ role: 'Senior Developer', experienceLevel: 'Senior' }],
      performanceGrade: 'A',
      averageDailyRate: 820,
      availability: 'Available'
    },
    {
      id: 'SPEC-007',
      name: 'David Miller',
      assignedRoles: [{ role: 'Solution Architect', experienceLevel: 'Senior' }],
      performanceGrade: 'A',
      averageDailyRate: 880,
      availability: 'Available'
    },
    {
      id: 'SPEC-010',
      name: 'Lisa Anderson',
      assignedRoles: [{ role: 'Senior Developer', experienceLevel: 'Intermediate' }],
      performanceGrade: 'B',
      averageDailyRate: 750,
      availability: 'Available'
    }
  ];

  const [formData, setFormData] = useState<SubstitutionFormData>({
    outgoingSpecialistName: serviceOrder.current_specialist_name,
    incomingSpecialistId: '',
    incomingSpecialistName: '',
    incomingSpecialistDailyRate: 0,
    reason: ''
  });

  const [showSpecialistDropdown, setShowSpecialistDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredSpecialists = availableSpecialists.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.assignedRoles.some((r: any) => r.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSpecialistSelect = (specialist: any) => {
    setFormData({
      ...formData,
      incomingSpecialistId: specialist.id,
      incomingSpecialistName: `${specialist.first_name} ${specialist.last_name}`,
      incomingSpecialistDailyRate: specialist.avg_daily_rate
    });
    setSearchTerm(specialist.first_name);
    setShowSpecialistDropdown(false);
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

    // Simulate API call
    setTimeout(() => {
      console.log('Substitution request submitted:', {
        serviceOrder: serviceOrder.id,
        outgoingSpecialistId: serviceOrder.current_specialist_id,
        ...formData
      });

      // In real app:
      // const response = await fetch('/api/substitutions/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     service_order: serviceOrder.serviceOrderId,
      //     initiated_by: 'SUPPLIER_REPRESENTATIVE',
      //     initiator_name: currentUser.name,
      //     outgoing_specialist_id: serviceOrder.currentSpecialistId,
      //     outgoing_specialist_name: formData.outgoingSpecialistName,
      //     incoming_specialist_id: formData.incomingSpecialistId,
      //     incoming_specialist_name: formData.incomingSpecialistName,
      //     incoming_specialist_daily_rate: formData.incomingSpecialistDailyRate,
      //     reason: formData.reason,
      //     detailed_reason: formData.detailedReason,
      //     handover_period_days: formData.handoverPeriodDays,
      //     effective_date: formData.effectiveDate
      //   })
      // });

      setIsSubmitting(false);
      onClose(false);
      alert('Substitution request submitted successfully!');
    }, 1500);
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
                    {filteredSpecialists.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No specialists found
                      </div>
                    ) : (
                      filteredSpecialists.map((specialist) => (
                        <div
                          key={specialist.id}
                          onClick={() => handleSpecialistSelect(specialist)}
                          className="p-3 hover:bg-purple-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{specialist.name}</p>
                              <p className="text-xs text-gray-600">
                                {specialist.assignedRoles[0].role} - Grade {specialist.performanceGrade}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">€{specialist.averageDailyRate}</p>
                              <p className="text-xs text-green-600">{specialist.availability}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              {errors.incomingSpecialist && (
                <p className="text-sm text-red-600 mt-1">{errors.incomingSpecialist}</p>
              )}
              {formData.incomingSpecialistName && (
                <div className="mt-2 p-3 bg-purple-50 rounded border border-purple-200">
                  <p className="text-sm text-purple-900">
                    <span className="font-semibold">Selected:</span> {formData.incomingSpecialistName} ({formData.incomingSpecialistId})
                  </p>
                </div>
              )}
            </div>

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