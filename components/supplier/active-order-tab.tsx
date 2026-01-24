"use client"

import React, { useState } from 'react';
import {
  User, 
  MapPin, 
  TrendingUp, 
  RefreshCw, 
  Clock, 
  DollarSign,
  AlertCircle,
  FileText,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { ServiceOrder } from '@/types/service-type';
import { useRouter } from 'next/navigation';
import { getDaysLeft } from '@/lib/utils';
import { ExtensionModal } from './extension-modal';
import { SubstitutionModal } from './substitution-modal';


const ActiveOrdersTab: React.FC = () => {
  const router = useRouter()
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showSubstitutionModal, setShowSubstitutionModal] = useState(false);

  // Mock data - In real app, fetch from API
  const activeOrders: ServiceOrder[] = [
    {
      id: 'SO-2024-012',
      title: 'Senior Java Developer for Banking Platform',
      current_specialist_id: 'Michael Chen',
      current_specialist_name: 'Michael Chen',
      original_specialist_id: 'Michael Chen',
      original_specialist_name: 'Michael Chen',
      supplier_name: 'Global Finance Corp',
      role: 'Solution Architect',
      start_date: '2026-01-15',
      current_end_date: '2026-03-15',
      original_end_date: '2026-02-28',
      current_man_days: 120,
      consumed_man_days: 85,
      remaining_man_days: 15,
      daily_rate: 850,
      current_contract_value: 102000,
      original_contract_value: 100000,
      has_been_extended: true,
      has_been_substituted: false,
      status: 'ACTIVE'
    },
    {
      id: 'SO-2024-018',
      title: 'Frontend Developer - React/TypeScript',
      current_specialist_id: 'Michael Chen',
      current_specialist_name: 'Michael Chen',
      original_specialist_id: 'Michael Chen',
      original_specialist_name: 'Michael Chen',
      supplier_name: 'TechStart GmbH',
      role: 'Frontend Developer',
      start_date: '2023-11-01',
      current_end_date: '2024-02-28',
      original_end_date: '2024-02-28',
      current_man_days: 80,
      consumed_man_days: 65,
      remaining_man_days: 15,
      daily_rate: 750,
      current_contract_value: 60000,
      original_contract_value: 60000,
      has_been_extended: false,
      has_been_substituted: false,
      status: 'ACTIVE'
    },
    {
      id: 'SO-2024-025',
      title: 'DevOps Engineer - Cloud Infrastructure',
      current_specialist_id: 'Michael Chen',
      current_specialist_name: 'Michael Chen',
      original_specialist_id: 'Michael Chen',
      original_specialist_name: 'Michael Chen',
      supplier_name: 'CloudTech Solutions',
      role: 'DevOps Engineer',
      start_date: '2023-12-01',
      current_end_date: '2024-05-31',
      original_end_date: '2024-04-30',
      current_man_days: 140,
      consumed_man_days: 55,
      remaining_man_days: 85,
      daily_rate: 820,
      current_contract_value: 114800,
      original_contract_value: 102000,
      has_been_extended: true,
      has_been_substituted: true,
      status: 'ACTIVE'
    }
  ];

  const handleRequestExtension = (order: ServiceOrder) => {
    setSelectedOrder(order);
    setShowExtensionModal(true);
  };

  const handleRequestSubstitution = (order: ServiceOrder) => {
    setSelectedOrder(order);
    setShowSubstitutionModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'SUSPENDED': return 'bg-orange-100 text-orange-800';
      case 'PENDING_EXTENSION': return 'bg-yellow-100 text-yellow-800';
      case 'PENDING_SUBSTITUTION': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Active Service Orders</h3>
      </div>

      {activeOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No active service orders</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              {/* Header Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded">
                      SO-{order.id.slice(0,6)}
                    </span>
                    <span className={`text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    {order.has_been_extended && (
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Extended
                      </span>
                    )}
                    {order.has_been_substituted && (
                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded flex items-center">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Substituted
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{order.title}</h4>
                  <p className="flex items-center text-sm text-gray-600">
                    <Briefcase className='w-4 h-4 mr-1' />
                     {order.supplier_name}
                  </p>
                </div>
              </div>

              {/* Specialist & Location Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                {/* current specialist */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current Specialist</p>
                  <div className="flex items-center cursor-pointer group" onClick={() => router.push(`/dashboard/specialists/${order.current_specialist_id}`)}>
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium text-gray-900 group-hover:text-blue-500">{order.current_specialist_name}</span>
                  </div>
                  <p className="text-xs text-gray-600 ml-6">{order.role}</p>
                </div>
                {/* original specialist */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Original Specialist</p>
                  <div className="flex items-center cursor-pointer group" onClick={() => router.push(`/dashboard/specialists/${order.original_specialist_id}`)}>
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium text-gray-900 group-hover:text-blue-500">{order.original_specialist_name}</span>
                  </div>
                </div>
                {/* daily_rate */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Daily Rate</p>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium text-gray-900">€{order.daily_rate}</span>
                  </div>
                </div>
              </div>

              {/* Timeline & Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Timeline */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500 font-medium">Timeline</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Start:</span>
                      <span className="font-medium text-gray-900">{order.start_date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">End:</span>
                      <span className="font-medium text-gray-900">{order.current_end_date}</span>
                    </div>
                    {order.has_been_extended && (
                      <div className="flex justify-between text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        <span>Original End:</span>
                        <span className="font-medium">{order.original_end_date}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Man Days Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500 font-medium">Man Days Progress</p>
                    <span className="text-xs font-semibold text-gray-900">
                      {order.consumed_man_days} / {order.current_man_days}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${(order.consumed_man_days / order.current_man_days) * 100}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <p className="text-gray-500">Consumed</p>
                      <p className="font-bold text-gray-900">{order.consumed_man_days}</p>
                    </div>
                    <div className="bg-green-50 rounded p-2 text-center">
                      <p className="text-gray-500">Remaining</p>
                      <p className="font-bold text-green-600">{order.remaining_man_days}</p>
                    </div>
                    <div className="bg-blue-50 rounded p-2 text-center">
                      <p className="text-gray-500">Total</p>
                      <p className="font-bold text-blue-600">{order.current_man_days}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contract Value */}
              <div className="bg-linear-to-r from-gray-50 to-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Current Contract Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      €{order.current_contract_value.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Original Contract Value</p>
                    <p className="text-xl font-bold text-blue-600">
                      €{order.original_contract_value.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning Messages */}
              {order.remaining_man_days <= 20 && (
                <div className="flex items-start bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Low remaining man days</p>
                    <p>Only {order.remaining_man_days} man days remaining. Consider requesting an extension.</p>
                  </div>
                </div>
              )}

              {order.current_end_date && getDaysLeft(order.current_end_date) <= 14 && (
                <div className="flex items-start bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 shrink-0" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium">Approaching end date</p>
                    <p>Only {getDaysLeft(order.current_end_date)} days until project end date.</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleRequestExtension(order)}
                  className="flex-1 flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Request Extension
                </button>
                <button
                  onClick={() => handleRequestSubstitution(order)}
                  className="flex-1 flex items-center justify-center bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Request Substitution
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Extension Modal Preview */}
      {showExtensionModal && selectedOrder && (
        <ExtensionModal
            isOpen={showExtensionModal} 
            onClose={setShowExtensionModal}
            serviceOrder={selectedOrder}
        />
      )}

      {/* Substitution Modal Preview */}
      {showSubstitutionModal && selectedOrder && (
        <SubstitutionModal
            isOpen={showSubstitutionModal} 
            onClose={setShowSubstitutionModal}
            serviceOrder={selectedOrder}
         />
      )}
    </div>
  );
};

export default ActiveOrdersTab;