import { ActivityLog } from "@/types/dashboard";
import { Activity, Clock } from "lucide-react";

interface ActivityLogProps {
  logs: ActivityLog[];
}

const ActivityLogComponent: React.FC<ActivityLogProps> = ({ logs }) => (
  <div className="space-y-3">
    {logs.map((log) => (
      <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <Activity className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">
            <span className="font-semibold">{log.user}</span> {log.action}
          </p>
          <p className="text-xs text-gray-500 mt-1">{log.details}</p>
          <p className="text-xs text-gray-400 mt-1 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {log.timestamp}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default ActivityLogComponent