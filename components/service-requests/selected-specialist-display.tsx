import React from 'react';
import { X, Star } from 'lucide-react';
import { SpecialistDetails } from '@/types/user';

interface Props {
  specialist: SpecialistDetails;
  onRemove: () => void;
  onChangeClick: () => void;
}

export const SelectedSpecialistDisplay: React.FC<Props> = ({ specialist, onRemove, onChangeClick }) => {
  const getExperienceColor = (grade: string) => {
    switch (grade) {
      case 'LEAD': return 'bg-green-100 text-green-800';
      case 'EXPERT': return 'bg-blue-100 text-blue-800';
      case 'SENIOR': return 'bg-yellow-100 text-yellow-800';
      case 'MID': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h4 className="text-lg font-bold text-gray-900 mr-3">{specialist.first_name} {specialist.last_name}</h4>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getExperienceColor(specialist.experience_level)}`}>
              {specialist.experience_level}
            </span>
            <span className={`ml-2 text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(specialist.status)}`}>
              {specialist.status}
            </span>
          </div>

          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">Roles</p>
            <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-white text-gray-700 px-3 py-1 rounded-full border border-gray-300">
                  {specialist.role_name}
                </span>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">Specialization</p>
            <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-white text-gray-700 px-3 py-1 rounded-full border border-gray-300">
                  {specialist.specialization}
                </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="bg-white rounded p-2">
              <p className="text-xs text-gray-500">Skills</p>
              <span className="font-bold text-blue-600">{specialist.skills}</span>
            </div>
            <div className="bg-white rounded p-2">
              <p className="text-xs text-gray-500">Certifications</p>
              <span className="font-bold text-purple-600">{specialist.certifications}</span>
            </div>
            <div className="bg-white rounded p-2">
              <p className="text-xs text-gray-500">Languages</p>
              <span className="font-bold text-purple-600">{specialist.languages_spoken}</span>
            </div>
          </div>

          <div className="bg-white rounded p-2">
            <p className="text-xs text-gray-500">Avg. Daily Rate</p>
            <p className="font-bold text-lg text-gray-900">€{specialist.avg_daily_rate}/day</p>
          </div>
        </div>

        <button onClick={onRemove} className="ml-4 text-red-600 hover:text-red-800">
          <X className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={onChangeClick}
        className="cursor-pointer mt-4 w-full bg-white border border-blue-300 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
      >
        Change Specialist
      </button>
    </div>
  );
};