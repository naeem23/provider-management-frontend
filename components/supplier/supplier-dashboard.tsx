'use client';

import MetricCard from '@/components/metric-card';
import TabContent from '@/components/supplier/tab-content';
import TabNavigation from '@/components/supplier/tab-navigation';
import { fetchWithAuth } from '@/lib/auth';
import { activeOrders, submittedOffers } from '@/lib/dummy-data';
import { TabType } from '@/types/dashboard';
import { FlowableTask, ServiceOffer } from '@/types/service-type';
import { SpecialistDetails } from '@/types/user';
import React, { useEffect, useState } from 'react';

const SupplierDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('action-required');
  const [flowableTasks, setFlowableTasks] = useState<FlowableTask[]>([]);
  const [offers, setOffers] = useState<ServiceOffer[]>([]);
  const [orders, setOrders] = useState<any>([]);
  const [specialists, setSpecialists] = useState<SpecialistDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Update type based on activeTab
    let newType = "tasks";

    if (activeTab === 'my-offers') {
        newType = 'offers'
    } else if (activeTab === 'active-orders') {
        newType = 'orders';
    } else if (activeTab === 'specialists') {
        newType = 'specialist';
    }
    
    fetchData(newType);
  }, [activeTab]);


  const fetchData = async (tabType: string) => {
    try {
        let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-requests/tasks`

        if (tabType === 'offers')
            url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-offers`
        else if (tabType === 'orders')
            url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/service-orders`
        else if (tabType === 'specialists')
            url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/specialists/specialists`
        
        const response = await fetchWithAuth(url)

        if (response.ok) {
            const data = await response.json()

            if (tabType === 'tasks' && data?.tasks) {
                setFlowableTasks(data.tasks)
            } else if (tabType === 'offers') {
                setOffers(data)
            } else if (tabType === 'orders') {
                setOrders(data)
            } else if (tabType === 'specialists') {
                setSpecialists(data)
            }
        }
    } catch (error) {
        console.error(`Error fetching data:`, error)
    } finally {
        setIsLoading(false)
    }
  }

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