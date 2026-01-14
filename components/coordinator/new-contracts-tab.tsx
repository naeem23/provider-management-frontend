import { ContractType } from "@/types/contract-type";
import { useEffect, useState } from "react";
import EmptyState from "../empty-state";
import { Loader } from "lucide-react";
import ContractSummaryCard from "../contracts/contract-summary-card";
import { fetchWithAuth } from "@/lib/auth";

interface NewContractsTabProps {
  setActiveTab: (tab: string) => void;
}

const NewContractsTab: React.FC<NewContractsTabProps> = ({ setActiveTab }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [newContracts, setNewContracts] = useState<ContractType[]>([])

    useEffect(() => {
        fetchNewContracts()
    }, [])

    const fetchNewContracts = async () => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/contracts/?q=published-only`)

        if (response.ok) {
            const data = await response.json()
            setNewContracts(data)
        }
    } catch (error) {
        console.error(`Error fetching contracts:`, error)
    } finally {
        setIsLoading(false)
    }
    }

  return (
    <div className="space-y-8">
        <div>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">New Contracts</h3>
                <span className="text-sm text-gray-500">Start Negotiating</span>
            </div>
            {isLoading ? (
                <div className="space-y-4">
                    <EmptyState 
                        icon={Loader}
                        message='Fetching contracts....'
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {newContracts.map((contract) => (
                        <ContractSummaryCard 
                            key={contract.id} 
                            contract={contract} 
                            type='start-negotiation' 
                            setActiveTab={setActiveTab} 
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default NewContractsTab;