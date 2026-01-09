import { fetchWithAuth } from "@/lib/auth";
import { ContractType } from "@/types/dashboard";
import { useEffect, useState } from "react";
import ExpiringContractCard from "./expiring-contract-card";
import ActiveContractCard from "./active-contract-card";


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
                <ActiveContractCard key={contract.id} contract={contract} type={type} />
            ))}
        </div>
    </div>
  );
};

export default ActiveContractsTab