/**
 * @callback resolveCallback
 * @param {Response} response
 * @param {Response[]} responses
 * @return {void}
 */

/**
 * @callback rejectCallback
 * @return {void}
 */

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @callback fetch
 * @param {string|Request}
 * @return {Promise}
 */

/**
 * Функция делает последовательные запросы используя Fetch API
 * @function fetchSequence
 * @param {string|Request} url
 * @param {resolveCallback=} resolve
 * @param {rejectCallback=} reject
 * @param {fetch=} fetch
 * @return {{next: fetchSequence}}
 */
function fetchSequence (url, resolve, reject, fetch = window && window.fetch) {
  const results = []
  const tasks = []
  const onResolve = (response) => {
    results.push(response)
    if (resolve) {
      /**
       * We pass a new copy of results array in order
       * to avoid modification of the original array.
       * That's why we call results.slice(), instead of passing results
       */
      resolve(response, results.slice())
    }
  }

  const onTaskDone = () => {
    const task = tasks.shift()
    if (!task) {
      return
    }
    const [nextUrl, nextResolve, nextReject, nextFetch = fetch] = task
    const onNextResolve = (response) => {
      results.push(response)
      if (nextResolve) {
        nextResolve(response, results.slice())
      }
    }
    const onNextReject = (error) => {
      if (nextReject) {
        nextReject(error, results.slice())
      }
    }
    nextFetch(nextUrl)
      .then(onNextResolve, onNextReject)
      .then(onTaskDone)
  }

  fetch(url).then(onResolve, reject).then(onTaskDone)

  return {
    next (...args) {
      tasks.push(args)
      return this
    }
  }
}

module.exports = fetchSequence
