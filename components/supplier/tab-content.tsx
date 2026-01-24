import React from 'react';
import { FileText, } from 'lucide-react';
import { ActiveOrder, SubmittedOffer, TabType } from '@/types/dashboard';
import TaskCard from './task-card';
import EmptyState from '../empty-state';
import OffersTab from './offers-tab';
import SpecialistsTab from './specialists-tab';
import { FlowableTask } from '@/types/service-type';
import ActiveOrdersTab from './active-order-tab';

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
          <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2">
            {flowableTasks.length > 0 && flowableTasks.map((task) => (
              <TaskCard key={task.task_id} task={task} />
            ))}
          </div>
          
          {flowableTasks.length === 0 && (
            <EmptyState 
              icon={FileText} 
              message="No flowable tasks found." 
            />
          )}
        </div>
      )}

      {activeTab === 'my-offers' && (
        <OffersTab />
      )}

      {activeTab === 'active-orders' && (
        <ActiveOrdersTab />
      )}

      {activeTab === 'specialists' && (
        <SpecialistsTab />
      )}
    </div>
  );
};

export default TabContent;