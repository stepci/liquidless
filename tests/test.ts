import { renderObject, renderString } from '../src'

const string = renderString('Hello, {{ world | upcase | something: 1, 2 }}', { world: 'world!' }, {
  filters: {
    something: (value, args) => value.toLowerCase()
  }
})

const object = renderObject([{'hello': {'world': '{{ world }}'}}], { world: 'world!' })
console.log(object)
