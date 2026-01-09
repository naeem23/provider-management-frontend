import { TabType } from '@/types/dashboard';
import React from 'react';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  actionRequiredCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  setActiveTab, 
  actionRequiredCount 
}) => {
  const tabs: TabType[] = ['action-required', 'my-offers', 'active-orders', 'specialists'];

  const formatTabLabel = (tab: string): string => {
    return tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {formatTabLabel(tab)}
            {tab === 'action-required' && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {actionRequiredCount}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;