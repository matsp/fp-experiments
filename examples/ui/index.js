// common functions

const markup = tag => (...attrs) => (...children) => {
  const el = document.createElement(tag)
  attrs.forEach(a => el.setAttributeNode(a))
  children.forEach(child => el.appendChild(child))
  return el
}

const attr = key => value => {
  const a = document.createAttribute(key)
  a.value = value
  return a
}

const text = t => document.createTextNode(t)

// const appendNode = parent => child => parent.appendChild(child)



// example

// elements
const div = markup('div')
const span = markup('span')

// attributes
const style = attr('style')

const example = div(style('color: red;'))
const nested = span(style())

const exText = text('Hello')
const exampleWithText = example(exText)

// const appendToExample = appendNode(exampleWithText)
// appendToExample(nested)

console.log(exampleWithText)