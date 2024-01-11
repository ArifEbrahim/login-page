export interface APIResponseType {
  policy_reference: string
  policy_version_reference: string
  policy: Policy
  proposer: Proposer
  vehicle: Vehicle
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

interface FormattedPolicyData {
  policyRef: string
  coverType: string
  car: string
  name: string
  address: string
}

export type PolicyContentProps = FormattedPolicyData | Record<string, never>
