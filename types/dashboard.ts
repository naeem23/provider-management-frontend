import { LucideIcon } from 'lucide-react';

export interface Metric {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export interface FlowableTask {
  id: string;
  title: string;
  role: string;
  domain: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  requiredSkills: string[];
}

export interface SubmittedOffer {
  id: string;
  requestId: string;
  title: string;
  specialist: string;
  dailyRate: number;
  status: 'under_review' | 'accepted' | 'rejected';
  submittedDate: string;
}

export interface ActiveOrder {
  id: string;
  specialist: string;
  client: string;
  role: string;
  location: string;
  endDate: string;
  daysRemaining: number;
}

export type TabType = 'action-required' | 'new-requests' | 'my-offers' | 'active-orders' | 'specialists';