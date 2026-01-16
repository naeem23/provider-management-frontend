import React from 'react';
import { FileText, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { CriteriaJSON, ServiceRequest } from '@/types/service-type';

interface Props {
  serviceRequest: ServiceRequest;
}

export const ServiceRequestSidebar: React.FC<Props> = ({ serviceRequest }) => {
  const skills = serviceRequest.criteria_json?.skills || []
  const certifications = serviceRequest.criteria_json?.certifications || []
  const languages = serviceRequest.criteria_json?.languages || []
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-blue-600" />
        Service Request Details
      </h3>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Title</p>
          <p className="font-semibold text-gray-900">{serviceRequest.title}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
              {serviceRequest.status}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800 font-medium mb-2">Required Profile</p>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-blue-600">Role</p>
              <p className="font-semibold text-blue-900">{serviceRequest.role_name}</p>
            </div>
            <div>
              <p className="text-xs text-blue-600">Experience Level</p>
              <p className="font-semibold text-blue-900">{serviceRequest.experience_level}</p>
            </div>
            <div>
              <p className="text-xs text-blue-600">Technology</p>
              <p className="font-semibold text-blue-900">{serviceRequest.technology}</p>
            </div>
            <div>
              <p className="text-xs text-blue-600">Specialization In</p>
              <p className="font-semibold text-blue-900">{serviceRequest.specialization}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2">Project Duration</p>
          <div className="flex items-center text-sm text-gray-900 mb-2">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>{serviceRequest.start_date} to {serviceRequest.end_date}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded py-3">
            <p className="text-xs text-gray-500 mb-1">Total Man Days</p>
            <p className="text-xl font-bold text-gray-900">{serviceRequest.expected_man_days} <small className='font-normal text-sm'>days</small></p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2 font-medium">Must Have Skills</p>
          <div className="space-y-1">
            {skills?.map((skill: string, idx: any) => (
              <div key={idx} className="flex items-start text-xs">
                <CheckCircle className="w-3 h-3 mr-2 text-green-600 mt-0.5 shrink-0" />
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2 font-medium">Certifications</p>
          <div className="space-y-1">
            {certifications?.map((item: string, idx: any) => (
              <div key={idx} className="flex items-start justify-between text-xs">
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2 font-medium">Language Requirements</p>
          <div className="space-y-1">
            {languages.length > 0 ? languages?.map((lang: string, idx: any) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-gray-700">{lang}</span>
                {/* <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                  {lang.level}
                </span> */}
              </div>
            )) : (
              <span className="text-gray-700">No language specification</span>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <div className="flex items-center text-yellow-800">
            <AlertCircle className="w-4 h-4 mr-2" />
            <div>
              <p className="text-xs font-medium">Offer Deadline</p>
              <p className="text-sm font-bold">{serviceRequest.offer_deadline}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2 font-medium">Task Description</p>
          <p className="text-xs text-gray-700 leading-relaxed">
            {serviceRequest.task_description}
          </p>
        </div>
      </div>
    </div>
  );
};