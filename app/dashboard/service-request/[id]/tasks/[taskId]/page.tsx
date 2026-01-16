"use client"

import React, { useState, useEffect, useEffectEvent } from 'react';
import { ArrowLeft, User, Search, CheckCircle, AlertCircle, MessageSquare, FileText } from 'lucide-react';
import { ServiceOfferCreateType, ServiceRequest } from '@/types/service-type';
import { SpecialistDetails } from '@/types/user';
import { ServiceRequestSidebar } from '@/components/service-requests/service-request-sidebar';
import { SelectedSpecialistDisplay } from '@/components/service-requests/selected-specialist-display';
import { PricingSection } from '@/components/service-requests/pricing-section';
import { SpecialistSelectionModal } from '@/components/service-requests/specialist-selection-modal';
import { useParams } from 'next/navigation';
import { fetchWithAuth } from '@/lib/auth';
import SubmitOfferResponseModal from '@/components/service-requests/submit-offer-response-modal';


const SubmitOfferPage: React.FC = () => {
  const params = useParams()
  const requestId = params.id as string;
  const taskId = params.taskId as string;

  const [serviceRequest, setServiceRequest] = useState<ServiceRequest | null>(null)
  const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistDetails | null>(null);
  const [showSpecialistModal, setShowSpecialistModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<{type: string; text: string}>({type: '', text: ''});
  const [offerId, setOfferId] = useState<string>('');

  const [offer, setOffer] = useState<ServiceOfferCreateType>({
    service_request: '',
    provider: '',
    specialist: '',
    daily_rate: 0,
    travel_cost: 0,
    total_cost: 0,
    notes: '',
  });
  

  useEffect(() => {
    fetchServiceRequestDetails()
  }, [requestId])  

  // Calculate total cost when rates change
  useEffect(() => {
    if (offer.daily_rate > 0 && serviceRequest?.expected_man_days) {
      const baseCost = offer.daily_rate * serviceRequest.expected_man_days;
      const travelCost = offer.travel_cost;
      const total = baseCost + travelCost;
      setOffer(prev => ({ ...prev, total_cost: total }));
    }
  }, [offer.daily_rate, offer.travel_cost, serviceRequest?.expected_man_days]);

  const fetchServiceRequestDetails = async () => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-requests/${requestId}`)

        if (response.ok) {
            const data = await response.json()
            setServiceRequest(data)
        }
    } catch (error) {
        console.error('Failed to fetch service request:', error)
    }
  }

  const handleSpecialistSelect = (specialist: SpecialistDetails) => {
    setSelectedSpecialist(specialist);
    setOffer({
      ...offer,
      specialist: specialist.id,
      daily_rate: parseFloat(specialist.avg_daily_rate)
    });
    setShowSpecialistModal(false);
  };

  const handleRemoveSpecialist = () => {
    setSelectedSpecialist(null);
    setOffer({
      ...offer,
      specialist: '',
      daily_rate: 0
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-requests/tasks/${taskId}/submit-offer/`, 
        {
          method: 'POST',
          body: JSON.stringify({
            request: serviceRequest?.id,
            provider: selectedSpecialist?.provider,
            proposed_specialist: selectedSpecialist?.id,
            daily_rate: offer.daily_rate,
            travel_cost: offer.travel_cost,
            total_cost: offer.total_cost,
            notes: offer.notes
          })
        }
      );
            
      if (response.ok) {
        const data = await response.json()
        if (data?.offer_id) setOfferId(data.offer_id)
        setModalMessage({type: 'success', text: 'Counter Offer Submitted!'})
      } else {
        setModalMessage({type: 'error', text: 'Failed to submit counter offer'})
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      setModalMessage({type: 'error', text: 'Network error. Please check your connection and try again.'})
    } finally {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }
  };

  const goBack = () => {
    // In Next.js: router.push('/dashboard')
    window.history.back();
  };

  const isFormValid = () => {
    return (
      selectedSpecialist &&
      offer.daily_rate > 0
    );
  };

  if (!serviceRequest) {
    return (
        <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Sorry, we couldn't found any service request with this id!</p>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={goBack}
            className="flex items-center cursor-pointer text-gray-600 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Submit Service Offer</h1>
              <p className="text-gray-600 mt-1">Select a specialist and submit your offer</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Service Request ID:</span>
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                {serviceRequest.id}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Service Request Details */}
          <div className="lg:col-span-1">
            <ServiceRequestSidebar serviceRequest={serviceRequest} />
          </div>

          {/* Right Column - Offer Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Specialist Selection Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Select Specialist
              </h3>

              {!selectedSpecialist ? (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose the best matching specialist for this service request
                  </p>
                  <button
                    onClick={() => setShowSpecialistModal(true)}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center cursor-pointer"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Browse Available Specialists
                  </button>
                </div>
              ) : (
                <SelectedSpecialistDisplay
                  specialist={selectedSpecialist}
                  onRemove={handleRemoveSpecialist}
                  onChangeClick={() => setShowSpecialistModal(true)}
                />
              )}
            </div>

            {/* Specialist Details Form - Only show when specialist is selected */}
            {selectedSpecialist && (
              <>
                {/* Pricing Section */}
                <PricingSection
                  offer={offer}
                  serviceRequest={serviceRequest}
                  onUpdate={setOffer}
                />

                {/* Additional Notes */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                    <MessageSquare className="w-5 h-5 mr-2 text-gray-600" />
                    Additional Notes (Optional)
                  </h3>

                  <textarea
                    value={offer.notes}
                    onChange={(e) => setOffer({ ...offer, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any relevant information about this offer, specialist availability, special conditions, etc..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {offer.notes.length} characters
                  </p>
                </div>

                {/* Submit Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start mb-4">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 shrink-0" />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-1">Review Before Submission</p>
                      <p>
                        Once submitted, this offer will be sent to System 1 (Service Management) for evaluation.
                        You'll be notified when the offer is accepted or rejected.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={goBack}
                      className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid() || isSubmitting}
                      className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                        !isFormValid() || isSubmitting
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Offer'
                      )}
                    </button>
                  </div>

                  {!isFormValid() && (
                    <div className="mt-4 text-sm text-red-600">
                      <p className="font-medium">Please complete all required fields:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {!selectedSpecialist && <li>Select a specialist</li>}
                        {/* {!offer. && <li>Enter material number</li>} */}
                        {offer.daily_rate <= 0 && <li>Enter daily rate</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Specialist Selection Modal */}
      {showSpecialistModal && (
        <SpecialistSelectionModal
          onSelect={handleSpecialistSelect}
          onClose={() => setShowSpecialistModal(false)}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SubmitOfferResponseModal 
          modalMessage={modalMessage}
          specialistName={`${selectedSpecialist?.first_name} ${selectedSpecialist?.last_name}`}
          offerId={offerId}
          requestId={serviceRequest?.id}
          totalCost={offer.total_cost}
        />
      )}
    </div>
  );
};

export default SubmitOfferPage;