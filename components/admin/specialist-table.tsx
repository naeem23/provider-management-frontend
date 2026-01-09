import { Specialist } from "@/types/user";
import { Edit2, Eye } from "lucide-react";

interface SpecialistTableProps {
  specialists: Specialist[];
  onEdit: (specialist: Specialist) => void;
  onViewHistory: (specialistId: string) => void;
}

const SpecialistTable: React.FC<SpecialistTableProps> = ({ specialists, onEdit, onViewHistory }) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-700';
      case 'B': return 'bg-blue-100 text-blue-700';
      case 'C': return 'bg-yellow-100 text-yellow-700';
      case 'D': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600';
      case 'assigned': return 'text-blue-600';
      case 'inactive': return 'text-gray-500';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Name</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Roles</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Performance</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Avg Rate</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Assignments</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {specialists.map((specialist) => (
            <tr key={specialist.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                    {specialist.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900">{specialist.name}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {specialist.roles.slice(0, 2).map((role, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {role}
                    </span>
                  ))}
                  {specialist.roles.length > 2 && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      +{specialist.roles.length - 2}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getGradeColor(specialist.performanceGrade)}`}>
                  Grade {specialist.performanceGrade}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className={`text-sm font-medium capitalize ${getStatusColor(specialist.status)}`}>
                  {specialist.status}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                €{specialist.averageDailyRate}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {specialist.activeAssignments} active
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(specialist)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onViewHistory(specialist.id)}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                    title="View History"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpecialistTable