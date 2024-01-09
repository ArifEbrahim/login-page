import { APIResponseType } from '../types/Policy'

export default class TextFormatter {
  _rawPolicy: APIResponseType

  constructor(APIData: APIResponseType) {
    this._rawPolicy = APIData
  }

  get rawPolicy() {
    return this._rawPolicy
  }

  processData() {
    return {
      policy_ref: this.formatPolicyRef(),
      coverType: this._rawPolicy.policy.cover,
      car: this.formatCar(),
      name: this.formatName(),
      address: this.formatAddress()
    }
  }

  formatPolicyRef() {
    const reference = this._rawPolicy.policy_reference
    return reference.replaceAll('-', ' ')
  }

  formatCar = () => {
    const { reg, make, model, colour } = this._rawPolicy.vehicle
    return `${make} ${model} ${colour} - ${reg}`
  }

  formatName = () => {
    const { first_names, last_names } = this._rawPolicy.proposer
    return `${first_names} ${last_names}`
  }

  formatAddress = () => {
    const { line_1, line_2, postcode } = this._rawPolicy.policy.address
    return `${line_1}, ${line_2}, ${postcode}`
  }
}
