export interface UserData {
  id: string
  username: string
  first_name: string
  last_name: string
  role: string
  provider_id: string
  provider_name: string
  is_active: boolean
  date_joined: string
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'SUPPLIER_REP' | 'CONTRACT_COORDINATOR' | 'PROVIDER_ADMIN';
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface Specialist {
  id: string;
  name: string;
  roles: string[];
  performanceGrade: 'A' | 'B' | 'C' | 'D';
  status: 'available' | 'assigned' | 'inactive';
  averageDailyRate: number;
  activeAssignments: number;
}

export interface SpecialistDetails {
  id: string;
  provider: string;
  provider_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialist_code: string;
  role_name: string;
  experience_level: 'LEAD' | 'EXPERT' | 'SENIOR' | 'MID' | 'JUNIOR';
  skills: string;
  certifications: string;
  specialization: string;
  avg_daily_rate: string;
  status: string;
  available_from: string;
  available_until: string | null;
  max_weekly_hours: number;
  location: string;
  work_mode: string;
  willing_to_travel: boolean;
  languages_spoken: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}