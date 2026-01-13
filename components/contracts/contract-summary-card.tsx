import { fetchWithAuth } from '@/lib/auth';
import { getDaysLeft, getStatusColor, getUserFromStorage } from '@/lib/utils';
import { ContractType } from '@/types/contract-type';
import { Briefcase, Calendar, Clock, DollarSign, Eye, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

interface ContractSummaryCardProps {
  contract: ContractType;
  type?: string;
  setActiveTab?: (tab: string) => void;
}

const ContractSummaryCard: React.FC<ContractSummaryCardProps> = ({ contract, type, setActiveTab }) => {
  const [isLoading, setIsLoading] = useState(false);

  const user = getUserFromStorage();

  const handleStartNegotiation = async () => {
    setIsLoading(true);

    try {
      const payload = {
        id: contract.id,
        title: contract.title,
        proposed_rate: contract.proposed_rate,
        valid_from: contract.valid_from,
        valid_till: contract.valid_till,
        response_deadline: contract.response_deadline,
        domain: contract.domain,
        terms_condition: contract.terms_and_condition,
        provider: user?.provider_id,
      }

      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/contracts/start-negotiation/`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        setActiveTab && setActiveTab('action-required');
      }
    } catch (error) {
        console.error(`Error fetching contracts:`, error)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
              {contract.contract_code}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded capitalize ${getStatusColor(contract.status)}`}>
              {contract.status}
            </span>
            {type === "expiring" && (
              <span className="flex items-center text-xs text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {getDaysLeft(contract.valid_till)} days left
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{contract.title}</h2>
          <p className="text-gray-600">Service Request: {contract.service_request_code}</p>
        </div>
        {type && type === 'published-only' && contract.status !== 'IN_NEGOTIATION' && (
            <button onClick={handleStartNegotiation} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer" disabled={isLoading}>
              {isLoading ? "Starting Negotiation..." : "Start Negotiation"}
            </button>
        )}
        {type && (type === "active" || type === 'expiring') && (
          <Link href={`/dashboard/contracts/${contract.id}/versions`} className="ml-4 flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            <Eye className="w-4 h-4 mr-2" />
            View Versions
          </Link>
        )}
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
            <p className="text-xs text-gray-500 font-medium">Specialist</p>
          </div>
          <p className="text-sm font-semibold text-gray-900">{contract.specialist_name}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
            <p className="text-xs text-gray-500 font-medium">Offered Rate</p>
          </div>
          <p className="text-sm font-semibold text-orange-600">€{contract.proposed_rate}/day</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-gray-500 mr-2" />
            <p className="text-xs text-gray-500 font-medium">Negotiated Rate</p>
          </div>
          <p className="text-sm font-semibold text-green-600">
            {contract.negotiated_rate ? `€${contract.negotiated_rate}/day` : 'Pending'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Calendar className="w-4 h-4 text-gray-500 mr-2" />
            <p className="text-xs text-gray-500 font-medium">Contract Period</p>
          </div>
          <p className="text-sm font-semibold text-gray-900">{contract.valid_from} - {contract.valid_till}</p>
        </div>
      </div>

      {(!type || type === 'published-only') && contract.response_deadline && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center">
          <Clock className="w-5 h-5 text-yellow-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-yellow-900">Response Deadline</p>
            <p className="text-xs text-yellow-700">{contract.response_deadline}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractSummaryCard