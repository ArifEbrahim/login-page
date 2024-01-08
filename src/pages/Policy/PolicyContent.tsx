interface FormattedPolicyData {
  policyRef: string
  coverType: string
  car: string
  name: string
  address: string
}

type PolicyContentProps = FormattedPolicyData | Record<string, never>

function PolicyContent({
  policyRef,
  coverType,
  car,
  name,
  address
}: PolicyContentProps) {
  return (
    <>
      <div>Policy reference</div>
      <div>{policyRef}</div>
      <div>Cover type</div>
      <div>{coverType}</div>
      <div>Car</div>
      <div>{car}</div>
      <div>Name</div>
      <div>{name}</div>
      <div>Address</div>
      <div>{address}</div>
    </>
  )
}

export default PolicyContent
