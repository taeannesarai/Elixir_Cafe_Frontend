 export class User {
  constructor(
    public email: string,
    public id: string,
    public role: string,
    private _token: string,
    private _expiresIn: Date
  ) {}

  // get property to access private properties in the constructor - but cannot modify
  get token() {
    if (!this._expiresIn || this._expiresIn < new Date()) {
      // check if token is expired
      return null;
    }
    return this._token;
  }

  // set token() {

  // }
}
