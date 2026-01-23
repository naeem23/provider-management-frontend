// Types
export interface ContractType {
  id: string;
  provider: string;
  service_request: string;
  service_request_code: string;
  specialist?: string;
  specialist_name: string;
  title: string;
  role_name: string;
  domain: string;
  contract_code: string;
  status: string;
  proposed_rate: number;
  negotiated_rate: number | null;
  providers_expected_rate?: number;
  response_deadline: string;
  valid_from: string;
  valid_till: string;
  terms_and_condition: string;
  created_at?: string;
  updated_at?: string; 
}

export interface ContractVersionType {
  id: string;
  contract: string;
  version_number: number;
  counter_rate: number;
  counter_offer_explanation: string;
  proposed_terms_and_condition: string;
  created_at: string;
  is_current?: boolean;
}

export interface TaskContractType {
  id: string;
  external_id: string;
  title: string;
  specialist: string | null;
  proposed_rate: string;
  providers_expected_rate: string;
  valid_from: string;
  valid_till: string;
  response_deadline: string;
  status: string;
  domain: string;
  terms_condition: string;
}

export interface TasksType {
  task_id: string;
  task_name: string;
  created_time: string;
  contract: TaskContractType;
}