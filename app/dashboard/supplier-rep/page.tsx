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
    <div className="max-w-7xl mx-auto px-6 py-8">
    {/* Welcome Section */}
    <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back, Max!</h2>
        <p className="text-gray-600 mt-1">Here's what's happening with your service requests today.</p>
    </div>

    {/* Metrics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, idx) => (
        <MetricCard key={idx} metric={metric} />
        ))}
    </div>

    {/* Navigation Tabs and Content */}
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