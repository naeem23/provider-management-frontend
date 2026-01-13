import { getDaysLeft, getStatusColor } from "@/lib/utils";
import { TasksType } from "@/types/contract-type";
import { Briefcase, Calendar, CheckCircle, Clock, DollarSign, Edit3, Tag, XCircle } from "lucide-react";
import Link from "next/link";

interface NegotiationTaskCardProps {
  task: TasksType;
  onAction: (task: TasksType, action: string) => void;
}

const NegotiationTaskCard: React.FC<NegotiationTaskCardProps> = ({ task, onAction }) => {
  const contract = task.contract;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-white font-mono text-lg font-bold">CNT-{contract.id.slice(0,6)}</span>
            <div className="flex items-center px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 text-white mr-2" />
              <span className="text-white text-sm font-medium">{getDaysLeft(contract.response_deadline)} days left</span>
            </div>
          </div>
          <span className={`${getStatusColor(contract.status)} px-4 py-1 rounded-full text-sm font-semibold`}>
            {contract.status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-5">{contract.title}</h3>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {/* Supplier */}
          <div className="flex items-start space-x-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Specialist</p>
              <p className="text-sm font-semibold text-gray-900">{contract.specialist || "---" }</p>
            </div>
          </div>

          {/* Domain */}
          <div className="flex items-start space-x-3">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Tag className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Domain</p>
              <p className="text-sm font-semibold text-gray-900">{contract.domain}</p>
            </div>
          </div>

          {/* Proposed Rate */}
          <div className="flex items-start space-x-3">
            <div className="bg-orange-50 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Proposed Rate</p>
              <p className="text-sm font-bold text-orange-600">€{contract.proposed_rate}/day</p>
            </div>
          </div>

          {/* Contract Period */}
          <div className="flex items-start space-x-3">
            <div className="bg-indigo-50 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Contract Duration</p>
              <p className="text-sm font-semibold text-gray-900">
                {contract.valid_from} → {contract.valid_till}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => onAction(task, "accept")}
            className="flex items-center justify-center cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors font-medium text-sm"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Accept
          </button>
          <button
            onClick={() => onAction(task, "counter-offer")}
            className="flex items-center justify-center cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors font-medium text-sm"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Counter
          </button>
          <button
            onClick={() => onAction(task, "reject")}
            className="flex items-center justify-center cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors font-medium text-sm"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default NegotiationTaskCard;