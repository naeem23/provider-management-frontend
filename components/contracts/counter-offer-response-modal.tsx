import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'


const CounterOfferResponseModal = ({ providerName } : {providerName: string}) => {
  const router = useRouter();
  
  const goBack = () => {
    router.push('/dashboard')
    // window.history.back();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Counter Offer Submitted!</h3>
            <p className="text-gray-600 mb-6">
                Your counter offer has been successfully submitted to {providerName} via System 3.
                You'll be notified when they respond.
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
  )
}

export default CounterOfferResponseModal