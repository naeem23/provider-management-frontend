import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { SubmittedOffer } from '@/types/dashboard';

interface OfferCardProps {
  offer: SubmittedOffer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-gray-600 bg-gray-50 px-2 py-1 rounded">
              {offer.requestId}
            </span>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              offer.status === 'accepted' 
                ? 'bg-green-50 text-green-700' 
                : 'bg-yellow-50 text-yellow-700'
            }`}>
              {offer.status === 'accepted' ? 'Accepted' : 'Under Review'}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">{offer.title}</h4>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Specialist: <span className="font-medium">{offer.specialist}</span></span>
            <span>•</span>
            <span>Daily Rate: <span className="font-medium">€{offer.dailyRate}</span></span>
            <span>•</span>
            <span>Submitted: {offer.submittedDate}</span>
          </div>
        </div>
        {offer.status === 'accepted' ? (
          <CheckCircle className="w-8 h-8 text-green-500" />
        ) : (
          <Clock className="w-8 h-8 text-yellow-500" />
        )}
      </div>
    </div>
  );
};

export default OfferCard;