import React, { useEffect, useState } from 'react';
import { X, Search } from 'lucide-react';
import { SpecialistDetails } from '@/types/user';
import { SpecialistCard } from './specialist-card';
import { fetchWithAuth } from '@/lib/auth';

interface Props {
  onSelect: (specialist: SpecialistDetails) => void;
  onClose: () => void;
}

export const SpecialistSelectionModal: React.FC<Props> = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialists, setSpecialists] = useState<SpecialistDetails[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSpecialists([]);
      return;
    }

    const timer = setTimeout(() => {
      searchSpeacialist(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchSpeacialist = async (query: string) => {
    setIsSearching(true);

    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/specialists/specialists?q=${query}`);
      if (response.ok) {
        const data = await response.json();
        setSpecialists(data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Select Specialist</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or role..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchTerm && specialists.length > 0 && specialists.map(specialist => (
              <SpecialistCard
                key={specialist.id}
                specialist={specialist}
                onSelect={(s) => {
                  onSelect(s);
                  onClose();
                }}
              />
            ))}
          </div>
          {searchTerm && specialists.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">{isSearching ? "Searching specialists..." : "No specialists found matching your search."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
