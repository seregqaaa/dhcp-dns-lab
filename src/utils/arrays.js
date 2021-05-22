export const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)

export const fillGradually = (arrFrom, arrTo, interval = 300) => {
  const intervalId = setInterval(() => {
    arrFrom.length ? arrTo.push(arrFrom.pop()) : clearInterval(intervalId)
  }, interval)
}
