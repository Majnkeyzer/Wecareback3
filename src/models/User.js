import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (_) {
      return null
    }
  }

  constructor ({ user_id, admin, username }) {
    this.id = user_id // eslint-disable-line camelcase
    this.admin = admin
    this.user = username
  }

  get isAdmin () {
    return this.admin
  }
}
