import { h } from './utils.js'

const state = {
    data: () => {
      let res = []
      for (let i = 0; i<=1000;i++) {
        res.push(Math.random().toString(36).substring(2, 15))
      }
      return res
    }
  }

const createOberservable = (observable, {onGet, onSet}) => {
  const interceptor = {
    get (target, key) {
      onGet(key)
      return target[key]
    },
    set (target, prop, value) {
      onSet(prop, value)
      return true
    }
  }
  return new Proxy(observable, interceptor)
}

const obj = {
  title: 'hello'
}

const store = createOberservable(obj, {
  onGet(key) {
    console.log(`calling get on ${key}`)
  },
  onSet(prop, value) {
    console.log(`calling set on ${prop} with value ${value}`)
  }
})

console.log(store.title)

store.title = 'title'



console.time('rendering 1000 nodes')

const listComponent = state => {
  const list = children => h('ul', {}, ...children)
  const data = state.data().map(d => h('li', {style: 'color: red;'}, d))
  return list(data)
}

const mountpoint = document.getElementById('app')
mountpoint.appendChild(listComponent(state))

console.timeEnd('rendering 1000 nodes')