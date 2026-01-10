import { Contract } from '@/app/dashboard/contracts/[id]/versions/page';
import { Briefcase, Calendar, Clock, DollarSign, TrendingUp } from 'lucide-react';
import React from 'react'

interface ContractSummaryCardProps {
  contract: Contract;
}

const ContractSummaryCard: React.FC<ContractSummaryCardProps> = ({ contract }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{contract.title}</h2>
          <p className="text-gray-600">Service Request: {contract.service_request}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
            <p className="text-xs text-gray-500 font-medium">Provider</p>
          </div>
          <p className="text-sm font-semibold text-gray-900">{contract.provider}</p>
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

      {contract.response_deadline && (
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