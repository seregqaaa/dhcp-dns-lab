import fetch from 'node-fetch'

window.fetch = fetch
window.scrollTo = jest.fn()
jest.setTimeout(10000)
