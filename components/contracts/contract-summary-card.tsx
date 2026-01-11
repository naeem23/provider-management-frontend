import { getDaysLeft } from '@/lib/utils';
import { ContractType } from '@/types/contract-type';
import { Briefcase, Calendar, Clock, DollarSign, Eye, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface ContractSummaryCardProps {
  contract: ContractType;
  type?: string;
}

const ContractSummaryCard: React.FC<ContractSummaryCardProps> = ({ contract, type }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'IN_NEGOTIATION': return 'bg-orange-100 text-orange-800';
      case 'PENDING': return 'bg-gray-100 text-gray-800';
      case 'EXPIRED': return 'bg-red-100 text-red-800';
      default: return 'bg-red-100 text-red-800';
    }
  };



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
                {getDaysLeft(contract.valid_to)} days left
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{contract.title}</h2>
          <p className="text-gray-600">Service Request: {contract.service_request_code}</p>
        </div>
        {type && (
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
          <p className="text-sm font-semibold text-orange-600">€{contract.offered_daily_rate}/day</p>
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
          <p className="text-sm font-semibold text-gray-900">{contract.valid_from} - {contract.valid_to}</p>
        </div>
      </div>

      {!type && contract.response_deadline && (
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