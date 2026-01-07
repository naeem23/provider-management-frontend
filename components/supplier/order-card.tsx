import { ActiveOrder } from '@/types/dashboard';
import React from 'react';

interface OrderCardProps {
  order: ActiveOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
              {order.id}
            </span>
            <span className="text-xs text-gray-500">{order.daysRemaining} days remaining</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {order.specialist} - {order.role}
          </h4>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span>Client: <span className="font-medium">{order.client}</span></span>
            <span>•</span>
            <span>Location: <span className="font-medium">{order.location}</span></span>
            <span>•</span>
            <span>End Date: {order.endDate}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Request Extension
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Initiate Substitution
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;