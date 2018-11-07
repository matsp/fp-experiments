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
const createAction = action => (async function * () { yield action }())

/**
 * Dispatch actions on pipeline.
 *
 * @param {*} pipeline
 */
export const createPipelineDispatcher = pipeline =>
  async function * (actions) {
    for await (const action of createAction(actions)) {
      yield * pipeline(action)
    }
  }

/**
 * Create dispatcher function for specific dispatcher.
 *
 * @param {*} dispatcher
 */
export const dispatchActions = dispatcher => async (...actions) => {
  for await (const action of dispatcher(actions)) {}
}
