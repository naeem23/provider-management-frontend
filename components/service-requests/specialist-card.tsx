import React from 'react';
import { Star, User } from 'lucide-react';
import { SpecialistDetails } from '@/types/user';

interface Props {
  specialist: SpecialistDetails;
  onSelect: (specialist: SpecialistDetails) => void;
}

export const SpecialistCard: React.FC<Props> = ({ specialist, onSelect }) => {
  const getExperienceColor = (exp: string) => {
    switch (exp) {
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
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">{specialist.first_name} {specialist.last_name}</h4>
            <p className="text-xs text-gray-500">{specialist.specialist_code}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getExperienceColor(specialist.experience_level)}`}>
            {specialist.experience_level}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(specialist.status)}`}>
          {specialist.status}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-1">Roles</p>
        <div className="flex flex-wrap gap-1">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {specialist.role_name}
            </span>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-1">Specialization</p>
        <div className="flex flex-wrap gap-1">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {specialist.specialization}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500">Avg. Rate</p>
          <span className="font-bold text-gray-900">€{specialist.avg_daily_rate} / day</span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Max weekly hours</p>
          <span className="font-bold text-gray-900">{specialist.max_weekly_hours}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
        <div className="bg-gray-50 rounded p-2 text-center">
          <p className="text-gray-500">Skills</p>
          <p className="font-bold text-blue-600">{specialist.skills}</p>
        </div>
        <div className="bg-gray-50 rounded p-2 text-center">
          <p className="text-gray-500">Certifications</p>
          <p className="font-bold text-purple-600">{specialist.certifications}</p>
        </div>
        <div className="bg-gray-50 rounded p-2 text-center">
          <p className="text-gray-500">Lang</p>
          <p className="font-bold text-green-600">{specialist.languages_spoken}</p>
        </div>
      </div>

      <button
        onClick={() => onSelect(specialist)}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        Select Specialist
      </button>
    </div>
  );
};