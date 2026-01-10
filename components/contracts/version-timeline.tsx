import { ContractVersion } from "@/app/dashboard/contracts/[id]/versions/page";
import { ChevronRight, History } from "lucide-react";

interface VersionTimelineProps {
  versions: ContractVersion[];
  selectedVersion: ContractVersion | null;
  onSelectVersion: (version: ContractVersion) => void;
}

const VersionTimeline: React.FC<VersionTimelineProps> = ({ versions, selectedVersion, onSelectVersion }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <History className="w-6 h-6 text-gray-700" />
          <h3 className="text-xl font-bold text-gray-900">Version History</h3>
        </div>
      </div>

      <div className="space-y-3">
        {versions.map((version, index) => (
          <button
            key={version.id}
            onClick={() => onSelectVersion(version)}
            className={`w-full text-left border-2 rounded-lg p-4 transition-all ${
              selectedVersion?.id === version.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                  version.is_current
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  v{version.version_number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-semibold text-gray-900">Version {version.version_number}</p>
                    {version.is_current && (
                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span>€{version.counter_rate}/day</span>
                    <span>•</span>
                    <span>{version.created_at}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${
                selectedVersion?.id === version.id ? 'text-blue-600' : 'text-gray-400'
              }`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VersionTimeline