import { renderTemplate } from '../src'

console.log(renderTemplate('Hello, {{ world | uppercase | something }}', { world: 'world!' }, {
  filters: {
    something: (value) => value.toLowerCase()
  }
}))
