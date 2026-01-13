"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, FileText, Euro, AlertCircle, CheckCircle, MessageSquare, Edit } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchWithAuth } from '@/lib/auth';
import ContractDetails from '@/components/contracts/contract-details';
import { ContractType } from '@/types/contract-type';
import CounterContractForm, { CounterOfferType } from '@/components/contracts/counter-contract-form';
import CounterOfferResponseModal from '@/components/contracts/counter-offer-response-modal';


const CounterContractPage: React.FC = () => {
  const params = useParams()
  const contractId = params.id as string;
  const taskId = params.taskId as string;
  const [contract, setContract] = useState<ContractType | null>(null);
  const [counterOffer, setCounterOffer] = useState<CounterOfferType>({
    counterRate: 0.00,
    counterTerms: '',
    counterExplanation: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<{type: string; text: string}>({type: '', text: ''});

  useEffect(() => {
    fetchContractDetails()
  }, [contractId])

  const fetchContractDetails = async () => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/contracts/${contractId}/`)

        if (response.ok) {
            const data = await response.json()
            setContract(data)
            if (data?.providers_expected_rate) {
                setCounterOffer(prev => ({
                    ...prev,
                    counterRate: data.providers_expected_rate,
                }))
            }
        }
    } catch (error) {
        console.error('Failed to fetch contract:', error)
    }
  }

  if (!contract) {
    return (
        <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Sorry, we couldn't found any contract with this id!</p>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <div className="mb-6">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>
            </div>

            {/* Page Title */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Submit Counter Offer</h2>
                <p className="text-gray-600 mt-1">Review and propose alternative terms for contract negotiation</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Contract Details (Read-only) */}
                <ContractDetails contract={contract} />

                {/* Right Column - Counter Offer Form */}
                <CounterContractForm 
                    contract={contract}
                    counterOffer={counterOffer} 
                    taskId={taskId}
                    setCounterOffer={setCounterOffer} 
                    setShowSuccessModal={setShowSuccessModal}
                    setModalMessage={setModalMessage}
                />
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <CounterOfferResponseModal modalMessage={modalMessage} contractId={contractId} />
            )}
        </div>
    </div>
  );
};

export default CounterContractPage;