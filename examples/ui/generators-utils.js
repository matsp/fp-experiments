/**
 * Pipeline functions with dispatch injection.
 */
export const pipe = (...fns) => (x, dispatch) => fns.reduce((v, f) => f(v, dispatch), x)

/**
 * Map for async iterators.
 */
export const map = mapper => async function * (iterable) {
  for await (const item of iterable) {
    yield mapper(item)
  }
}

/**
 * Filter for async iterators.
 */
export const filter = predicate => async function * (iterable) {
  for await (const item of iterable) {
    yield predicate(item)
  }
}

/**
 * Kicks off pipeline and inject dispatch function.
 *
 * @param {*} pipeline
 */
export const runPipeline = async (pipeline) => {
  let callback = null
  const queue = []

  const actions = (async function * () {
    while (true) {
      if (queue.length > 0) yield queue.shift()
      await new Promise(resolve => { callback = resolve })
      callback = null
    }
  }())

  const dispatch = action => {
    if (callback) callback()
    queue.push(action)
  }
  for await (const action of pipeline(actions, dispatch)) {}
}
