// hypertext

const h = (tag, attrs, ...children) => {
  const el = document.createElement(tag)
  const keys = typeof attrs === 'object' ? Object.keys(attrs) : []
  if (keys.length !== 0) {
    keys.forEach(k => {
      const a = document.createAttribute(k)
      a.value = attrs[k]
      el.setAttributeNode(a)
    })
  }
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
const mount = document.getElementById('app')
mount.appendChild(test)
console.timeEnd()