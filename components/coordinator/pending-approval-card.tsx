import { PendingApproval } from "@/types/dashboard";

// Pending Approval Card Component
interface PendingApprovalCardProps {
  contract: PendingApproval;
}

const PendingApprovalCard: React.FC<PendingApprovalCardProps> = ({ contract }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded">
              {contract.id}
            </span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
              Terms Agreed
            </span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{contract.title}</h4>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Supplier</p>
              <p className="font-medium text-gray-900">{contract.supplier}</p>
            </div>
            <div>
              <p className="text-gray-500">Agreed Rate</p>
              <p className="font-medium text-gray-900">€{contract.agreedRate}/day</p>
            </div>
            <div>
              <p className="text-gray-500">Start Date</p>
              <p className="font-medium text-gray-900">{contract.startDate}</p>
            </div>
            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-medium text-gray-900">12 months</p>
            </div>
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-700"><span className="font-medium">Scope:</span> {contract.scope}</p>
          </div>
        </div>
        <div className="ml-4 flex flex-col space-y-2">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap">
            Approve Contract
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Request Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalCard;