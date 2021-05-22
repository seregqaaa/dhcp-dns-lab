export default url => ({
  getTest: async () => {
    return await fetch(url).then(data => data.json())
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
