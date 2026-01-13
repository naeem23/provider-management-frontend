import { fetchWithAuth } from "@/lib/auth";
import { TasksType } from "@/types/contract-type";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { ModalMessageType } from "./coordinator-dashboard";

interface ModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  action: string | null;
  task: TasksType | null; 
  setModalMessage: React.Dispatch<SetStateAction<{type: ModalMessageType, text: string}>>;
  setRefetchTasks: React.Dispatch<SetStateAction<boolean>>;
}

const NegotiationModal: React.FC<ModalProps> = ({ isOpen, onClose, action, task, setModalMessage, setRefetchTasks }) => {
  const router = useRouter()
  const [performingAction, setPerformingAction] = useState(false)

  if (!isOpen) return null;

  const performAction = async () => {
    if (action === 'counter-offer') {
      if (task?.contract?.id)
        router.push(`/dashboard/contracts/${task?.contract?.id}/counter-offer/${task?.task_id}`)
      
      setTimeout(() => {
        onClose(false)
      }, 500)
    } else if (action === 'accept' || action === 'reject') {
      setPerformingAction(true)
      try {
        const response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/contracts/tasks/${task?.task_id}/${action}/`,
          {
            method: "POST"
          }
        )

        if (response.ok) {
          setModalMessage({type: 'success', text: `Flowable task completed and contract ${action}ed.`})
        } else {
          setModalMessage({type: 'error', text: `Failed to complete flowable task and ${action} contract.`})
        }
      } catch (error) {
        setModalMessage({type: 'error', text: 'Network error. Please check your connection and try again.'})
        console.error('contract accept/reject error:', error)        
      } finally {
        setPerformingAction(false);
        setRefetchTasks(true)
        onClose(false)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Action</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to proceed with this action for contract "{task?.contract?.title}"?
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => onClose(false)}
            className="flex-1 cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={performAction}
            className="flex-1 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {performingAction ? "Compliting task..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NegotiationModal