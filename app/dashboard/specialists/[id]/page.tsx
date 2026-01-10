"use client"

import { useEffect, useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Clock, Briefcase, Award, Globe, FileText, Edit, Trash2, CheckCircle, XCircle, Frown } from 'lucide-react';
import Link from 'next/link';
import { SpecialistType } from '@/types/dashboard';
import { useParams } from 'next/navigation';
import { fetchWithAuth } from '@/lib/auth';


const SpecialistProfileView: React.FC = () => {
  const params = useParams()
  const specialistId = params.id as string
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [specialist, setSpecialist] = useState<SpecialistType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSpecialistData()
  }, [specialistId])

    const fetchSpecialistData = async () => {
        try {
            const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/specialists/specialists/${specialistId}/`)

            if (response.ok) {
                const data = await response.json()
                setSpecialist(data)
            }
        } catch (error) {
            console.error('Failed to fetch specialist:', error)
        } finally {
            setIsLoading(false)
        }
    }
  
  const getExperienceLevelColor = (level: string): string => {
    switch (level) {
      case 'EXPERT': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'LEAD': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'SENIOR': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'MID': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Active': return 'bg-green-50 text-green-700 border-green-200';
      case 'On Leave': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (!specialist) {
    return (
        <div className="text-center py-12">
            <Frown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Sorry, we couldn't found any specialist with this id!</p>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              {/* <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-3xl font-bold">
                {specialist.first_name[0]}{specialist.last_name[0]}
              </div> */}
              
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {specialist?.first_name} {specialist?.last_name}
                  </h1>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize border ${getStatusColor(specialist?.status)}`}>
                    {specialist?.status}
                  </span>
                </div>
                
                <p className="text-xl text-gray-600 mb-3">{specialist?.role_name}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className={`px-3 py-1 rounded-full border font-medium ${getExperienceLevelColor(specialist?.experience_level)}`}>
                    {specialist?.experience_level}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {specialist?.location}
                  </span>
                  <span className="capitalize font-medium">{specialist?.work_mode}</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-semibold text-blue-600">{specialist?.specialist_code}</span>
                </div>
              </div>
            </div>
            
            {/* <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button className="flex items-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium">
                <Trash2 className="w-4 h-4 mr-2" />
                Deactivate
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">€{specialist?.avg_daily_rate}</p>
                  <p className="text-sm text-gray-600 mt-1">Daily Rate</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">{specialist?.max_weekly_hours}h</p>
                  <p className="text-sm text-gray-600 mt-1">Max Weekly Hours</p>
                </div>
                {/* <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">{assignmentHistory.filter(a => a.status === 'completed').length}</p>
                  <p className="text-sm text-gray-600 mt-1">Completed Projects</p>
                </div> */}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['overview', 'skills'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors capitalize ${
                        activeSection === section
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeSection === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Specialization
                      </h3>
                      <p className="text-gray-900">{specialist?.specialization}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Notes
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{specialist?.notes}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Availability Window
                      </h3>
                      <div className="flex items-center space-x-4 text-gray-900">
                        <span className="font-medium">{specialist?.available_from}</span>
                        <span className="text-gray-400">→</span>
                        <span className="font-medium">{specialist?.available_until}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Added to System</p>
                        <p className="text-gray-900 font-medium">{specialist?.created_at?.split('T')[0]}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                        <p className="text-gray-900 font-medium">{specialist?.updated_at?.split('T')[0]}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'skills' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Technical Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {specialist.skills.split(',').map((skill, idx) => (
                          <span key={idx} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        Certifications
                      </h3>
                      <div className="space-y-2">
                        {specialist.certifications.split(',').map((cert, idx) => (
                          <div key={idx} className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-gray-900">{cert.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        Languages
                      </h3>
                      <div className="space-y-2">
                        {specialist.language_spoken.split(',').map((lang, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-gray-900">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{lang.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* {activeSection === 'assignments' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Assignment History</h3>
                    {assignmentHistory.map((assignment) => (
                      <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                {assignment.id}
                              </span>
                              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                assignment.status === 'active' 
                                  ? 'bg-green-50 text-green-700' 
                                  : 'bg-gray-50 text-gray-700'
                              }`}>
                                {assignment.status === 'active' ? 'Active' : 'Completed'}
                              </span>
                            </div>
                            <h4 className="font-semibold text-gray-900">{assignment.client}</h4>
                            <p className="text-sm text-gray-600">{assignment.role}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">€{assignment.dailyRate}</p>
                            <p className="text-xs text-gray-500">per day</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {assignment.startDate}
                          </span>
                          <span>→</span>
                          <span>{assignment.endDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSection === 'documents' && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Contracts, certificates, and other documents will appear here</p>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Info */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <a href={`mailto:${specialist?.email}`} className="text-blue-600 hover:underline break-all">
                      {specialist?.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <a href={`tel:${specialist?.phone}`} className="text-blue-600 hover:underline">
                      {specialist?.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className="text-gray-900">{specialist?.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Assign to Project
                </button>
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Send Message
                </button>
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  View Calendar
                </button>
              </div>
            </div> */}

            {/* Work Preferences */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Work Preferences</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Work Mode</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">{specialist?.work_mode}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Max Hours/Week</span>
                  <span className="text-sm font-medium text-gray-900">{specialist?.max_weekly_hours}h</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Daily Rate</span>
                  <span className="text-sm font-medium text-gray-900">€{specialist?.avg_daily_rate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistProfileView;