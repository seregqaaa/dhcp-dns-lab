import { shuffleArray } from '@/utils/arrays'

export default url => ({
  getTest: async () => {
    const test = await fetch(url).then(data => data.json())
    return shuffleArray(test).map(item => ({
      id: item.id,
      title: item.title,
      options: shuffleArray(item.options)
    }))
  },
  getResult: async answers => {
    return await fetch(url, {
      body: JSON.stringify(answers),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(data => data.json())
  }
})
