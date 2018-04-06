function get (url, resolve, reject, request) {
  const results = []
  const onResolve = (response) => {
    results.push(response)
    resolve(response)
  }
  const promise = request(url).then(onResolve, reject)
  const promises = [promise]
  return {
    get (nextUrl, nextResolve, nextReject, nextRequest) {
      Promise.all(promises)
        .then(promisesResults => {
          const onNextResolve = (response) => {
            results.push(response)
            nextResolve(response, results)
          }
          const nextPromise = nextRequest(nextUrl).then(onNextResolve, nextReject)
          promises.push(nextPromise)
        })
      return this
    }
  }
}

module.exports = { get }
