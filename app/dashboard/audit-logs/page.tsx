"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Shield, Search, Filter, Download, User, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { AuditLog } from '@/types/dashboard';
import { fetchWithAuth } from '@/lib/auth';
import { formatTimestamp } from '@/lib/utils';


const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterResult, setFilterResult] = useState('all');

  useEffect(() => {
    getAuditLogs()
  }, [])

  const getAuditLogs = async () => {
    setIsFetching(true)

    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/audit/audit-logs`)

        if (response.ok) {
            const data = await response.json()
            setLogs(data)
        }
    } catch (error) {
        console.error('Failed to fetch notifications:', error)
    } finally {
        setIsFetching(false)
    }
  }

  // Apply filters
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || log.action_category === filterCategory;
    const matchesRole = filterRole === 'all' || log.user_role === filterRole;
    const matchesResult = filterResult === 'all' || log.result === filterResult;

    return matchesSearch && matchesCategory && matchesRole && matchesResult;
  });

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'SUCCESS':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'FAILURE':
      case 'ERROR':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getResultBadgeColor = (result: string) => {
    switch (result) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'FAILURE':
      case 'ERROR':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'PROVIDER_ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'SUPPLIER_REP':
        return 'bg-blue-100 text-blue-800';
      case 'CONTRACT_COORDINATOR':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={goBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Track all user actions and system events
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by user, action, or ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="User Management">User Management</option>
                <option value="Specialist Management">Specialist Management</option>
                <option value="Offer Management">Offer Management</option>
                <option value="Contract Management">Contract Management</option>
                <option value="Service Order">Service Order</option>
                <option value="Authentication">Authentication</option>
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Role
              </label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="PROVIDER_ADMIN">Provider Admin</option>
                <option value="SUPPLIER_REP">Supplier Representative</option>
                <option value="CONTRACT_COORDINATOR">Contract Coordinator</option>
              </select>
            </div>

            {/* Result Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Result
              </label>
              <select
                value={filterResult}
                onChange={(e) => setFilterResult(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Results</option>
                <option value="SUCCESS">Success</option>
                <option value="FAILURE">Failure</option>
                <option value="PENDING">Pending</option>
                <option value="ERROR">Error</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredLogs.length}</span> of <span className="font-semibold text-gray-900">{logs.length}</span> logs
            </p>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Related Object
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No logs found matching your filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          {formatTimestamp(log.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{log.user}</div>
                            <div className="text-xs">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(log.user_role)}`}>
                                {log.user_role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{log.action_type.replace(/_/g, ' ')}</div>
                          <div className="text-xs text-gray-500">{log.action_category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-md">
                          {log.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="text-gray-500 text-xs">{log.entity_type}</div>
                          <div className="font-medium text-blue-600">{log.entity_id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getResultIcon(log.result)}
                          <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${getResultBadgeColor(log.result)}`}>
                            {log.result}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (placeholder) */}
          {filteredLogs.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page 1 of 1
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogPage;