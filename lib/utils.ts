import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { UserData } from "@/types/user"
import { AlertTriangle, CheckCircle, CircleX, Clock, FileText, LucideIcon, TrendingUp, Users } from "lucide-react"
import { Metric } from "@/types/dashboard"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserFromStorage = (): UserData | null => {
  const data = localStorage.getItem('user')
  return data ? (JSON.parse(data) as UserData) : null
}

// ==========================================
// utils for metrics formatter
// ==========================================
export type MetricsResponse = 
  | ProviderMetricsResponse 
  | OfferMetricsResponse 
  | ContractMetricsResponse;

// API Response Types
export interface ProviderMetricsResponse {
  total_users: number;
  total_specialist: number;
  active_specialist: number;
}

export interface OfferMetricsResponse {
  accepted_offers: number;
  pending_offers: number;
  rejected_offers: number;
  available_specialists: number;
}

export interface ContractMetricsResponse {
  in_negotiation: number;
  pending_contracts: number;
  active_contracts: number;
  expiring_contracts: number;
}

// Metric Configurations with proper typing
const metricConfigs = {
  // Provider/Admin metrics
  total_users: {
    label: 'Total Users',
    icon: Users,
    color: 'bg-blue-500'
  },
  total_specialist: {
    label: 'Total Specialists',
    icon: Users,
    color: 'bg-purple-500'
  },
  active_specialist: {
    label: 'Active Specialists',
    icon: CheckCircle,
    color: 'bg-green-500'
  },
  
  // Offer metrics
  accepted_offers: {
    label: 'Accepted Offers',
    icon: CheckCircle,
    color: 'bg-purple-500'
  },
  pending_offers: {
    label: 'Pending Offers',
    icon: Clock,
    color: 'bg-yellow-500'
  },
  rejected_offers: {
    label: 'Rejected Offers',
    icon: CircleX,
    color: 'bg-red-500'
  },
  available_specialists: {
    label: 'Available Specialists',
    icon: Users,
    color: 'bg-green-500'
  },
  
  // Contract metrics
  in_negotiation: {
    label: 'Active Negotiations',
    icon: TrendingUp,
    color: 'bg-orange-500'
  },
  pending_contracts: {
    label: 'Pending Approvals',
    icon: Clock,
    color: 'bg-yellow-500'
  },
  active_contracts: {
    label: 'Active Contracts',
    icon: FileText,
    color: 'bg-green-500'
  },
  expiring_contracts: {
    label: 'Expiring Soon',
    icon: AlertTriangle,
    color: 'bg-red-500'
  }
} as const;

// Generic formatter function
export function formatMetrics(
  data: MetricsResponse,
  userRole?: string
): Metric[] {
  return Object.entries(data).map(([key, value]) => {
    const config = metricConfigs[key as keyof typeof metricConfigs];
    
    if (!config) {
      console.warn(`No configuration found for metric: ${key}`);
      // Fallback configuration
      return {
        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: value as number,
        icon: FileText,
        color: 'bg-gray-500'
      };
    }
    
    return {
      label: config.label,
      value: value as number,
      icon: config.icon,
      color: config.color
    };
  });
}

export const getDaysLeft = (deadline: string) => {
  const today = new Date();
  const targetDate = new Date(deadline);

  // Clear time part to avoid partial-day issues
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffInMs = targetDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays > 0 ? diffInDays : 0;
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'bg-green-100 text-green-800';
    case 'IN_NEGOTIATION': return 'bg-orange-100 text-orange-800';
    case 'PENDING': return 'bg-gray-100 text-gray-800';
    case 'EXPIRED': return 'bg-red-100 text-red-800';
    default: return 'bg-red-100 text-red-800';
  }
};