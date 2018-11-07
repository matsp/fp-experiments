import { h, appendElement } from './dom-utils.js'
import { pipe, runPipeline } from './generators-utils.js'

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
        appendElement('app')(action.value)
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
