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

/**
 * Custom dom updating function creation
 */
export const updateDOM = rootID => (...renderingFns) => state => {
  const rootNode = document.getElementById(rootID)
  while (rootNode.firstChild) {
    rootNode.removeChild(rootNode.firstChild)
  }
  const rendered = renderingFns.map(r => r(state))
  rendered.forEach(node => rootNode.appendChild(node))
}

// TODO: Add DOM manipulation functions for appending at the end or inserting at the front
// of child list e.g.
