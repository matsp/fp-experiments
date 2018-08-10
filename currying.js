// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
const curry = (fn) => {
  const arity = fn.length

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args)
    }

    return fn.call(null, ...args)
  }
}


// without helper function
const add = a => b => a + b
const add10 = add(10)

console.log(add10(5)) // => 15

// with helper function
const isEven = x => x % 2 === 0
const filter = curry((f, xs) => xs.filter(f))
const filterEven = filter(isEven)
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(filterEven(input)) // => [2, 4, 6, 8, 10]