/**
 * @callback resolveCallback
 * @param {*} response
 * @param {Array} responses
 * @return {void}
 */

/**
 * @callback rejectCallback
 * @return {void}
 */

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @function fetch
 * @param {url|Request}
 * @return {Promise}
 */

/**
 * @function fetchSequence
 * @param {string} url
 * @param {resolveCallback} resolve
 * @param {rejectCallback} reject
 * @param {function(): Promise} fetch
 * @param {{next: fetchSequence}}
 */
function fetchSequence (url, resolve, reject, fetch = window && window.fetch) {
  const results = []
  const onResolve = (response) => {
    results.push(response)
    if (resolve) {
      /**
       * We pass a new copy of results array in order
       * to avoid modification of the original array.
       */
      resolve(response, results.slice())
    }
  }
  const promise = fetch(url).then(onResolve, reject)
  const promises = [promise]
  return {
    next (nextUrl, nextResolve, nextReject, nextFetch = fetch) {
      Promise.all(promises)
        .then(() => {
          const onNextResolve = (response) => {
            results.push(response)
            if (nextResolve) {
              nextResolve(response, results.slice())
            }
          }
          const nextPromise = nextFetch(nextUrl).then(onNextResolve, nextReject)
          promises.push(nextPromise)
        })
      return this
    }
  }
}

module.exports = fetchSequence
