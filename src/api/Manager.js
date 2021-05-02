import accessTest from './modules/accessTest'

const URL = 'http://localhost:5000'
const accessTestEndpoint = 'access-test'

export default class ApiManager {
  static get accessTest() {
    return accessTest(`${URL}/${accessTestEndpoint}`)
  }
}
