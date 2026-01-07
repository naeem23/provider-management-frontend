import { LucideIcon } from 'lucide-react';

export interface MetricData {
  label: string;
  value: number | string;
  icon: LucideIcon;
  colorClass: string;
  trend?: 'up' | 'down' | null;
  trendValue?: string | null;
}

export interface DashboardMetricsResponse {
  activeOrders: number;
  pendingOffers: number;
  availableSpecialists: number;
  monthlyWins: number;
  trends?: {
    activeOrders?: { direction: 'up' | 'down'; value: string };
    pendingOffers?: { direction: 'up' | 'down'; value: string };
    availableSpecialists?: { direction: 'up' | 'down'; value: string };
    monthlyWins?: { direction: 'up' | 'down'; value: string };
  };
}

export interface Tab {
  id: string
  label: string
  badge?: number
  content: React.ReactNode
}

export interface TabConfig {
  id: string;
  label: string;
  badge?: number;
}

export const getTabsConfig = (taskCount: number): TabConfig[] => [
  {
    id: 'action-required',
    label: 'Action Required',
    badge: taskCount,
  },
  {
    id: 'new-requests',
    label: 'New Requests',
  },
  {
    id: 'my-offers',
    label: 'My Offers',
  },
  {
    id: 'active-orders',
    label: 'Active Orders',
  },
  {
    id: 'specialists',
    label: 'Specialists',
  },
];

export interface FlowableTask {
  id: string
  title: string
  role: string
  domain: string
  deadline: string
  priority: 'high' | 'medium' | 'low'
  requiredSkills: string[]
}

export interface SubmittedOffer {
  id: string
  requestId: string
  title: string
  specialist: string
  dailyRate: number
  status: 'under_review' | 'accepted' | 'rejected'
  submittedDate: string
}

export interface ActiveOrder {
  id: string
  specialist: string
  client: string
  role: string
  location: string
  endDate: string
  daysRemaining: number
}