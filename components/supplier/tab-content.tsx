import React from 'react';
import { Calendar, FileText, Users } from 'lucide-react';
import { ActiveOrder, FlowableTask, SubmittedOffer, TabType } from '@/types/dashboard';
import TaskCard from './task-card';
import OfferCard from './offer-card';
import OrderCard from './order-card';
import EmptyState from '../empty-state';
import OffersTab from './offers-tab';
import { specialists } from '@/lib/dummy-data';
import SpecialistsTab from './specialists-tab';

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
        <OffersTab />
      )}

      {activeTab === 'active-orders' && (
        // <div>
        //   <h3 className="text-xl font-bold text-gray-900 mb-6">Active Service Orders</h3>
        //   <div className="space-y-4">
        //     {activeOrders.map((order) => (
        //       <OrderCard key={order.id} order={order} />
        //     ))}
        //   </div>
        // </div>
        <EmptyState 
          icon={FileText} 
          message="No active orders found." 
        />
      )}

      {activeTab === 'specialists' && (
        <SpecialistsTab />
      )}
    </div>
  );
};

export default TabContent;