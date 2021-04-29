import { shuffleArray } from '@/utils/arrays'

const test = [
  {
    id: '1',
    title: 'q1',
    correctAnswerId: '1-3',
    options: [
      {
        id: '1-1',
        text: 'a1 text'
      },
      {
        id: '1-2',
        text: 'a2 text'
      },
      {
        id: '1-3',
        text: 'a3 text'
      },
      {
        id: '1-4',
        text: 'a4 text'
      }
    ]
  },
  {
    id: '2',
    title: 'q2',
    correctAnswerId: '2-1',
    options: [
      {
        id: '2-1',
        text: 'a1 text'
      },
      {
        id: '2-2',
        text: 'a2 text'
      },
      {
        id: '2-3',
        text: 'a3 text'
      },
      {
        id: '2-4',
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
    return test.reduce(
      (count, item) =>
        testResult[item.id] === item.correctAnswerId ? count + 1 : count,
      0
    )
  }
}
