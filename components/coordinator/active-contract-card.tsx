import { ActiveContract } from "@/types/dashboard";
import { Eye } from "lucide-react";

interface ActiveContractCardProps {
  contract: ActiveContract;
}

const ActiveContractCard: React.FC<ActiveContractCardProps> = ({ contract }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded">
              {contract.id}
            </span>
            <span className="text-xs text-gray-500">{contract.daysRemaining} days remaining</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{contract.title}</h4>
          <div className="grid grid-cols-4 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500">Supplier</p>
              <p className="font-medium text-gray-900">{contract.supplier}</p>
            </div>
            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-medium text-gray-900">{contract.startDate} - {contract.endDate}</p>
            </div>
            <div>
              <p className="text-gray-500">Consumption</p>
              <div className="mt-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: `${contract.consumption}%`}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{contract.consumption}% used</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Active Requests</p>
              <p className="font-medium text-gray-900">{contract.activeRequests} requests</p>
            </div>
          </div>
        </div>
        <button className="ml-4 flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ActiveContractCard