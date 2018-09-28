export const h = (tag, attrs, ...children) => {
  const attrsKeys = Object.keys(attrs)
  const el = document.createElement(tag)
  attrsKeys.forEach(k => {
    k.startsWith('on')
      ? el.addEventListener(k.substring(2).toLowerCase(), attrs[k])
      : el.setAttribute(k, attrs[k])
  })
  children.forEach(c => {
    c instanceof Node
      ? el.appendChild(c)
      : el.appendChild(document.createTextNode(c))
  })
  return el
}

export const createOberservable = ({ target, listener }) => {
  let observable
  const handler = {
    get (target, key) {
      return target[key]
    },
    set (target, prop, value) {
      target[prop] = value
      listener(observable)
      return true
    }
  }
  observable = new Proxy(target, handler)
  return observable
}

export const updateDOM = rootID => (...renderingFns) => state => {
  const rootNode = document.getElementById(rootID)
  // TODO: cache rendered nodes
  renderingFns.forEach(r => rootNode.appendChild(r(state)))
}
