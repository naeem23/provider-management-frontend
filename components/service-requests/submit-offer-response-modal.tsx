import { CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { SetStateAction } from 'react'


interface SubmitOfferResponseModalProps {
    modalMessage: {type: string; text: string};
    specialistName: string;
    offerId: string;
    requestId: string;
    totalCost: number;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitOfferResponseModal = ({ modalMessage, specialistName, offerId, requestId, totalCost, closeModal } : SubmitOfferResponseModalProps) => {
  const router = useRouter();
  
  const goBack = () => {
    if (modalMessage?.type === 'success') {
        router.push(`/dashboard`)
    } else {
        closeModal(false)
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {modalMessage?.type === 'success' ? (
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    ) : (
                        <XCircle className="w-10 h-10 text-green-600" />
                    )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {modalMessage?.type === 'success' ? "Offer Submitted Successfully!" : "Failed to submit offer!"}
                </h3>
                <p className="text-gray-600 mb-2">
                    Your offer for <span className="font-semibold">{specialistName}</span> has been {modalMessage?.type === "success" ? "submitted" : "failed to submit"}.
                </p>
                {modalMessage?.type === 'success' && (
                    <>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-left">
                            <p className="text-sm text-blue-900">
                                <span className="font-semibold">Offer ID: </span> {offerId}<br />
                                <span className="font-semibold">Service Request:</span> {requestId}<br />
                                <span className="font-semibold">Total Cost:</span> €{totalCost.toLocaleString()}<br />
                            </p>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            You'll receive a notification when the client reviews your offer.
                        </p>
                    </>
                )}
                <button
                    onClick={goBack}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
  )
}

export default SubmitOfferResponseModal