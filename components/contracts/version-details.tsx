import { ContractVersionType } from "@/types/contract-type";
import { AlertCircle, CheckCircle, FileText } from "lucide-react";

// Version Details Component
interface VersionDetailsProps {
  version: ContractVersionType | null;
  currentVersionId: string;
  previousVersion?: ContractVersionType;
}

const VersionDetails: React.FC<VersionDetailsProps> = ({ version, currentVersionId, previousVersion }) => {
  if (!version) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Select a version to view details</p>
      </div>
    );
  }

  // const rateChange = previousVersion 
  //   ? ((version.counter_rate - previousVersion.counter_rate) / previousVersion.counter_rate * 100).toFixed(1)
  //   : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">Version {version.version_number}</h3>
              {version.id === currentVersionId && (
                <span className="flex items-center text-sm font-semibold bg-green-100 text-green-700 px-3 py-1 rounded">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Current Version
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">Created on {version.created_at.split('T')[0]}</p>
          </div>
          {/* {version.id === currentVersionId && (
            <div className="flex space-x-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Accept Offer
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Counter Offer
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                Reject
              </button>
            </div>
          )} */}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Rate Information */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Rate Information</h4>
          <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Counter Rate Proposed</p>
                <p className="text-3xl font-bold text-blue-600">€{version.counter_rate}</p>
                <p className="text-xs text-gray-500 mt-1">per day</p>
              </div>
              {/* {rateChange && (
                <div className={`text-right ${
                  parseFloat(rateChange) > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  <p className="text-sm font-medium mb-1">
                    {parseFloat(rateChange) > 0 ? '+' : ''}{rateChange}%
                  </p>
                  <p className="text-xs">vs. v{version.version_number - 1}</p>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Counter Offer Explanation */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Counter Offer Explanation
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {version.counter_offer_explanation}
            </p>
          </div>
        </div>

        {/* Proposed Terms and Conditions */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Proposed Terms & Conditions
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-96 overflow-y-auto">
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {version.proposed_terms_and_condition}
            </p>
          </div>
        </div>

        {/* Comparison with Previous Version */}
        {previousVersion && (
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Changes from Version {version.version_number - 1}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-red-700 mb-2">Previous (v{previousVersion.version_number})</p>
                <p className="text-lg font-bold text-red-600">€{previousVersion.counter_rate}/day</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-green-700 mb-2">Current (v{version.version_number})</p>
                <p className="text-lg font-bold text-green-600">€{version.counter_rate}/day</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionDetails