const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const mapping = f => reducing => (result, input) => reducing(result, f(input))
const filtering = predicate => reducing => (result, input) => predicate(input) ? reducing(result, input) : result
const transduce = (xform, reducing, initial, input) => input.reduce(xform(reducing), initial)

// transformation
const xform = pipe(
    mapping(x => x * 2), 
    filtering(x => x % 2 === 0)
)

// reducer
const arrayPush = (xs, x) => {
    xs.push(x)
    return xs
}

// input
const test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(transduce(xform, arrayPush, [], test))
