import { describe, test, expect } from 'vitest'
import { renderString, renderObject } from '../src/index'

describe('renderString', () => {
  describe('renderString', () => {
    test('should render a string using default delimiters', () => {
      expect(renderString('Hello, world!', {})).toBe('Hello, world!')
      expect(renderString('Hello, {{ world }}', { world: 'world!' })).toBe(
        'Hello, world!'
      )
      expect(renderString('Hello, {{ name }}!', { name: 'Joe' })).toBe(
        'Hello, Joe!'
      )
    })

    test('should render a string using custom delimiters', () => {
      expect(
        renderString(
          'Hello, <% name %>!',
          { name: 'Joe' },
          { delimiters: ['<%', '%>'] }
        )
      ).toBe('Hello, Joe!')
      expect(
        renderString(
          'Hello, ${{ name }}!',
          { name: 'Joe' },
          { delimiters: ['${{', '}}'] }
        )
      ).toBe('Hello, Joe!')
    })

    test('should render a string using a filter', () => {
      expect(
        renderString('Hello, {{ world | upcase }}', { world: 'world!' })
      ).toBe('Hello, WORLD!')

      expect(
        renderString(
          'Hello, {{ name | upcase }}!',
          { name: 'Joe' },
          { filters: { upcase: (value) => value.toUpperCase() } }
        )
      ).toBe('Hello, JOE!')
    })

    test('should render a string using multiple filters', () => {
      expect(
        renderString('Hello, {{ name | upcase | downcase }}!', { name: 'Joe' })
      ).toBe('Hello, joe!')
    })

    test('should render string using a custom filter', () => {
      expect(
        renderString(
          'Hello, {{ world | something: 1, 2, 3 }}',
          { world: 'world!' },
          {
            filters: {
              something: (value, args, variable) =>
                `${value} ${args.join(', ')} (${variable})`,
            },
          }
        )
      ).toBe('Hello, world! 1, 2, 3 (world)')
    })

    test('should render a string using a custom filter with arguments', () => {
      expect(
        renderString(
          'Hello, {{ name | substring: 0, 10 }}!',
          { name: 'averylonglonglonglongstring' },
          {
            filters: {
              substring: (value, args: [number, number]) =>
                value.substring(args[0], args[1]),
            },
          }
        )
      ).toBe('Hello, averylongl!')
    })

    test('should render a string using a custom filter with JSON arguments', () => {
      expect(
        renderString(
          `Hello, {{ name | json: {"hello": "world", "world": "hello"} }}`,
          { name: 'world' },
          {
            filters: {
              json: (value, args) => {
                return JSON.stringify(args)
              }
            },
          }
        )
      ).toBe('Hello, [{"hello":"world","world":"hello"}]')
    })

    test('should return the actual value if there is just one expression', () => {
      expect(renderString('{{ value }}', { value: 123 })).toBe(123)
      expect(renderString('{{ value }} {{ value }}', { value: 123 })).toBe(
        '123 123'
      )
      expect(renderString('"{{ value }}"', { value: 123 })).toBe('"123"')
      expect(renderString('{{ value | toString }}', { value: 123 })).toBe('123')
      expect(renderString('Test {{ value }}', { value: 123 })).toBe('Test 123')
    })

    test('should return ignore invalid filters', () => {
      expect(renderString('{{ value | invalidFilter }}', { value: 123 })).toBe(
        123
      )
    })
  })
})

describe('renderObject', () => {
  test('should render an object', () => {
    expect(
      renderObject([{ hello: { world: '{{ world }}' } }], { world: 'world!' })
    ).toEqual([{ hello: { world: 'world!' } }])

    expect(
      renderObject(
        {
          user: { name: '{{ name }}', id: '{{ captures.id }}' },
          nullField: null,
          list: [1, '{{ captures.id }}', 3],
        },
        { name: 'Joe', captures: { id: 1234 } }
      )
    ).toEqual({
      user: { name: 'Joe', id: 1234 },
      nullField: null,
      list: [1, 1234, 3],
    })
  })
})
