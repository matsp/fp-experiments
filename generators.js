// test promises
const arrayPromise = () => new Promise(resolve => setTimeout(() => resolve([1, 2, 3, 4, 5]), 500))
const delayPromise = () => new Promise(resolve => setTimeout(() => resolve(), 1000))


/**
 * Pipelining functions.
 */
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

///////////////
///////////////
///////////////

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

///////////////
///////////////
///////////////

const run = pipeline => {
  let cb = null
  let queue = []

  const producer = async function * () {
    while(true) {
      if (queue.length > 0) yield queue.shift()
      await new Promise(res => cb = resolve)
      cb = null
    }
  }()

  const dispatch = action => {
    if (cb) callback()
    queue.push(action)
  }

  for await(const action of pipeline({action: producer, dispatch: dispatch}))
}

/**
 * Creates async iterable from iterable data e.g. array.
 */
// const asyncIterableFrom = handlers => async function * (data) {
//   const { next, error, complete } = handlers
//   // while (true) {
//   try {
//     const result = await data()
//     for (const item of result) {
//       yield item
//       next(item)
//     }
//     complete()
//   } catch (error) {
//     error(error)
//   }
//   // }
// }

// const createEventGenerator = (element, event) => {

// }

// const observer = asyncIterableFrom({
//   next: value => console.log(`value: ${value}`),
//   error: error => console.error(`error: ${error}`),
//   complete: () => console.log('completed')
// })
// const arrayObserver = observer(arrayPromise)

// const print = async () => {
//   for await (const item of arrayObserver) {
//     console.log(item)
//   }
}

// print()

// const createObservable = subscribe => ({
//   subscribe: subscribe,
//   // synchronous from array
//   from: values => {
//     return createObservable(observer => {
//       values.forEach(value => observer.next(value))
//       observer.complete()
//       return ({
//         unsubscribe () {
//           console.log('unsubscribed')
//         }
//       })
//     })
//   },
//   value: value => {
//     return createObservable(observer => {
//       observer.next(value)
//       observer.complete()
//     })
//   }
// })

//
// const observer = {
//   next (value) {
//     console.log(value)
//   },
//   error (err) {
//     console.error(err)
//   },
//   complete () {
//     console.info('done')
//   }
// }

// const array$ = createObservable().from([1, 2, 3, 4, 5])
// const subscription = array$.subscribe(observer)

// const stream$ = createObservable().value(1)
// const streamSubscription = stream$.subscribe(observer)
