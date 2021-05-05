import accessTest from './modules/accessTest'

const URL = 'http://192.168.0.4:5000'
const accessTestEndpoint = 'access-test'

export default class ApiManager {
  static get accessTest() {
    return accessTest(`${URL}/${accessTestEndpoint}`)
  }
}
