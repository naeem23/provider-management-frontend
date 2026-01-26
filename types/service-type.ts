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
  provider_ids?: string[];
  service_request: ServiceRequest
}

export interface ServiceOrder {
  id: string;
  title: string;
  // service_request_id: string;
  // winning_offer_id: string;
  // contract_id: string | null;
  supplier_name: string;
  current_specialist_id: string;
  current_specialist_name: string;
  original_specialist_id: string;
  original_specialist_name: string;
  role: string;
  // domain: string;
  start_date: string;
  current_end_date: string;
  original_end_date: string;
  // actual_end_date: string;
  current_man_days: number;
  consumed_man_days: number;
  remaining_man_days: number;
  daily_rate: number;
  current_contract_value: number;
  original_contract_value: number;
  has_been_extended: boolean;
  has_been_substituted: boolean;
  status: string;
  pending_extension_id?: string | null;
  pending_substitution_id?: string | null;
}

export interface ExtensionType {
  id: string;
  service_order_title: string;
  service_order_current_end_date: string;
  status: string;
  additional_man_days: number;
  new_end_date: string;
  additional_cost: string;
  reason: string;
  rejection_reason: string;
  created_at: string;
  updated_at: string;
  service_order: string;
}

export interface SubstitutionType {
  id: string;
  service_order_title: string;
  initiated_by: string;
  status: string;
  outgoing_specialist_id: string;
  outgoing_specialist_name: string;
  incoming_specialist_id: string;
  incoming_specialist_name: string;
  incoming_specialist_daily_rate: string;
  reason: string;
  rejection_reason: string;
  created_at: string;
  updated_at: string;
  service_order: string;
}