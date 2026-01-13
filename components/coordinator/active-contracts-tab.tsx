import { fetchWithAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import ContractSummaryCard from "../contracts/contract-summary-card";
import { ContractType } from "@/types/contract-type";
import { Frown, Loader } from "lucide-react";
import EmptyState from "../empty-state";
import { useRouter } from "next/navigation";


interface ActiveContractsTabProps {
  isLoading: boolean;
  contracts: ContractType[];
  type: string;
  setActiveTab: (tab: string) => void;
}

const ActiveContractsTab = ({ contracts, isLoading, type, setActiveTab }: ActiveContractsTabProps) => {
  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 capitalize">{type === 'published-only' ? "New" : type} Contracts</h3>
        </div>
        {!isLoading && contracts?.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {contracts.map((contract) => (
                <ContractSummaryCard key={contract.id} contract={contract} type={type} setActiveTab={setActiveTab} />
            ))}
          </div>
        )}
        {!isLoading && contracts?.length === 0 && (
          <div className="space-y-4">
              <EmptyState 
                  icon={Frown}
                  message={`No ${type} contracts found.`}
              />
          </div>
        )}
        {isLoading && ( 
        <div className="space-y-4">
            <EmptyState 
                icon={Loader}
                message='Fetching contracts....'
            />
        </div>
        )}        
    </div>
  );
};

export default ActiveContractsTab