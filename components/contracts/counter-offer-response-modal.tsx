import { CheckCircle } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'


interface CounterOfferResponseModalProps {
    modalMessage: {type: string; text: string};
    contractId: string;
}

const CounterOfferResponseModal = ({ modalMessage, contractId } : CounterOfferResponseModalProps) => {
  const router = useRouter();
  
  const goBack = () => {
    router.push(`/dashboard`)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{modalMessage.text}</h3>
            {modalMessage.type === 'success' ? (
                <p className="text-gray-600 mb-6">
                    Your counter offer has been successfully submitted. You'll be notified when they respond. View <Link href={`/dashboard/contracts/${contractId}/versions`}>contract verions</Link>
                </p>
            ) : (
                <p className="text-gray-600 mb-6">
                    We are sorry, due to some technical issue we could not submit your counter offer. Please try again. Thank you.
                </p>
            )}
            <button
                onClick={goBack}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Return to Dashboard
            </button>
            </div>
        </div>
    </div>
  )
}

export default CounterOfferResponseModal