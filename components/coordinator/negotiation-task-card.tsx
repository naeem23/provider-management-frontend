import { getDaysLeft } from "@/lib/utils";
import { ContractType } from "@/types/contract-type";
import { NegotiationTask } from "@/types/dashboard";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";

interface NegotiationTaskCardProps {
  task: ContractType;
  onAction: (task: ContractType, action: string) => void;
}

const NegotiationTaskCard: React.FC<NegotiationTaskCardProps> = ({ task, onAction }) => {
  return (
    <div className="border-2 border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-linear-to-r from-orange-50 to-white">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded">
              {task.contract_code}
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {getDaysLeft(task.response_deadline)} days remaining
            </span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{task.title}</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Specialist</p>
              <p className="font-semibold text-gray-900">{task.specialist_name}</p>
            </div>
            <div className="bg-white rounded p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Domain</p>
              <p className="font-semibold text-gray-900">{task.role_name}</p>
            </div>
            <div className="bg-white rounded p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Offered Daily Rate</p>
              <p className="font-semibold text-orange-600">€{task.offered_daily_rate}</p>
            </div>
            <div className="bg-white rounded p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Target Rate</p>
              <p className="font-semibold text-green-600">€{task.expected_rate}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-xs text-blue-800 font-medium mb-1">Terms & Notes</p>
            <p className="text-sm text-blue-900">{task.terms_and_condition.slice(0,50)}...</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 mt-4">
        <button 
          onClick={() => onAction(task, 'accept')}
          className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Accept Offer
        </button>
        <Link 
          href={`/dashboard/contracts/${task.id}/counter-offer`}
          className="text-center flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Counter Offer
        </Link>
        <button 
          onClick={() => onAction(task, 'reject')}
          className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center"
        >
          <XCircle className="w-5 h-5 mr-2" />
          Reject
        </button>
      </div>
    </div>
  );
};

export default NegotiationTaskCard;