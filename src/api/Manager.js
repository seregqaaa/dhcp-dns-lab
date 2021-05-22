import test from './modules/test'

export default class ApiManager {
  static URL = 'https://aqueous-crag-82522.herokuapp.com'
  static DEV_URL = 'http://192.168.0.4:5000'

  static URL = process.env.NODE_ENV === 'development' ? this.DEV_URL : this.URL

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
