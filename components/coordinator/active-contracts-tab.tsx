import { fetchWithAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import ContractSummaryCard from "../contracts/contract-summary-card";
import { ContractType } from "@/types/contract-type";


const ActiveContractsTab = ({ type }: {type: string}) => {
    const [contracts, setContracts] = useState<ContractType[]>([])

    useEffect(() => {
      fetchActiveContracts()
    }, [])

    const fetchActiveContracts = async () => {
        try {
          const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/contracts/?q=${type}`)
    
          if (response.ok) {
            const data = await response.json()
            setContracts(data)
          }
        } catch (error) {
          console.error(`Error fetching ${type} contracts:`, error)
        }
    }
    

  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 capitalize">{type} Contracts</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
            {contracts.map((contract) => (
                <ContractSummaryCard key={contract.id} contract={contract} type={type} />
            ))}
        </div>
    </div>
  );
};

export default ActiveContractsTab