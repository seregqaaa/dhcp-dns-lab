import dotenv from 'dotenv'

import test from './modules/test'

dotenv.config()

export default class ApiManager {
  static REMOTE_URL = process.env.REMOTE_URL

  static DEV_URL = 'http://127.0.0.1:5000'

  static URL =
    process.env.NODE_ENV === 'development' ? this.DEV_URL : this.REMOTE_URL

  static endpoint = {
    accessTest: 'access-test',
    finalTest: 'final-test'
  }

  static get accessTest() {
    return this.fetchTest(this.endpoint.accessTest)
  }
  static get finalTest() {
    return this.fetchTest(this.endpoint.finalTest)
  }

  static fetchTest(endpoint) {
    return test(`${this.URL}/${endpoint}`)
  }
}
