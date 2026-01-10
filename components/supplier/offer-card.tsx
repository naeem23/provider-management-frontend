import React from 'react';
import { CheckCircle, Clock, MinusCircle, XCircle } from 'lucide-react';
import { MyOfferType } from './offers-tab';
import { OfferStatus } from '@/types/dashboard';

const statusIconMap: Record<
  OfferStatus,
  { Icon: React.ElementType; className: string }
> = {
    "SUBMITTED": {
      Icon: Clock,
      className: 'text-blue-500',
    },
    "UNDER_REVIEW": {
      Icon: Clock,
      className: 'text-yellow-500',
    },
    "WITHDRAWN": {
      Icon: MinusCircle,
      className: 'text-gray-500',
    },
    "REJECTED": {
      Icon: XCircle,
      className: 'text-red-500',
    },
    "ACCEPTED": {
      Icon: CheckCircle,
      className: 'text-green-500',
    },
};

const statusStyles: Record<OfferStatus, string> = {
  SUBMITTED: 'bg-blue-50 text-blue-700',
  UNDER_REVIEW: 'bg-yellow-50 text-yellow-700',
  WITHDRAWN: 'bg-gray-100 text-gray-700',
  REJECTED: 'bg-red-50 text-red-700',
  ACCEPTED: 'bg-green-50 text-green-700',
};

interface OfferCardProps {
  offer: MyOfferType;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const status = offer.status as OfferStatus;
  const { Icon, className } = statusIconMap[status] ?? statusIconMap['SUBMITTED'];
  
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-gray-600 bg-gray-50 px-2 py-1 rounded">
              {offer.service_request_code}
            </span>
            <span 
              className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                statusStyles[status] ?? 'bg-gray-50 text-gray-600'
              }`}
            >
              {status}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">{offer.role_name}</h4>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Specialist: <span className="font-medium">{offer.specialist_name}</span></span>
            <span>•</span>
            <span>Daily Rate: <span className="font-medium">€{offer.daily_rate}</span></span>
            <span>•</span>
            <span>Submitted: {offer.created_at.split('T')[0]}</span>
          </div>
        </div>
        <Icon className={`w-8 h-8 ${className}`} />
      </div>
    </div>
  );
};

export default OfferCard;