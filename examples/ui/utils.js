/**
 * Create element tree
 */
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

// TODO: Better way instead of global storage?!
const proxies = new WeakSet()
/**
 * Make the given target obj reactive by calling the listener on changes
 */
export const createOberservable = ({ target, listener }) => {
  let observable
  const handler = {
    get (target, key) {
      if (typeof target[key] === 'object' && target[key] !== null && !proxies.has(target[key])) {
        const newObservable = createOberservable({ target: target[key], listener: listener })
        target[key] = newObservable
        proxies.add(newObservable)
      }
      return target[key]
    },
    set (target, key, value) {
      target[key] = value
      listener(observable)
      return true
    }
  }
  observable = new Proxy(target, handler)
  proxies.add(observable)
  return observable
}

/**
 * Custom dom updating function creation
 */
export const updateDOM = rootID => (...renderingFns) => state => {
  console.info('called updateDOM')
  const rootNode = document.getElementById(rootID)
  const rendered = renderingFns.map(r => r(state))
  rendered.forEach(node => rootNode.appendChild(node))
}
