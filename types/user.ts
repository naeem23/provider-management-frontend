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