import { shuffleArray } from '@/utils/arrays'
import { getRandomString } from '@/utils/strings'

const test = [
  {
    id: '1',
    title: 'q1',
    correctAnswerId: '3',
    options: [
      {
        id: getRandomString(),
        text: 'a1 text'
      },
      {
        id: getRandomString(),
        text: 'a2 text'
      },
      {
        id: getRandomString(),
        text: 'a3 text'
      },
      {
        id: getRandomString(),
        text: 'a4 text'
      }
    ]
  },
  {
    id: '2',
    title: 'q2',
    correctAnswerId: '1',
    options: [
      {
        id: getRandomString(),
        text: 'a1 text'
      },
      {
        id: getRandomString(),
        text: 'a2 text'
      },
      {
        id: getRandomString(),
        text: 'a3 text'
      },
      {
        id: getRandomString(),
        text: 'a4 text'
      }
    ]
  }
]

export default {
  getTest: async () => {
    return shuffleArray(test).map(item => ({
      id: item.id,
      title: item.title,
      options: shuffleArray(item.options)
    }))
  },
  getResult: async testResult => {
    console.log(testResult)
    return (await Math.random()) > 0.5
  }
}
