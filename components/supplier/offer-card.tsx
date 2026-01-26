"use client"

import React from 'react';
import { Calendar, CheckCircle, Clock, DollarSign, MinusCircle, User, XCircle } from 'lucide-react';
import { MyOfferType } from './offers-tab';
import { OfferStatus } from '@/types/dashboard';
import { useRouter } from 'next/navigation';

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
  const router = useRouter()
  const status = offer.status as OfferStatus;
  const { Icon, className } = statusIconMap[status] ?? statusIconMap['SUBMITTED'];
  
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-xs font-semibold text-gray-600 bg-gray-50 px-2 py-1 rounded">
        OF-{offer.id.slice(0,6)}
        </span>
        <span 
          className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
            statusStyles[status] ?? 'bg-gray-50 text-gray-600'
          }`}
        >
          {status}
        </span>
      </div>
      <h4 className="text-lg px-2 font-semibold text-gray-900 mb-4">{offer.request_title}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 px-2 pb-4">
        {/* specialist  */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Specialist</p>
          <div className="flex items-center cursor-pointer group" onClick={() => router.push(`/dashboard/specialists/${offer.specialist_id}`)}>
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium text-gray-900 group-hover:text-blue-500">{offer.specialist_name}</span>
          </div>
          <p className="text-xs text-gray-600 ml-6">{offer.role_name}</p>
        </div>

        {/* daily rate  */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Daily Rate</p>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium text-gray-900">€{offer.daily_rate}</span>
          </div>
        </div>

        {/* duration */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Project Duration</p>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium text-gray-900">{offer.request_duration}</span>
          </div>
        </div>
        
        {/* submitted at  */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Submitted at</p>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">{offer.created_at.split('T')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;