import { Metric } from '@/types/dashboard';
import React from 'react';

interface MetricCardProps {
  metric: Metric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
          <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
        </div>
        <div className={`${metric.color} p-3 rounded-lg`}>
          <metric.icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;