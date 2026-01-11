"use client"

import { FileText, Loader } from 'lucide-react';
import NegotiationModal from '@/components/coordinator/negotiation-modal';
import { pendingApprovals } from '@/lib/dummy-data';
import NegotiationTaskCard from '@/components/coordinator/negotiation-task-card';
import PendingApprovalCard from '@/components/coordinator/pending-approval-card';
import { useEffect, useState } from 'react';
import ActiveContractsTab from './active-contracts-tab';
import { fetchWithAuth } from '@/lib/auth';
import { ContractType } from '@/types/contract-type';
import EmptyState from '../supplier/empty-state';


const ContractCoordinatorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('action-required')
  const [showNegotiationModal, setShowNegotiationModal] = useState<boolean>(false)
  const [negotiationTasks, setNgotiationTasks] = useState<ContractType[]>([])
  const [selectedContract, setSelectedContract] = useState<ContractType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchContracts()
  }, [])

  const fetchContracts = async () => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/contracts`)

        if (response.ok) {
            const data = await response.json()
            setNgotiationTasks(data)
        }
    } catch (error) {
        console.error(`Error fetching contracts:`, error)
    } finally {
        setIsLoading(false)
    }
  }
  
  const handleNegotiation = (contract: ContractType, action: string) => {
    setSelectedContract(contract);
    setShowNegotiationModal(true);
  };

  return (
    <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                    {['action-required', 'expiring-contracts', 'active-contracts'].map((tab) => (
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
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Active Negotiation Tasks</h3>
                    {isLoading ? (
                        <div className="space-y-4">
                            <EmptyState 
                                icon={Loader}
                                message='Fetching contracts....'
                            />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {negotiationTasks.map((task) => (
                                <NegotiationTaskCard key={task.id} task={task} onAction={handleNegotiation} />
                            ))}
                        </div>
                    )}
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
            contractTitle={selectedContract?.title}
        />
    </div>
  );
};

export default ContractCoordinatorDashboard;