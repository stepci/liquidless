import { renderTemplate } from '../src'

const string = renderTemplate('Hello, {{ world | upcase | something: 1, 2 }}', { world: 'world!' }, {
  filters: {
    something: (value, args) => value.toLowerCase()
  }
})

const object = renderTemplate([{'hello': {'world': '{{ world }}'}}], { world: 'world!' })
console.log(object)
