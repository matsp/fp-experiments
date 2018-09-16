const h = (...args) => {
  const [tag, attrs, ...children] = args
  const attrsKeys = Object.keys(attrs) || []
  const el = document.createElement(tag)
  attrsKeys.forEach(k => {
      const a = document.createAttribute(k)
      a.value = attrs[k]
      el.setAttributeNode(a)
  })
  children.forEach(c => {
    c instanceof Node 
      ? el.appendChild(c)
      : el.appendChild(document.createTextNode(c))
  })
  return el
}

const test = h('div', {class: 'test', style: 'color: red;'}, 
                h('span', {style: 'color: blue;'}, 'nested blue text'),
                h('h1', {}, 'Title'),
             'red text')

console.time()
const mountpoint = document.getElementById('app')
mountpoint.appendChild(test)
console.timeEnd()