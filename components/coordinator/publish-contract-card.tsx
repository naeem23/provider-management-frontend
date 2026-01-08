import { PublishedContract } from "@/types/dashboard";
import { Clock, Eye } from "lucide-react";

// Published Contract Card Component
interface PublishedContractCardProps {
  contract: PublishedContract;
}

const PublishedContractCard: React.FC<PublishedContractCardProps> = ({ contract }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
              {contract.id}
            </span>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
              Open
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {contract.daysLeft} days left
            </span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{contract.title}</h4>
          <div className="flex items-center space-x-6 text-sm">
            <div>
              <p className="text-gray-500">Offers Received</p>
              <p className="text-2xl font-bold text-blue-600">{contract.offersReceived}</p>
            </div>
            <div>
              <p className="text-gray-500">Deadline</p>
              <p className="font-medium text-gray-900">{contract.offerDeadline}</p>
            </div>
            <div>
              <p className="text-gray-500">Domains</p>
              <div className="flex gap-2 mt-1">
                {contract.domains.map((domain, idx) => (
                  <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button className="ml-4 flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          <Eye className="w-4 h-4 mr-2" />
          View Offers
        </button>
      </div>
    </div>
  );
};

export default PublishedContractCard;