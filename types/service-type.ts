type language = {
    name: string;
    level: string;
}

export interface CriteriaJSON {
    skills: string | string[];
    certifications: string | string[];
    languages: language[];
}

export interface ServiceRequest {
  id: string;
  external_id?: string;
  title: string;
  role_name: string;
  technology: string;
  specialization: string;
  experience_level: 'JUNIOR' | 'MID' | 'SENIOR' | 'EXPERT' | 'LEAD';
  start_date: string;
  end_date: string;
  offer_deadline: string;
  expected_man_days: number;
  criteria_json: any;
  task_description: string;
  work_mode: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceOffer {
  id: string;
  service_request: string;
  provider: string;
  provider_name: string;
  specialist: string;
  specialist_name: string;
  status: string;
  daily_rate: string;
  travel_cost: string;
  total_cost: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceOfferCreateType {
  service_request: string;
  provider: string;
  specialist: string;
  daily_rate: number;
  travel_cost: number;
  total_cost: number;
  notes: string;
}

export interface FlowableTask {
  task_id: string;
  task_name: string;
  created_time: string;
  service_request: ServiceRequest
}