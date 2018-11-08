/**
 * Create element tree.
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
 * Clear DOM at specific element id.
 *
 * @param {*} elementID
 */
export const clearElement = elementID => {
  const rootNode = document.getElementById(elementID)
  while (rootNode.firstChild) {
    rootNode.removeChild(rootNode.firstChild)
  }
}

/**
 * Append elements at the end of a specific element id.
 *
 * @param {*} elementID
 */
export const appendElement = elementID => element => {
  const rootNode = document.getElementById(elementID)
  rootNode.appendChild(element)
}

/**
 * Replace specific DOM element by id.
 *
 * @param {*} id
 * @param {*} newElement
 */
export const replaceElement = id => newElement => {
  const oldElement = document.getElementById(id)
  oldElement.parentNode.replaceChild(newElement, oldElement)
}

/**
 * Returns a random id for DOM elements.
 */
export const randomID = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
