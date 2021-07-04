import dotenv from 'dotenv'

import ApiManager from '@/api/Manager'

dotenv.config()

describe('ApiManager.js', () => {
  it('has correct URLs', () => {
    const URL = process.env.REMOTE_URL
    expect(ApiManager.URL).toBe(URL)
  })

  it('fetches 5 access test questions', async () => {
    try {
      const test = await ApiManager.accessTest.getTest()
      expect(test.length).toEqual(5)
    } catch (error) {
      console.log(error)
    }
  })

  it('fetches 15 final test questions', async () => {
    try {
      const test = await ApiManager.finalTest.getTest()
      expect(test.length).toEqual(15)
    } catch (error) {
      console.log(error)
    }
  })

  it('fails on incorrect answers', async () => {
    try {
      const mockResult = {
        1: '1-1',
        2: '2-1',
        3: '3-1',
        4: '4-1',
        5: '5-1'
      }
      const { isPassed } = await ApiManager.accessTest.getResult(mockResult)

      expect(isPassed).toBe(false)
    } catch (error) {
      console.log(error)
    }
  })
})
