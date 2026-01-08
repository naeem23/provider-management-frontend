import React from 'react';
import { FileText, Users } from 'lucide-react';
import { ActiveOrder, FlowableTask, SubmittedOffer, TabType } from '@/types/dashboard';
import TaskCard from './task-card';
import OfferCard from './offer-card';
import OrderCard from './order-card';
import EmptyState from '../empty-state';

interface TabContentProps {
  activeTab: TabType;
  flowableTasks: FlowableTask[];
  submittedOffers: SubmittedOffer[];
  activeOrders: ActiveOrder[];
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  flowableTasks,
  submittedOffers,
  activeOrders,
}) => {
  return (
    <div className="p-6">
      {activeTab === 'action-required' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Open Bidding Tasks</h3>
            <span className="text-sm text-gray-500">From Flowable Process Engine</span>
          </div>
          <div className="space-y-4">
            {flowableTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'my-offers' && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">My Submitted Offers</h3>
          <div className="space-y-4">
            {submittedOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'active-orders' && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Active Service Orders</h3>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'new-requests' && (
        <EmptyState 
          icon={FileText} 
          message="New service requests will appear here" 
        />
      )}

      {activeTab === 'specialists' && (
        <EmptyState 
          icon={Users} 
          message="Specialist availability calendar will appear here" 
        />
      )}
    </div>
  );
};

export default TabContent;