// Types
export interface ContractType {
  id: string;
  provider: string;
  service_request: string;
  service_request_code: string;
  winning_offer: string | null;
  specialist_name: string;
  title: string;
  role_name: string;
  service_domain: string;
  contract_code: string;
  status: string;
  offered_daily_rate: number;
  negotiated_rate: number | null;
  expected_rate?: number;
  response_deadline: string;
  valid_from: string;
  valid_to: string;
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