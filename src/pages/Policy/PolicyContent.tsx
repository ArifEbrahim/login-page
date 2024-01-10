import { PolicyContentProps } from '../../types/Policy'

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
