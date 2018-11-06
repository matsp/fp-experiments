import { h, updateDOM } from './utils.js'

import { pipe, createDispatcher, createDispatch } from './generators.js'

let initialState = {
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
    }
  }, 'add')
}

const renderComponent = state => {
  return h('button', {
    onClick: () => {
      console.time(`update state -> rerender`)
      updateComponents(state)
      console.timeEnd(`update state -> rerender`)
    }
  }, 'render')
}

// customized functions
const updateMountpoint = updateDOM('app')
const updateComponents = updateMountpoint(listComponent, buttonComponent, renderComponent)

// first render
console.time(`first rendering`)
updateComponents(initialState)
console.timeEnd(`first rendering`)

/// ///////////////////////////////////////////////////////
/// ///////////////////////////////////////////////////////
/// ///////////////////////////////////////////////////////

const initial = async function * (actions) {
  let state = {
    text: 'initial state text'
  }
  yield { type: 'STATE', value: state }
  for await (const action of actions) {
    console.log(action)
    yield action
  }
}

const test2Gen = async function * (actions) {
  for await (const action of actions) {
    console.log(action)
    yield action
  }
}

const test3Gen = async function * (actions) {
  for await (const action of actions) {
    console.log(action)
  }
}

const pipeline = pipe(initial, test2Gen, test3Gen)

const dispatcher = createDispatcher(pipeline)
const dispatch = createDispatch(dispatcher)

dispatch({ type: 'TEST', value: 'dispatched action' })
