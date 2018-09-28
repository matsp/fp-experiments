
const createObserver = handlers => ({
  _handlers: handlers,
  _isUnsubscribed: false,
  next (value) {
    if (this._handlers.next && !this._isUnsubscribed) {
      this._handlers.next(value)
    }
  },
  error (error) {
    if (!this._isUnsubscribed) {
      if (this._handlers.error) {
        this._handlers.error(error)
      }
      this.unsubscribe()
    }
  },
  complete () {
    if (!this._isUnsubscribed) {
      if (this._handlers.complete) {
        this._handlers.complete()
      }

      this.unsubscribe()
    }
  },
  unsubscribe () {
    this._isUnsubscribed = true

    // this refers to runtime instance
    if (this._unsubscribe) {
      this._unsubscribe()
    }
  }
})

const createObservable = subscribe => ({
  _subscribe: subscribe,
  subscribe (obj) {
    const observer = createObserver(obj)

    observer._unsubscribe = this._subscribe(observer)
    // return subscription object
    return ({
      unsubscribe: () => {
        observer.unsubscribe()
      }
    })
  }
})

/*************************
 *       fromArray       *
 *************************/

const createObservableFrom = values => {
  return createObservable(observer => {
    values.forEach(value => observer.next(value))
    observer.complete()
  })
}

/*************************
 *        interval       *
 *************************/

const createObservableInterval = interval => {
  return createObservable(observer => {
    let i = 0
    const id = setInterval(() => {
      observer.next(i++)
    }, interval)

    return () => {
      clearInterval(id)
    }
  })
}

/*************************
 *       fromEvent       *
 *************************/

// Observable.fromEvent = (element, eventName) => {
//   return createObservable((observer) => {
//     const eventHandler = (event) => observer.next(event);

//     element.addEventListener(eventName, eventHandler, false);

//     return () => {
//       element.removeEventListener(eventName, eventHandler, false);
//       console.log('Observable.fromEvent: unsubscribbed');
//     };
//   });
// };

/*************************
 *          map          *
 *************************/

// Observable.prototype.map = function (transformation) {
//   const stream = this;

//   return createObservable((observer) => {
//     const subscription = stream.subscribe({
//       next: (value) => observer.next(transformation(value)),
//       error: (err) => observer.error(err),
//       complete: () => observer.complete()
//     });

//     return subscription.unsubscribe;
//   });
// };

/*************************
 *        Examples       *
 *************************/

// ---------------------
// Numbers from array
// ---------------------

const numbers$ = createObservableFrom([0, 1, 2, 3, 4])
const numbersSubscription = numbers$.subscribe({
  next (value) { console.log(value) },
  error (err) { console.error(err) },
  complete () { console.info('done') }
})

setTimeout(numbersSubscription.unsubscribe, 500)

// ---------------------
// Intervals
// ---------------------

const interval$ = createObservableInterval(100)
const intervalSubscription = interval$.subscribe({
  next (value) { console.log(value) },
  error (err) { console.error(err) },
  complete () { console.info('done') }
})

setTimeout(intervalSubscription.unsubscribe, 1000)

// ---------------------
// Click events
// ---------------------
// const button = document.querySelector('button');
// const clicks$ = Observable.fromEvent(button, 'click');
// const clicksSubscription = clicks$.subscribe({
//   next(value) { console.log('clicked'); },
//   error(err) { console.error(err); },
//   complete() { console.info('done'); }
// });

// setTimeout(clicksSubscription.unsubscribe, 1500);

// ---------------------
// Map
// ---------------------
// const mappedInterval$ = Observable
//   .interval(100)
//   .map((value) => 2 * value);

// const mappedIntervalSubscription = interval$
//   .subscribe({
//     next(value) { console.log(value); },
//     error(err) { console.error(err); },
//     complete() { console.info('done'); }
//   });

// setTimeout(mappedIntervalSubscription.unsubscribe, 1500);
