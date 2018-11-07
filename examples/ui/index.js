import { h, updateDOM, appendDOM, clearDOM } from './utils.js'

import { pipe, runPipeline } from './generators.js'

// let initialState = {
//   data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
// }

// rendering fn aka component
// const listComponent = state => {
//   const list = children => h('ul', {}, ...children)
//   const data = state.data.map(d => h('li', { style: 'color: red;' }, d))
//   return list(data)
// }

// const buttonComponent = state => {
//   return h('button', {
//     onClick: () => {
//       state.data.push('99')
//     }
//   }, 'add')
// }

// const renderComponent = state => {
//   return h('button', {
//     onClick: () => {
//       console.time(`update state -> rerender`)
//       updateComponents(state)
//       console.timeEnd(`update state -> rerender`)
//     }
//   }, 'render')
// }

// customized functions
// const updateMountpoint = updateDOM('app')
// const updateComponents = updateMountpoint(listComponent, buttonComponent, renderComponent)

// first render
// console.time(`first rendering`)
// updateComponents(initialState)
// console.timeEnd(`first rendering`)

// generator pipeline

const core = async function * (actions) {
  let state = {
    list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  }
  yield { type: 'STATE', value: state }
  for await (const action of actions) {
    switch (action.type) {
      case 'ADD_ITEM':
        state.list.push(action.value)
        yield { type: 'STATE', value: state }
    }
    yield action
  }
}

const listComponent = async function * (actions) {
  for await (const action of actions) {
    switch (action.type) {
      case 'STATE':
        const list = children => h('ul', {}, ...children)
        const data = action.value.list.map(d => h('li', { style: 'color: red;' }, d))
        yield { type: 'COMPONENT', value: list(data) }
        break
    }
    yield action
  }
}

const buttonComponent = async function * (actions, dispatch) {
  for await (const action of actions) {
    switch (action.type) {
      case 'STATE':
        yield {
          type: 'COMPONENT',
          value: h('button', {
            onClick: () => {
              dispatch({ type: 'ADD_ITEM', value: Math.floor(Math.random() * 100).toString() })
            }
          }, 'add')
        }
        break
    }
    yield action
  }
}

const render = async function * (actions) {
  for await (const action of actions) {
    switch (action.type) {
      case 'COMPONENT':
        appendDOM('app')(action.value)
        break
    }
    yield action
  }
}

const logger = async function * (actions) {
  for await (const action of actions) {
    console.log(action)
  }
}

const pipeline = pipe(
  core,
  listComponent,
  buttonComponent,
  render,
  logger
)

runPipeline(pipeline)
