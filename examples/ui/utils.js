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