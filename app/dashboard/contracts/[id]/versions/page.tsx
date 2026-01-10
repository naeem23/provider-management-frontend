"use client"

import React, { useState } from 'react';
import { Bell, Search, User, ArrowLeft, Clock, FileText, TrendingUp, Calendar, DollarSign, CheckCircle, XCircle, AlertCircle, Eye, Download, History, Plus, ChevronRight, Briefcase } from 'lucide-react';
import Link from 'next/link';
import ContractSummaryCard from '@/components/contracts/contract-summary-card';
import VersionTimeline from '@/components/contracts/version-timeline';
import VersionDetails from '@/components/contracts/version-details';

// Types
export interface Contract {
  id: string;
  provider: string;
  service_request: string;
  winning_offer: string | null;
  title: string;
  contract_code: string;
  status: 'draft' | 'active' | 'negotiation' | 'expired' | 'terminated';
  offered_daily_rate: number;
  negotiated_rate: number | null;
  response_deadline: string;
  valid_from: string;
  valid_to: string;
  terms_and_condition: string;
}

export interface ContractVersion {
  id: string;
  contract: string;
  version_number: number;
  counter_rate: number;
  counter_offer_explanation: string;
  proposed_terms_and_condition: string;
  created_at: string;
  created_by: string;
  is_current: boolean;
}

// Main Contract Versions Page
const ContractVersionsPage: React.FC = () => {
  // Mock data
  const contract: Contract = {
    id: '1',
    provider: 'TechConsult GmbH',
    service_request: 'SR-2024-0045',
    winning_offer: 'OFF-2024-0123',
    title: 'IT Consulting Services Framework Agreement',
    contract_code: 'CNT-2024-008',
    status: 'negotiation',
    offered_daily_rate: 850,
    negotiated_rate: 780,
    response_deadline: '2024-01-20 17:00',
    valid_from: '2024-02-01',
    valid_to: '2025-02-01',
    terms_and_condition: 'Standard terms with extended warranty clause and service level agreements...'
  };

  const versions: ContractVersion[] = [
    {
      id: '3',
      contract: '1',
      version_number: 3,
      counter_rate: 780,
      counter_offer_explanation: 'Final counter offer aligning with market rates and considering the long-term partnership potential. This rate reflects our budget constraints while ensuring quality service delivery.',
      proposed_terms_and_condition: 'All previous terms accepted with the following modifications:\n\n1. Payment terms: Net 30 days\n2. Warranty period: Extended to 24 months\n3. Service Level Agreement: 99.5% uptime guarantee\n4. Support hours: 24/7 coverage included\n5. Annual rate review clause added',
      created_at: '2024-01-15 14:30',
      created_by: 'Anna Schmidt',
      is_current: true
    },
    {
      id: '2',
      contract: '1',
      version_number: 2,
      counter_rate: 800,
      counter_offer_explanation: 'Second counter offer adjusting the rate considering the scope of work and market analysis. We believe this rate better reflects the expected deliverables and service quality requirements.',
      proposed_terms_and_condition: 'Building on version 1 terms:\n\n1. Payment terms: Net 30 days\n2. Warranty period: 18 months\n3. Monthly reporting requirements\n4. Quarterly business reviews\n5. Performance bonuses for exceptional delivery',
      created_at: '2024-01-12 10:15',
      created_by: 'Anna Schmidt',
      is_current: false
    },
    {
      id: '1',
      contract: '1',
      version_number: 1,
      counter_rate: 820,
      counter_offer_explanation: 'Initial counter offer based on internal budget review and comparison with similar contracts. The proposed rate considers the scope of services and expected duration of engagement.',
      proposed_terms_and_condition: 'Standard framework agreement terms with the following key points:\n\n1. Service delivery: On-site and remote hybrid model\n2. Payment terms: Net 45 days\n3. Intellectual property rights: Joint ownership\n4. Termination clause: 90 days notice period\n5. Confidentiality: Standard NDA terms apply',
      created_at: '2024-01-10 09:00',
      created_by: 'Anna Schmidt',
      is_current: false
    }
  ];

  const [selectedVersion, setSelectedVersion] = useState<ContractVersion>(versions[0]);

  const handleSelectVersion = (version: ContractVersion) => {
    setSelectedVersion(version);
  };

  const getPreviousVersion = (currentVersion: ContractVersion): ContractVersion | undefined => {
    return versions.find(v => v.version_number === currentVersion.version_number - 1);
  };

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
              previousVersion={getPreviousVersion(selectedVersion)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractVersionsPage;