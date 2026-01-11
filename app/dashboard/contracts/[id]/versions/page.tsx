"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, FileText, Loader } from 'lucide-react';
import Link from 'next/link';
import ContractSummaryCard from '@/components/contracts/contract-summary-card';
import VersionTimeline from '@/components/contracts/version-timeline';
import VersionDetails from '@/components/contracts/version-details';
import { ContractType, ContractVersionType } from '@/types/contract-type';
import { useParams } from 'next/navigation';
import { fetchWithAuth } from '@/lib/auth';
import EmptyState from '@/components/empty-state';

// Main Contract Versions Page
const ContractVersionsPage: React.FC = () => {
  const params = useParams()
  const contractId = params.id as string
  const [contract, setContract] = useState<ContractType | null>(null)
  const [versions, setVersions] = useState<ContractVersionType[]>([])
  const [selectedVersion, setSelectedVersion] = useState<ContractVersionType | null>(null);
  const [isLoadingContract, setIsLoadingContract] = useState(true)
  const [isLoadingVersions, setIsLoadingVersions] = useState(true)

  useEffect(() => {
    fetchContractDetails()
    fetchContractVersions()
  }, [contractId])
  
  const fetchContractDetails = async () => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/contracts/${contractId}/`)

        if (response.ok) {
            const data = await response.json()
            setContract(data)
        }
    } catch (error) {
        console.error('Failed to fetch contract:', error)
    } finally {
        setIsLoadingContract(false)
    }
  }

  const fetchContractVersions = async () => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/contracts/${contractId}/versions`)

        if (response.ok) {
            const data = await response.json()
            setVersions(data)

            if (data.length > 0) {
              setSelectedVersion(data[0])
            }
        }
    } catch (error) {
        console.error('Failed to fetch contract versions:', error)
    } finally {
        setIsLoadingVersions(false)
    }
  }

  const handleSelectVersion = (version: ContractVersionType) => {
    setSelectedVersion(version);
  };

  const getPreviousVersion = (currentVersion: ContractVersionType | null): ContractVersionType | undefined => {
    if (!currentVersion) return undefined;
    return versions.find(v => v.version_number === currentVersion.version_number - 1);
  };

  if (!contract) {
    return (
        <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Sorry, we couldn't found any contract with this id!</p>
        </div>
    )
  }

  const currentVersionId: string = versions?.length > 0 ? versions[0].id : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Contract Versions</h2>
          <p className="text-gray-600 mt-1">Review different versions of contract negotiations</p>
        </div>

        {/* Contract Summary */}
        <div className="mb-6">
          <ContractSummaryCard contract={contract} />
        </div>

        {/* Version Timeline and Details */}
        {isLoadingVersions ? (
          <EmptyState 
            icon={Loader}
            message='Fetching versions...'
          />
        ) : versions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <VersionTimeline
                versions={versions}
                selectedVersion={selectedVersion}
                onSelectVersion={handleSelectVersion}
              />
            </div>
            <div className="lg:col-span-2">
              <VersionDetails
                version={selectedVersion}
                currentVersionId={currentVersionId}
                previousVersion={getPreviousVersion(selectedVersion)}
              />
            </div>
          </div>
        ) : (
          <EmptyState 
            icon={FileText} 
            message="No versions found for this contract."  
          />
        )}
      </div>
    </div>
  );
};

export default ContractVersionsPage;