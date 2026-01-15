import React from 'react';
import { Clock, AlertCircle, Calendar, MapPin, Briefcase } from 'lucide-react';
import { FlowableTask } from '@/types/service-type';
import { getDaysLeft } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface TaskCardProps {
  task: FlowableTask;
  onSubmitOffer?: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onSubmitOffer }) => {
  const router = useRouter()

  const serviceRequest = task?.service_request;
  // Parse criteria_json to extract skills, languages, certifications
  const criteria = serviceRequest?.criteria_json;
  const skills = criteria?.skills || [];

  const getExperienceBadgeColor = (level: string) => {
    switch (level) {
      case 'LEAD':
        return 'bg-green-100 text-green-800'
      case 'EXPERT':
        return 'bg-blue-100 text-blue-800'
      case 'SENIOR':
        return 'bg-purple-100 text-purple-800'
      case 'MID':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Header with ID and Urgency */}
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
              SR-{serviceRequest.external_id?.slice(0,6)}
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {getDaysLeft(serviceRequest.offer_deadline)} days remaining
            </span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            {serviceRequest.title}
          </h4>

          {/* Key Information Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm mb-4">
            <div className="col-span-2 flex items-center justify-between">
              <div className="flex items-center text-gray-900">
                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                <span className="font-semibold text-base mr-2">{serviceRequest.role_name}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getExperienceBadgeColor(serviceRequest.experience_level)}`}>
                {serviceRequest.experience_level}
                </span>
              </div>
            </div>
            
            <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Duration</p>
                <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{serviceRequest.start_date} to {serviceRequest.end_date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-900 mt-1">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{serviceRequest.expected_man_days} days</span>
                </div>
            </div>
          </div>

          {/* Technology/Specialization */}
          {(serviceRequest.technology || serviceRequest.specialization) && (
            <>
              <p className="text-xs font-medium text-gray-500 mb-2">Technology & Specialization</p>
              <div className="flex items-center space-x-2 mb-4">
                {serviceRequest.technology && (
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-sm font-medium">
                    {serviceRequest.technology}
                  </span>
                )}
                {serviceRequest.specialization && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium">
                    {serviceRequest.specialization}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-2">Required Skills:</p>
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 6).map((skill: string, idx: number) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
                {skills.length > 6 && (
                  <span className="text-xs text-gray-500 px-3 py-1">
                    +{skills.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button 
            onClick={() => router.push(`/dashboard/service-request/${serviceRequest.id}/tasks/${task.task_id}`)}
            className="shrink-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap h-fit cursor-pointer"
          >
            Submit Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;