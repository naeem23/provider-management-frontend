import React, { useState, useEffect, SetStateAction } from 'react';
import { X, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { ServiceOrder } from '@/types/service-type';


interface ExtensionFormData {
  additionalManDays: number;
  newEndDate: string;
  additionalCost: number;
  reason: string;
}

interface ExtensionModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  serviceOrder: ServiceOrder;
}

export const ExtensionModal: React.FC<ExtensionModalProps> = ({ isOpen, onClose, serviceOrder }) => {
  const [formData, setFormData] = useState<ExtensionFormData>({
    additionalManDays: 0,
    newEndDate: '',
    additionalCost: 0,
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-calculate additional cost when man days change
  useEffect(() => {
    if (formData.additionalManDays > 0) {
      const calculatedCost = formData.additionalManDays * serviceOrder.daily_rate;
      setFormData(prev => ({
        ...prev,
        additionalCost: calculatedCost
      }));
    }
  }, [formData.additionalManDays, serviceOrder.daily_rate]);


  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.additionalManDays || formData.additionalManDays <= 0) {
      newErrors.additionalManDays = 'Additional man days must be greater than 0';
    }

    if (!formData.newEndDate) {
      newErrors.newEndDate = 'New end date is required';
    } else if (new Date(formData.newEndDate) <= new Date(serviceOrder.current_end_date)) {
      newErrors.newEndDate = 'New end date must be after current end date';
    }

    if (!formData.additionalCost || formData.additionalCost <= 0) {
      newErrors.additionalCost = 'Additional cost must be greater than 0';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Extension request submitted:', {
        serviceOrder: serviceOrder.id,
        ...formData
      });
      
      // In real app:
      // const response = await fetch('/api/extensions/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     service_order: serviceOrder.serviceOrderId,
      //     initiated_by: 'SUPPLIER_REPRESENTATIVE',
      //     initiator_name: currentUser.name,
      //     additional_man_days: formData.additionalManDays,
      //     new_end_date: formData.newEndDate,
      //     additional_cost: formData.additionalCost,
      //     reason: formData.reason
      //   })
      // });

      setIsSubmitting(false);
      onClose(false);
      // Show success notification
      alert('Extension request submitted successfully!');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Request Extension</h3>
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
              <span className="font-semibold">Service Order:</span> SO-{serviceOrder.id.slice(0,6)}
            </p>
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Title:</span> {serviceOrder.title}
            </p>
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Current End Date:</span> {serviceOrder.current_end_date}
            </p>
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Daily Rate:</span> €{serviceOrder.daily_rate}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Additional Man Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Man Days *
              </label>
              <input
                type="number"
                value={formData.additionalManDays || ''}
                onChange={(e) => setFormData({ ...formData, additionalManDays: parseInt(e.target.value) || 0 })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.additionalManDays ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter number of additional man days"
                min="1"
              />
              {errors.additionalManDays && (
                <p className="text-sm text-red-600 mt-1">{errors.additionalManDays}</p>
              )}
            </div>

            {/* New End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New End Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={formData.newEndDate}
                  onChange={(e) => setFormData({ ...formData, newEndDate: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.newEndDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min={serviceOrder.current_end_date}
                />
              </div>
              {errors.newEndDate && (
                <p className="text-sm text-red-600 mt-1">{errors.newEndDate}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Must be after current end date ({serviceOrder.current_end_date})
              </p>
            </div>

            {/* Additional Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Cost (€) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={formData.additionalCost || ''}
                  onChange={(e) => setFormData({ ...formData, additionalCost: parseFloat(e.target.value) || 0 })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.additionalCost ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Auto-calculated based on man days"
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.additionalCost && (
                <p className="text-sm text-red-600 mt-1">{errors.additionalCost}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Auto-calculated: {formData.additionalManDays} days × €{serviceOrder.daily_rate} = €{formData.additionalManDays * serviceOrder.daily_rate}
              </p>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Extension *
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.reason ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Provide detailed reason for requesting extension..."
              />
              {errors.reason && (
                <p className="text-sm text-red-600 mt-1">{errors.reason}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {formData.reason.length} characters
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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Extension Request'}
          </button>
        </div>
      </div>
    </div>
  );
};