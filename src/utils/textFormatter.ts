interface APIResponseType {
  [key: string]: string | object
}

export default class TextFormatter {
  _rawPolicy: APIResponseType

  constructor(APIData: APIResponseType) {
    this._rawPolicy = APIData
  }

  get rawPolicy() {
    return this._rawPolicy
  }
}
