export interface APIResponseType {
  policy_reference: string
  policy_version_reference: string
  policy: Policy
  proposer: Proposer
  vehicle: Vehicle
  versions: Version[]
  additional_drivers: AdditionalDriver[]
  pricing: Pricing
  payment: Payment
}

interface Policy {
  compulsory_excess: number
  voluntary_excess: number
  address: Address
  usage: string
  cover: string
  auto_renew: boolean
  start_date: number
  end_date: number
  billing_day_date: number
  underwriter_reference: string
  underwriter_policy_reference: string
  product_reference: string
  created_at: number
  policy_reference: string
}

interface Address {
  line_1: string
  line_2: string
  line_3: string
  county: string
  city: string
  country: string
  postcode: string
}

interface Proposer {
  title: string
  first_names: string
  last_names: string
  email: string
  phone_number: string
  children: number
  has_medical_conditions: boolean
  has_informed_dvla_medical_conditions: boolean
  ncd: number
  dob: string
  licence_type: string
  employment: string
  occupation: string
  business: string
  licence_issued_date: string
  residency_date: string
  has_criminal_conviction: boolean
  convictions: Conviction[]
  claims: Claim[]
  own_home: boolean
}

interface Conviction {
  code: string
  date: string
  points: number
  ban: number
}

interface Claim {
  code: string
  date: string
  at_fault: boolean
  ncd_lost: boolean
}

interface Vehicle {
  reg: string
  vin: string
  type: string
  make: string
  model: string
  colour: string
  rating: number
  group_rating_50: number
  group_rating_20: number
  abi_code: string
  engine: number
  fuel: string
  owner: string
  keeper: string
  estimated_yearly_mileage: number
  purchase_date: string
  manufacture_date: string
  current_value: number
  is_rhd: boolean
  seats: number
  doors: number
  is_parked_home: boolean
  is_import: boolean
  overnight_postcode: string
  parked_location: string
}

interface Version {
  policy_reference: string
  policy_version_reference: string
  product_reference: string
  quote_reference: string
  quote_version_reference: string
  quote_model_reference: string
  usage: string
  email: string
  vehicle_reg: string
  proposer_first_names: string
  proposer_last_names: string
  address_postcode: string
  upfront_rate: number
  upfront_premium: number
  subscription_rate: number
  subscription_premium: number
  usage_rate: number
  usage_premium: number
  ipt_rate: number
  commission_rate: number
  version_type: string
  inception_date: number
  effective_date: number
  start_date: number
  end_date: number
  created_at: number
}

export interface AdditionalDriver {
  relationship: string
  title: string
  first_names: string
  last_names: string
  email: string
  phone_number: string
  children: number
  has_medical_conditions: boolean
  has_informed_dvla_medical_conditions: boolean
  ncd: number
  dob: string
  licence_type: string
  employment: string
  occupation: string
  business: string
  licence_issued_date: string
  residency_date: string
  has_criminal_conviction: boolean
  convictions: Conviction2[]
  claims: Claim2[]
  own_home: boolean
}

export interface Conviction2 {
  code: string
  date: string
  points: number
  ban: number
}

export interface Claim2 {
  code: string
  date: string
  at_fault: boolean
  ncd_lost: boolean
}

export interface Pricing {
  upfront_rate: number
  subscription_rate: number
  usage_rate: number
  subscription_installments: number
  quote_reference: string
  quote_version_reference: string
  withhold_fee: number
  deposit_fee: number
  admin_fee: number
  mta_fee: number
  cancel_fee: number
  ipt_rate: number
  commission_rate: number
}

export interface Payment {
  payment_provider: string
  payment_amount: number
  provider_payment_reference: string
  provider_customer_reference: string
}

interface FormattedPolicyData {
  policyRef: string
  coverType: string
  car: string
  name: string
  address: string
}

export type PolicyContentProps = FormattedPolicyData | Record<string, never>
