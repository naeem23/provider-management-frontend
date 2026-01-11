import { ContractType } from '@/types/contract-type';
import { Building2, Calendar, Clock, FileText } from 'lucide-react';
import React from 'react'

interface ContractDetailsProps {
  contract: ContractType;
}

const ContractDetails: React.FC<ContractDetailsProps> = ({ contract }) => {
    const aboveOrBelowTarget = (proposedRate: number, expectedRate: number) => {
        const diff = proposedRate - expectedRate;
        return diff > 0 ? "above" : "below";
    }

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Contract Details
                </h3>

                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Contract Title</p>
                        <p className="font-semibold text-gray-900">{contract.title}</p>
                    </div>

                    {/* Specialist/Provider Name */}
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Provider's Name</p>
                        <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                            <p className="font-medium text-gray-900">{contract.specialist_name}</p>
                        </div>
                    </div>

                    {/* Domain */}
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Domain</p>
                        <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                            {contract.role_name}
                        </span>
                    </div>

                    {/* Rates Comparison */}
                    <div className="bg-linear-to-br from-red-50 to-orange-50 border border-orange-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-3 font-medium">Rate Comparison</p>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Proposed Rate</p>
                                <p className="text-2xl font-bold text-red-600">€{contract.offered_daily_rate}</p>
                                <p className="text-xs text-gray-500">per day</p>
                            </div>
                            <div className="border-t border-orange-200 pt-3">
                                <p className="text-xs text-gray-500 mb-1">Your Expected Rate</p>
                                <p className="text-2xl font-bold text-green-600">€{contract.expected_rate || "__"}</p>
                                <p className="text-xs text-gray-500">per day</p>
                            </div>
                            <div className="border-t border-orange-200 pt-3">
                                <p className="text-xs text-gray-500 mb-1">Difference</p>
                                <p className="text-lg font-bold text-orange-600">
                                    €{contract?.expected_rate ? contract.offered_daily_rate - contract.expected_rate : "--"}
                                </p>
                                {contract?.expected_rate ? (
                                    <p className="text-xs text-gray-500">{aboveOrBelowTarget(contract.offered_daily_rate, contract.expected_rate)} expected</p>
                                ) : (
                                    <p className="text-xs text-gray-500">above expected</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Duration */}
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Contract Duration</p>
                        <div className="flex items-center text-sm text-gray-900">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{contract.valid_from} to {contract.valid_to}</span>
                        </div>
                    </div>

                    {/* Deadline */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <div className="flex items-center text-yellow-800">
                            <Clock className="w-4 h-4 mr-2" />
                            <div>
                            <p className="text-xs font-medium">Response Deadline</p>
                            <p className="text-sm font-bold">{contract.response_deadline}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ContractDetails