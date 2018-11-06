// test promises
const arrayPromise = () => new Promise(resolve => setTimeout(() => resolve([1, 2, 3, 4, 5]), 500))
const delayPromise = () => new Promise(resolve => setTimeout(() => resolve(), 1000))

/**
 * Pipelining functions.
 */
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

/// ////////////
/// ////////////
/// ////////////

/**
 * Map for async iterators.
 */
const map = mapper => async function * (iterable) {
  for await (const item of iterable) {
    yield mapper(item)
  }
}

/**
 * Filter for async iterators.
 */
const filter = predicate => async function * (iterable) {
  for await (const item of iterable) {
    yield predicate(item)
  }
}

/**
 * Creates an async iterator with action object-/s
 */
const createActions = (...actions) => (async function * () { yield actions }())

/**
 * Dispatch actions on pipeline.
 *
 * @param {*} pipeline
 */
export const createDispatcher = pipeline =>
  async function * (actions) {
    for await (const action of createActions(actions)) {
      yield * pipeline(action)
    }
  }

export const createDispatch = dispatcher => async (actions) => {
  for await (const action of dispatcher(actions)) {}
}
