import { fetchWithAuth } from '@/lib/auth';
import { SpecialistType } from '@/types/dashboard';
import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import Link from 'next/link';


const SpecialistsTab = () => {
  const [specialists, setSpecialists] = useState<SpecialistType[]>([])

  useEffect(() => {
    fetchSpecialists()
  }, [])
  
  const fetchSpecialists = async () => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/specialists/specialists`)

      if (response.ok) {
        const data = await response.json()
        setSpecialists(data)
      }
    } catch (error) {
      console.error('Error fetching specialists:', error)
    }
  }

  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">My Specialists</h3>
        </div>
        <div className="space-y-4">
        {specialists && specialists.map((specialist) => (
            <div
                key={specialist.specialist_code}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white"
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {specialist.specialist_code}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        specialist.status === 'Active' 
                            ? 'bg-green-50 text-green-700' 
                            : specialist.status === 'On Leave'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-gray-50 text-gray-700'
                        }`}>
                            {specialist.status}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                        specialist.experience_level === 'EXPERT' 
                            ? 'bg-purple-50 text-purple-700' 
                            : specialist.experience_level === 'LEAD'
                            ? 'bg-indigo-50 text-indigo-700'
                            : specialist.experience_level === 'SENIOR'
                            ? 'bg-blue-50 text-blue-700'
                            : specialist.experience_level === 'MID'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-50 text-gray-700'
                        }`}>
                            {specialist.experience_level}
                        </span>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {specialist.first_name} {specialist.last_name}
                    </h4>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>Role: <span className="font-medium">{specialist.role_name}</span></span>
                        <span>•</span>
                        <span>Rate: <span className="font-medium">€{specialist.avg_daily_rate}/day</span></span>
                        <span>•</span>
                        <span>Location: <span className="font-medium">{specialist.location}</span></span>
                        <span>•</span>
                        <span className="font-medium capitalize">{specialist.work_mode}</span>
                    </div>

                    {specialist.specialization && (
                        <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Specialization:</span> {specialist.specialization}
                        </div>
                    )}

                    {specialist.status === 'Active' && specialist.available_from && (
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Available: {specialist.available_from} - {specialist.available_until}</span>
                            <span className="ml-4">Max: {specialist.max_weekly_hours}h/week</span>
                        </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                        {specialist.skills.split(',').slice(0, 5).map((skill, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                            {skill.trim()}
                        </span>
                        ))}
                        {specialist.skills.split(',').length > 5 && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                            +{specialist.skills.split(',').length - 5} more
                        </span>
                        )}
                    </div>

                    {specialist.language_spoken && (
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Languages:</span> {specialist.language_spoken}
                    </div>
                    )}
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                        <Link href={`/dashboard/specialists/${specialist.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap">
                            View Profile
                        </Link>
                    </div>
                </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default SpecialistsTab;