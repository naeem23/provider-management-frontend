import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { FlowableTask } from '@/types/dashboard';

interface TaskCardProps {
  task: FlowableTask;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {task.id}
            </span>
            {task.priority === 'high' && (
              <span className="flex items-center text-xs font-semibold text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                High Priority
              </span>
            )}
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {task.deadline} remaining
            </span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h4>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span>Role: <span className="font-medium">{task.role}</span></span>
            <span>•</span>
            <span>Domain: <span className="font-medium">{task.domain}</span></span>
          </div>
          <div className="flex flex-wrap gap-2">
            {task.requiredSkills.map((skill, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <button className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Submit Offer
        </button>
      </div>
    </div>
  );
};

export default TaskCard;