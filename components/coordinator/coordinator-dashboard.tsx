"use client"

import { FileText } from 'lucide-react';
import { NegotiationTask } from '@/types/dashboard';
import NegotiationModal from '@/components/coordinator/negotiation-modal';
import { negotiationTasks, pendingApprovals } from '@/lib/dummy-data';
import NegotiationTaskCard from '@/components/coordinator/negotiation-task-card';
import PendingApprovalCard from '@/components/coordinator/pending-approval-card';
import { useState } from 'react';
import ActiveContractsTab from './active-contracts-tab';


const ContractCoordinatorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('action-required');
  const [showNegotiationModal, setShowNegotiationModal] = useState<boolean>(false);
  const [selectedContract, setSelectedContract] = useState<NegotiationTask | null>(null);

  const handleNegotiation = (contract: NegotiationTask, action: string) => {
    setSelectedContract(contract);
    setShowNegotiationModal(true);
  };

  return (
    <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
                {['action-required', 'expiring-contracts', 'active-contracts', 'negotiation-history'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    {tab === 'action-required' && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {negotiationTasks.length + pendingApprovals.length}
                    </span>
                    )}
                </button>
                ))}
            </nav>
            </div>

            <div className="p-6">
            {activeTab === 'action-required' && (
                <div className="space-y-8">
                <div>
                    <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Active Negotiation Tasks</h3>
                    <span className="text-sm text-gray-500">From Flowable Process Engine</span>
                    </div>
                    <div className="space-y-4">
                        {negotiationTasks.map((task) => (
                            <NegotiationTaskCard key={task.id} task={task} onAction={handleNegotiation} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Contracts Awaiting Final Approval</h3>
                    <div className="space-y-4">
                    {pendingApprovals.map((contract) => (
                        <PendingApprovalCard key={contract.id} contract={contract} />
                    ))}
                    </div>
                </div>
                </div>
            )}

            {activeTab === 'expiring-contracts' && (
                <ActiveContractsTab type="expiring" />
            )}

            {activeTab === 'active-contracts' && (
                <ActiveContractsTab type="active" />
            )}

            {activeTab === 'negotiation-history' && (
                <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Negotiation history and audit logs will appear here</p>
                </div>
            )}
            </div>
        </div>

        <NegotiationModal 
            isOpen={showNegotiationModal} 
            onClose={() => setShowNegotiationModal(false)} 
            contractId={selectedContract?.id}
        />
    </div>
  );
};

export default ContractCoordinatorDashboard;