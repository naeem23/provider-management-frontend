import React, { useState, useEffect, SetStateAction } from 'react';
import { X, TrendingUp, Calendar, DollarSign, RefreshCw } from 'lucide-react';
import { fetchWithAuth } from '@/lib/auth';
import { ExtensionType, SubstitutionType } from '@/types/service-type';
import Link from 'next/link';


interface ResponseModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  subsId: string;
}

export const SubstitutionResponseModal: React.FC<ResponseModalProps> = ({ isOpen, onClose, subsId }) => {
  const [substitutionDetails, setSubstitutionDetails] = useState<SubstitutionType | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string>("");

  // Auto-calculate additional cost when man days change
  useEffect(() => {
    if (subsId) {
      fetchSubstitutionDetails(subsId)
    }
  }, [subsId]);

  const fetchSubstitutionDetails = async (id: string) => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/substitutions/${id}`)

      if (response.ok) {
        const data = await response.json()
        setSubstitutionDetails(data)
      }
    } catch (error) {
      console.error('Error fetching extension details:', error)
    }
  }

  const handleSubmit = async (action: string) => {
    if (action === 'reject' && !rejectionReason.trim()){
      setErrors("Rejection reason is required");
      return
    }

    setIsSubmitting(true);

    let url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/substitutions/${subsId}/approve_substitution/`;
    let payload: any = {
      user_role: "SUPPLIER_REP",
    }

    if (action === 'reject') {
      url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/substitutions/${subsId}/reject/`;
      payload = {
        user_role: "SUPPLIER_REP",
        reason: rejectionReason,
      }
    }

    try {
      const response = await fetchWithAuth(
        url, 
        {
          method: 'POST',
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
            <p className="text-sm text-blue-900 mb-1 group">
              <span className="font-semibold">Incoming Specialist:</span> 
              <Link className='group-hover:cursor-pointer' href={`/dashboard/specialists/${substitutionDetails.incoming_specialist_id}`}>{substitutionDetails.incoming_specialist_name}</Link>
            </p>
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Incoming Specialist Daily Rate:</span> €{substitutionDetails.incoming_specialist_daily_rate}
            </p>
            <p className="text-sm text-blue-900 mb-1">
              <span className="font-semibold">Reason For Substitution:</span> {substitutionDetails.reason}
            </p>
          </div>

          {/* Form Fields */}
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
                  errors ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Provide detailed reason for rejecting extension..."
              />
              {errors && (
                <p className="text-sm text-red-600 mt-1">{errors}</p>
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