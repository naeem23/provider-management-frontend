import { ContractType } from "@/types/contract-type";
import { Eye } from "lucide-react";
import Link from "next/link";

interface ActiveContractCardProps {
  contract: ContractType;
  type: string;
}

const ActiveContractCard: React.FC<ActiveContractCardProps> = ({ contract, type }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded">
              {contract.contract_code}
            </span>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
              {contract.status}
            </span>
            {/* {type === 'expiring' && (
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {contract.days_left} days left
            </span>
            )} */}
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{contract.title}</h4>
          <div className="grid grid-cols-4 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500">Specialist</p>
              <p className="font-medium text-gray-900">{contract.specialist_name}</p>
            </div>
            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-medium text-gray-900">{contract.valid_from} - {contract.valid_till}</p>
            </div>
            <div>
              <p className="text-gray-500">Negotiated Rate</p>
              <p className="font-semibold text-green-600">€{contract?.negotiated_rate}</p>
            </div>
          </div>
        </div>
        
        <Link href={`/dashboard/contracts/${contract.id}/versions`} className="ml-4 flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          <Eye className="w-4 h-4 mr-2" />
          View Versions
        </Link>
      </div>
    </div>
  );
};

export default ActiveContractCard