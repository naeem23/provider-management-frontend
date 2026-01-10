"use client"

import React, { useState } from 'react';
import { Bell, Search, User, ArrowLeft, Clock, FileText, TrendingUp, Calendar, DollarSign, CheckCircle, XCircle, AlertCircle, Eye, Download, History, Plus, ChevronRight, Briefcase } from 'lucide-react';
import Link from 'next/link';
import ContractSummaryCard from '@/components/contracts/contract-summary-card';

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

interface ContractVersion {
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

// Version Timeline Component
interface VersionTimelineProps {
  versions: ContractVersion[];
  selectedVersion: ContractVersion | null;
  onSelectVersion: (version: ContractVersion) => void;
}

const VersionTimeline: React.FC<VersionTimelineProps> = ({ versions, selectedVersion, onSelectVersion }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <History className="w-6 h-6 text-gray-700" />
          <h3 className="text-xl font-bold text-gray-900">Version History</h3>
        </div>
      </div>

      <div className="space-y-3">
        {versions.map((version, index) => (
          <button
            key={version.id}
            onClick={() => onSelectVersion(version)}
            className={`w-full text-left border-2 rounded-lg p-4 transition-all ${
              selectedVersion?.id === version.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                  version.is_current
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  v{version.version_number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-semibold text-gray-900">Version {version.version_number}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span>€{version.counter_rate}/day</span>
                    <span>•</span>
                    <span>{version.created_at}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${
                selectedVersion?.id === version.id ? 'text-blue-600' : 'text-gray-400'
              }`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Version Details Component
interface VersionDetailsProps {
  version: ContractVersion | null;
  previousVersion?: ContractVersion;
}

const VersionDetails: React.FC<VersionDetailsProps> = ({ version, previousVersion }) => {
  if (!version) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Select a version to view details</p>
      </div>
    );
  }

  const rateChange = previousVersion 
    ? ((version.counter_rate - previousVersion.counter_rate) / previousVersion.counter_rate * 100).toFixed(1)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">Version {version.version_number}</h3>
              {/* {version.is_current && (
                <span className="flex items-center text-sm font-semibold bg-green-100 text-green-700 px-3 py-1 rounded">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Current Version
                </span>
              )} */}
            </div>
            <p className="text-sm text-gray-600">Created on {version.created_at}</p>
          </div>
          {version.is_current && (
            <div className="flex space-x-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Accept Offer
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Counter Offer
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                Reject
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Rate Information */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Rate Information</h4>
          <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Counter Rate Proposed</p>
                <p className="text-3xl font-bold text-blue-600">€{version.counter_rate}</p>
                <p className="text-xs text-gray-500 mt-1">per day</p>
              </div>
              {/* {rateChange && (
                <div className={`text-right ${
                  parseFloat(rateChange) > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  <p className="text-sm font-medium mb-1">
                    {parseFloat(rateChange) > 0 ? '+' : ''}{rateChange}%
                  </p>
                  <p className="text-xs">vs. v{version.version_number - 1}</p>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Counter Offer Explanation */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Counter Offer Explanation
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {version.counter_offer_explanation}
            </p>
          </div>
        </div>

        {/* Proposed Terms and Conditions */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Proposed Terms & Conditions
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-96 overflow-y-auto">
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {version.proposed_terms_and_condition}
            </p>
          </div>
        </div>

        {/* Comparison with Previous Version */}
        {previousVersion && (
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Changes from Version {version.version_number - 1}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-red-700 mb-2">Previous (v{previousVersion.version_number})</p>
                <p className="text-lg font-bold text-red-600">€{previousVersion.counter_rate}/day</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-green-700 mb-2">Current (v{version.version_number})</p>
                <p className="text-lg font-bold text-green-600">€{version.counter_rate}/day</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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