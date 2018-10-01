import { h, createOberservable, updateDOM } from './utils.js'

const state = {
  // data: () => {
  //   let res = []
  //   for (let i = 0; i <= 1000; i++) {
  //     res.push(Math.random().toString(36).substring(2, 15))
  //   }
  //   return res
  // }
  data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
}

// rendering fn
const listComponent = state => {
  const list = children => h('ul', {}, ...children)
  console.log(`state.data looks like: ${state.data}`)
  const data = state.data.map(d => h('li', { style: 'color: red;' }, d))
  return list(data)
}

// customized functions
const updateMountpoint = updateDOM('app')
const updateComponents = updateMountpoint(listComponent)
const stateObservable = createOberservable({ target: state, listener: updateComponents })

// first render
console.time(`rendering ${state.data.length} nodes`)
updateComponents(stateObservable)
console.timeEnd(`rendering ${state.data.length} nodes`)
console.log(stateObservable)

console.time(`update state -> rerender`)
stateObservable.data.push('99', '100')
console.log(stateObservable)
console.timeEnd(`update state -> rerender`)
