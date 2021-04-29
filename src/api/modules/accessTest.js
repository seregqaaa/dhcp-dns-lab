import { shuffleArray } from '@/utils/arrays'

const test = [
  {
    id: '1',
    title: 'q1',
    correctAnswerId: '3',
    options: [
      {
        id: '1',
        text: 'a1 text'
      },
      {
        id: '2',
        text: 'a2 text'
      },
      {
        id: '3',
        text: 'a3 text'
      },
      {
        id: '4',
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
        id: '1',
        text: 'a1 text'
      },
      {
        id: '2',
        text: 'a2 text'
      },
      {
        id: '3',
        text: 'a3 text'
      },
      {
        id: '4',
        text: 'a4 text'
      }
    ]
  }
]

export default {
  getTest: async () => {
    return test.map(item => ({
      id: item.id,
      title: item.title,
      options: shuffleArray(item.options)
    }))
  }
  // getResult: async testResult => {
  //   return (await Math.random()) > 0.5
  // }
}
