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

export interface NegotiationTask {
  id: string;
  title: string;
  supplier: string;
  offeredRate: number;
  targetRate: number;
  domain: string;
  offerDeadline: string;
  priority: 'high' | 'medium' | 'low';
  terms: string;
  matchScore: number;
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

export interface PendingApproval {
  id: string;
  title: string;
  supplier: string;
  agreedRate: number;
  startDate: string;
  endDate: string;
  scope: string;
  status: string;
}

export interface PublishedContract {
  id: string;
  title: string;
  offersReceived: number;
  offerDeadline: string;
  daysLeft: number;
  domains: string[];
  status: string;
}

export interface ActiveContract {
  id: string;
  title: string;
  supplier: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  consumption: number;
  activeRequests: number;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

export type OfferStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'WITHDRAWN'
  | 'REJECTED'
  | 'ACCEPTED';

export type SpecialistType = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    specialist_code: string;
    role_name: string;
    experience_level: string;
    skills: string;
    certifications: string;
    specialization: string;
    avg_daily_rate: number;
    status: string;
    available_from: string;
    available_until: string | null;
    max_weekly_hours: number;
    location: string;
    work_mode: string;
    language_spoken: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;
}