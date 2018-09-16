const h = (...args) => {
  const [tag, attrs, ...children] = args
  const attrsKeys = Object.keys(attrs) || []
  const el = document.createElement(tag)
  attrsKeys.forEach(k => {
      if (k.startsWith('on')) {
        const event = k.substring(2).toLowerCase()
        el.addEventListener(event, attrs[k])
      }
      else {
        const a = document.createAttribute(k)
        a.value = attrs[k]
        el.setAttributeNode(a)
      }
  })
  children.forEach(c => {
    c instanceof Node 
      ? el.appendChild(c)
      : el.appendChild(document.createTextNode(c))
  })
  return el
}

console.time()
const test = h('div', {class: 'test', style: 'color: red;'}, 
                h('span', {style: 'color: blue;'}, 'nested blue text'),
                h('h1', {onClick: () => console.log('clicked')}, 'Title'),
             'red text')

const mountpoint = document.getElementById('app')
mountpoint.appendChild(test)
console.timeEnd()