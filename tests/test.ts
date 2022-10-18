import { renderTemplate } from '../src'

console.log(renderTemplate('Hello, {{ world | uppercase | something: 1, 2 }}', { world: 'world!' }, {
  filters: {
    something: (value, args) => value.toLowerCase()
  }
}))
