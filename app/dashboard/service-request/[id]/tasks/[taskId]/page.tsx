"use client"

import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Briefcase, Search, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { ServiceOffer, ServiceOfferCreateType, ServiceRequest } from '@/types/service-type';
import { SpecialistDetails } from '@/types/user';
import { ServiceRequestSidebar } from '@/components/service-requests/service-request-sidebar';
import { SelectedSpecialistDisplay } from '@/components/service-requests/selected-specialist-display';
import { PricingSection } from '@/components/service-requests/pricing-section';
import { SpecialistSelectionModal } from '@/components/service-requests/specialist-selection-modal';


const SubmitOfferPage: React.FC = () => {
  const serviceRequest: ServiceRequest = {
    id: 'SR-2024-001',
    title: 'Senior Java Developer for Banking Platform',
    status: 'OPEN',
    start_date: '2024-02-15',
    end_date: '2024-08-15',
    role_name: 'Senior Developer',
    technology: 'Java/Spring Boot',
    specialization: 'Backend',
    experience_level: 'SENIOR',
    expected_man_days: 120,
    work_mode: 'Remote',
    task_description: 'Develop and maintain microservices architecture for core banking platform. Responsibilities include API design, implementation, testing, and documentation.',
    criteria_json: {
      languages: [
        { name: 'English', level: 'C1' },
        { name: 'German', level: 'B2' }
      ],
      skills: [
        'Java Spring Boot',
        'Python Django',
        'REST APIs design and development'
      ],
      certifications: [
        'Kubernetes/Docker experience',
        'Banking domain knowledge',
        'Kafka/messaging systems',
      ]
    }, 
    offer_deadline: '2024-01-15'
  };

  const allSpecialists: SpecialistDetails[] = [
    {
      id: 'e0d2262e-4113-4d9b-9235-bfc0525173a4',
      provider: '07319e7e-b2f4-4ed9-ace1-6540c1e45d59',
      provider_name: 'Senders',
      first_name: "John",
      last_name: 'Smith',
      email: 'john.smith@example.com',
      phone: '+1-555-0123',
      specialist_code: 'SP-0001',
      role_name: 'Software Developer',
      experience_level: 'SENIOR',
      skills: 'Java, Sprint Boot, Python, Django',
      certifications: 'Docker, Kafka, Flowable',
      specialization: 'Backend',
      avg_daily_rate: "850",
      status: "Active",
      available_from: "2026-01-01",
      available_until: null,
      max_weekly_hours: 40,
      location: 'Frankfurt, Germany',
      work_mode: 'Remote',
      willing_to_travel: true,
      languages_spoken: 'English, German'
    },
    {
      id: 'f0d2262e-4113-4d9b-9235-bfc0525173a4',
      provider: '07319e7e-b2f4-4ed9-ace1-6540c1e45d59',
      provider_name: 'Senders',
      first_name: "Doe",
      last_name: 'Smith',
      email: 'doe.smith@example.com',
      phone: '+1-555-0123',
      specialist_code: 'SP-0001',
      role_name: 'Software Developer',
      experience_level: 'JUNIOR',
      skills: 'Python, Django, JavaScript',
      certifications: 'Docker, Flowable',
      specialization: 'Full Stack',
      avg_daily_rate: "450",
      status: "On Leave",
      available_from: "2026-03-01",
      available_until: null,
      max_weekly_hours: 40,
      location: 'Frankfurt, Germany',
      work_mode: 'Remote',
      willing_to_travel: true,
      languages_spoken: 'English'
    },
    {
      id: 'a3d2262e-4113-4d9b-9235-bfc0525173a4',
      provider: '07319e7e-b2f4-4ed9-ace1-6540c1e45d59',
      provider_name: 'Senders',
      first_name: "Siddique",
      last_name: 'Naeem',
      email: 'doe.smith@example.com',
      phone: '+1-555-0123',
      specialist_code: 'SP-0001',
      role_name: 'Software Developer',
      experience_level: 'MID',
      skills: 'Python, Django, JavaScript, TypeScript, C#',
      certifications: 'Docker, Flowable, AWS',
      specialization: 'Full Stack',
      avg_daily_rate: "650",
      status: "Inactive",
      available_from: "2026-06-01",
      available_until: null,
      max_weekly_hours: 40,
      location: 'Frankfurt, Germany',
      work_mode: 'Remote',
      willing_to_travel: true,
      languages_spoken: 'English'
    }
  ];

  const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistDetails | null>(null);
  const [showSpecialistModal, setShowSpecialistModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [offer, setOffer] = useState<ServiceOfferCreateType>({
    service_request: '',
    provider: '',
    specialist: '',
    daily_rate: 0,
    travel_cost: 0,
    total_cost: 0,
    notes: '',
  });

  // Calculate total cost when rates change
  useEffect(() => {
    if (offer.daily_rate > 0) {
      const baseCost = offer.daily_rate * serviceRequest.expected_man_days;
      const travelCost = offer.travel_cost;
      const total = baseCost + travelCost;
      setOffer(prev => ({ ...prev, total_cost: total }));
    }
  }, [offer.daily_rate, offer.travel_cost, serviceRequest.expected_man_days]);

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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);

    // Real implementation:
    // const response = await fetch(`/api/flowable/tasks/${taskId}/complete`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     serviceRequestId: serviceRequest.id,
    //     specialistId: offer.specialistId,
    //     specialistName: offer.specialistName,
    //     materialNumber: offer.materialNumber,
    //     dailyRate: offer.dailyRate,
    //     travellingCost: offer.travellingCost,
    //     totalCost: offer.totalCost,
    //     contractualRelationship: offer.contractualRelationship,
    //     subcontractorName: offer.subcontractorName,
    //     notes: offer.notes
    //   })
    // });
    // 
    // if (response.ok) {
    //   router.push('/dashboard');
    // }
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
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
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
                      className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid() || isSubmitting}
                      className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
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
          specialists={allSpecialists}
          onSelect={handleSpecialistSelect}
          onClose={() => setShowSpecialistModal(false)}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Offer Submitted Successfully!</h3>
              <p className="text-gray-600 mb-2">
                Your offer for <span className="font-semibold">{selectedSpecialist?.first_name} {selectedSpecialist?.last_name}</span> has been submitted.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-left">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Offer ID:</span> Will be generated<br />
                  <span className="font-semibold">Service Request:</span> {serviceRequest.id}<br />
                  <span className="font-semibold">Total Cost:</span> €{offer.total_cost.toLocaleString()}<br />
                  <span className="font-semibold">Status:</span> Sent to System 1 for evaluation
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                You'll receive a notification when the client reviews your offer.
              </p>
              <button
                onClick={goBack}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitOfferPage;