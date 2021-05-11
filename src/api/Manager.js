import accessTest from './modules/accessTest'

const URL = 'https://aqueous-crag-82522.herokuapp.com'
const accessTestEndpoint = 'access-test'

export default class ApiManager {
  static get accessTest() {
    return accessTest(`${URL}/${accessTestEndpoint}`)
  }
}
