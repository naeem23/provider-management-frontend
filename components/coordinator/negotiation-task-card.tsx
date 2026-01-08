import { NegotiationTask } from "@/types/dashboard";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

interface NegotiationTaskCardProps {
  task: NegotiationTask;
  onAction: (task: NegotiationTask, action: string) => void;
}

const NegotiationTaskCard: React.FC<NegotiationTaskCardProps> = ({ task, onAction }) => {
  return (
    <div className="border-2 border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-linear-to-r from-orange-50 to-white">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded">
              {task.id}
            </span>
            {task.priority === 'high' && (
              <span className="flex items-center text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                <AlertTriangle className="w-3 h-3 mr-1" />
                High Priority
              </span>
            )}
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {task.offerDeadline} remaining
            </span>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
              {task.matchScore}% Match
            </span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{task.title}</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Supplier</p>
              <p className="font-semibold text-gray-900">{task.supplier}</p>
            </div>
            <div className="bg-white rounded p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Domain</p>
              <p className="font-semibold text-gray-900">{task.domain}</p>
            </div>
            <div className="bg-white rounded p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Offered Daily Rate</p>
              <p className="font-semibold text-orange-600">€{task.offeredRate}</p>
            </div>
            <div className="bg-white rounded p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Target Rate</p>
              <p className="font-semibold text-green-600">€{task.targetRate}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-xs text-blue-800 font-medium mb-1">Terms & Notes</p>
            <p className="text-sm text-blue-900">{task.terms}</p>
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
        <button 
          onClick={() => onAction(task, 'counter')}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Counter Offer
        </button>
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