import { h, appendElement, replaceElement, randomID } from './dom-utils.js'
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
  const id = randomID()
  for await (const action of actions) {
    switch (action.type) {
      case 'STATE':
        const list = children => h('ul', { id: id }, ...children)
        const items = action.value.list.map(d => h('li', { style: 'color: red;' }, d))
        yield { type: 'RENDER', id: id, value: list(items) }
        break
    }
    yield action
  }
}

const buttonComponent = async function * (actions, dispatch) {
  const id = randomID()
  for await (const action of actions) {
    switch (action.type) {
      case 'STATE':
        yield {
          type: 'RENDER',
          id: id,
          value: h('button', {
            id: id,
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
  let cache = {}
  for await (const action of actions) {
    switch (action.type) {
      case 'RENDER':
        if (cache[action.id]) {
          replaceElement(action.id)(action.value)
        } else {
          cache[action.id] = action.value
          appendElement('app')(action.value)
        }
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
