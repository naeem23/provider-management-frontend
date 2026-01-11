import { fetchWithAuth } from '@/lib/auth';
import { ContractType } from '@/types/contract-type';
import { AlertCircle, Edit, Euro, FileText, MessageSquare } from 'lucide-react'
import React, { useState } from 'react'

export interface CounterOffer {
  counterRate: number;
  counterTerms: string;
  justification: string;
  additionalTerms: string;
}

interface CounterContractFormProps {
    contract: ContractType;
    counterOffer: CounterOffer;
    setCounterOffer: React.Dispatch<React.SetStateAction<CounterOffer>>;
    setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CounterContractForm = ({ contract, counterOffer, setCounterOffer, setShowSuccessModal }: CounterContractFormProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRateChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setCounterOffer({ ...counterOffer, counterRate: numValue });
    }
  };

  const handleSubmit = async () => {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccessModal(true);
      }, 2000);
  
    //   const response = await fetchWithAuth(someurl, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       decision: 'COUNTER',
    //       counterRate: counterOffer.counterRate,
    //       counterTerms: counterOffer.counterTerms,
    //       justification: counterOffer.justification,
    //       additionalTerms: counterOffer.additionalTerms
    //     })
    //   });
  };

  //   const calculatePotentialSavings = () => {
  //     const savings = (contract.proposedRate - counterOffer.counterRate) * contract.estimatedManDays;
  //     return savings;
  //   };
  
  const goBack = () => {
    // In Next.js: router.push('/dashboard')
    window.history.back();
  };

  return (
    <div className="lg:col-span-2 space-y-6">
        {/* Counter Rate Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Euro className="w-5 h-5 mr-2 text-green-600" />
                Proposed Counter Rate
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Counter Rate (€/day) *
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                        <input
                            type="number"
                            value={counterOffer.counterRate}
                            onChange={(e) => handleRateChange(e.target.value)}
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                            min="0"
                            step="10"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Daily rate you're willing to accept</p>
                </div>

                {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-blue-800 font-medium mb-2">Potential Savings</p>
                    <p className="text-3xl font-bold text-blue-900">
                        €{calculatePotentialSavings().toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                        Over {contract.estimatedManDays} estimated man days
                    </p>
                </div> */}
            </div>

            {/* Rate Comparison Visual */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Rate Comparison</p>
                <div className="space-y-3">
                    <div className="flex items-center">
                        <div className="w-32 text-sm text-gray-600">Proposed:</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                            <div
                                className="bg-red-500 h-8 rounded-full flex items-center justify-end pr-3"
                                style={{ width: '100%' }}
                            >
                                <span className="text-white font-bold text-sm">€{contract.offered_daily_rate}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-32 text-sm text-gray-600">Your Counter:</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                            <div
                                className="bg-green-500 h-8 rounded-full flex items-center justify-end pr-3"
                                style={{ width: `${(counterOffer.counterRate / contract.offered_daily_rate) * 100}%` }}
                            >
                                <span className="text-white font-bold text-sm">€{counterOffer.counterRate}</span>
                            </div>
                        </div>
                    </div>

                    {contract?.expected_rate && (
                    <div className="flex items-center">
                        <div className="w-32 text-sm text-gray-600">Target:</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                            <div
                                className="bg-blue-500 h-8 rounded-full flex items-center justify-end pr-3"
                                style={{ width: `${(contract.expected_rate / contract.offered_daily_rate) * 100}%` }}
                            >
                                <span className="text-white font-bold text-sm">€{contract.expected_rate}</span>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>

        {/* Justification Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                Justification for Counter Offer
            </h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Explain Your Counter Offer *
                </label>
                <textarea
                value={counterOffer.justification}
                onChange={(e) => setCounterOffer({ ...counterOffer, justification: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide detailed reasoning for your counter rate. Include market comparisons, budget constraints, or other relevant factors..."
                />
                <p className="text-xs text-gray-500 mt-1">
                {counterOffer.justification.length} characters
                </p>
            </div>
        </div>

        {/* Proposed Terms Changes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                <FileText className="w-5 h-5 mr-2 text-purple-600" />
                Current Terms & Conditions
            </h3>

            {/* Current Terms */}
            <div className="mb-4">
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {contract.terms_and_condition}
                </div>
            </div>

            {/* Additional Terms */}
            <div className="">
                <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                    <Edit className="w-5 h-5 mr-2 text-purple-600" />
                    Add Your Terms & Conditions
                </h3>
                <textarea
                    value={counterOffer.counterTerms}
                    onChange={(e) => setCounterOffer({ ...counterOffer, counterTerms: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any additional terms, conditions, or notes for this counter offer..."
                />
            </div>
        </div>

        

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start mb-4">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 shrink-0" />
                
                <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Review Before Submission</p>
                    <p>
                        Once submitted, this counter offer will be sent to {contract.specialist_name} via System 3.
                        The supplier can accept, reject, or propose another counter offer.
                    </p>
                </div>
            </div>
                
            <div className="flex items-center gap-2 mt-2 mb-4">
                <input
                    type="checkbox"
                    id="confirm-submission"
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="confirm-submission" className="cursor-pointer">
                    I confirm that I have reviewed the counter offer.
                </label>
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
                    disabled={!isConfirmed || isSubmitting}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                        !isConfirmed || isSubmitting
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    >
                    {isSubmitting ? 'Submitting...' : 'Submit Counter Offer'}
                </button>
            </div>
        </div>
    </div>
  )
}

export default CounterContractForm