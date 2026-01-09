'use client';

import MetricCard from '@/components/metric-card';
import TabContent from '@/components/supplier/tab-content';
import TabNavigation from '@/components/supplier/tab-navigation';
import { activeOrders, flowableTasks, metrics, submittedOffers } from '@/lib/dummy-data';
import { TabType } from '@/types/dashboard';
import React, { useState } from 'react';

const SupplierDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('action-required');

  return (
    <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <TabNavigation 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                actionRequiredCount={flowableTasks.length}
            />
            <TabContent
                activeTab={activeTab}
                flowableTasks={flowableTasks}
                submittedOffers={submittedOffers}
                activeOrders={activeOrders}
            />
        </div>
    </div>
  );
};

export default SupplierDashboard;