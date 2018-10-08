import { h, createObservable, _createObservable, updateDOM } from './utils.js'

const initialState = {
  data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
}

// rendering fn aka component
const listComponent = state => {
  const list = children => h('ul', {}, ...children)
  const data = state.data.map(d => h('li', { style: 'color: red;' }, d))
  return list(data)
}

const buttonComponent = state => {
  return h('button', {
    onClick: () => {
      state.data.push('99')
      console.log(state)
    }
  }, 'add')
}

// customized functions
const updateMountpoint = updateDOM('app')
const updateComponents = updateMountpoint(listComponent, buttonComponent)
const stateObservable = _createObservable(initialState)
stateObservable.subscribe(newValue => updateComponents(newValue))
// const stateObservable = createObservable({ target: initialState, listener: updateComponents })
// stateObservable(7)
updateComponents(stateObservable())
// first render
// console.log(stateObservable)
// console.time(`first rendering`)
// updateComponents(stateObservable)
// console.timeEnd(`first rendering`)

// console.time(`update state -> rerender`)
// stateObservable.data.push('99')
// console.timeEnd(`update state -> rerender`)
