"use client"

import { FileText, Frown, Loader } from 'lucide-react';
import NegotiationModal from '@/components/coordinator/negotiation-modal';
import NegotiationTaskCard from '@/components/coordinator/negotiation-task-card';
import { useEffect, useState } from 'react';
import ActiveContractsTab from './active-contracts-tab';
import { fetchWithAuth } from '@/lib/auth';
import { ContractType, TaskContractType, TasksType } from '@/types/contract-type';
import EmptyState from '../supplier/empty-state';

export type ModalMessageType = "success" | "error" | ""

const ContractCoordinatorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('action-required');
  const [showNegotiationModal, setShowNegotiationModal] = useState<boolean>(false)
  const [contracts, setContracts] = useState<ContractType[]>([])
  const [tasks, setTasks] = useState<TasksType[]>([])
  const [selectedTask, setSelectedTask] = useState<TasksType | null>(null)
  const [modalAction, setModalAction] = useState<string | null>(null)
  const [modalMessage, setModalMessage] = useState<{type: ModalMessageType, text: string}>({type: "", text: ""})
  const [refetchTasks, setRefetchTasks] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Update type based on activeTab
    let newType = "tasks";

    if (activeTab === 'new-contracts') {
        newType = 'published-only'
    } else if (activeTab === 'active-contracts') {
        newType = 'active';
    } else if (activeTab === 'expiring-contracts') {
        newType = 'expiring';
    }
    
    fetchContracts(newType);
  }, [activeTab]);

  useEffect(() => {
    if (refetchTasks){
        fetchContracts("tasks");
        setRefetchTasks(false);
    }
  }, [refetchTasks])
  

  const fetchContracts = async (queryType: string) => {
    try {
        const url = queryType === 'tasks' ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/contracts/tasks` : `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/contracts/?q=${queryType}`

        const response = await fetchWithAuth(url)

        if (response.ok) {
            const data = await response.json()

            if (queryType === 'tasks' && data?.tasks) {
                setTasks(data.tasks)
            } else {
                setContracts(data)
            }
        }
    } catch (error) {
        console.error(`Error fetching contracts:`, error)
    } finally {
        setIsLoading(false)
    }
  }
  
  useEffect(() => {
    if (!modalMessage.text) return;

    const timer = setTimeout(() => {
        setModalMessage({ type: "", text: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [modalMessage]);

  const handleNegotiation = (task: TasksType, action: string) => {
    setSelectedTask(task);
    setModalAction(action);
    setShowNegotiationModal(true);
  };

  return (
    <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                    {['action-required', 'new-contracts', 'active-contracts', 'expiring-contracts'].map((tab) => (
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
                            {tasks.length}
                        </span>
                        )}
                        {tab === 'new-contracts' && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {contracts.length}
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
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Active Negotiation Tasks</h3>
                        <span className="text-sm text-gray-500">From Flowable Process Engine</span>
                    </div>
                    {isLoading && (
                        <div className="space-y-4">
                            <EmptyState 
                                icon={Loader}
                                message='Fetching contracts....'
                            />
                        </div>
                    )}
                    {!isLoading && tasks?.length === 0 && (
                        <div className="space-y-4">
                            <EmptyState 
                                icon={Frown}
                                message='No flowable tasks found.'
                            />
                        </div>
                    )}
                    {!isLoading && tasks?.length > 0 && (
                        <div className="space-y-4">
                            {/* Success Message */}
                            {modalMessage.text && (
                            <div className={`${modalMessage.type === 'success' ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"} px-4 py-3 rounded`}>
                                {modalMessage.text}
                            </div>
                            )}

                            {tasks.map((task) => (
                            <NegotiationTaskCard key={task.task_id} task={task} onAction={handleNegotiation} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            )}

            {activeTab === 'new-contracts' && (
                <ActiveContractsTab contracts={contracts} type="published-only" isLoading={isLoading} setActiveTab={setActiveTab} />
            )}

            {activeTab === 'active-contracts' && (
                <ActiveContractsTab contracts={contracts} isLoading={isLoading} setActiveTab={setActiveTab} type="active" />
            )}
            
            {activeTab === 'expiring-contracts' && (
                <ActiveContractsTab contracts={contracts} isLoading={isLoading} setActiveTab={setActiveTab} type="expiring" />
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
            onClose={setShowNegotiationModal} 
            action={modalAction}
            task={selectedTask}
            setModalMessage={setModalMessage}
            setRefetchTasks={setRefetchTasks}
        />
    </div>
  );
};

export default ContractCoordinatorDashboard;