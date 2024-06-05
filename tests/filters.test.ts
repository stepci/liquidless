import { describe, expect, test } from 'vitest'
import { defaultFilters, parseArgs } from '../src/filters'

describe('defaultFilters', () => {
  describe('upcase', () => {
    test('should convert a string to uppercase', () => {
      expect(defaultFilters.upcase('hello', [], '')).toBe('HELLO')
    })
  })

  describe('downcase', () => {
    test('should convert a string to lowercase', () => {
      expect(defaultFilters.downcase('HELLO', [], '')).toBe('hello')
    })
  })

  describe('capitalize', () => {
    test('should capitalize a string', () => {
      expect(defaultFilters.capitalize('hello world', [], '')).toBe(
        'Hello world'
      )
    })
  })

  describe('toInt', () => {
    test('should convert a string to an integer', () => {
      expect(defaultFilters.toInt('123.123', [], '')).toBe(123)
    })
  })

  describe('toFloat', () => {
    test('should convert a string to a float', () => {
      expect(defaultFilters.toFloat('123.123', [], '')).toBe(123.123)
    })
  })

  describe('toString', () => {
    test('should convert a value to a string', () => {
      expect(defaultFilters['toString'](123.123, [], '')).toBe('123.123')
    })
  })

  describe('append', () => {
    test('should append args', () => {
      expect(defaultFilters['append']('the', ['quick', 'brown', 'fox'], '')).toBe('thequickbrownfox')
    })
  })

  describe('base64_decode', () => {
    test('should base64 decode', () => {
      expect(defaultFilters['base64_decode']('aGVsbG8sIHdvcmxkIQ==', [], '')).toBe('hello, world!')
    })
  })

  describe('base64_encode', () => {
    test('should base64 encode', () => {
      expect(defaultFilters['base64_encode']('hello, world!', [], '')).toBe('aGVsbG8sIHdvcmxkIQ==')
    })
  })

  describe('camelize', () => {
    test('should camelize', () => {
      expect(defaultFilters['camelize']('foo-bar', [], '')).toBe('fooBar')
    })
  })

  describe('escape', () => {
    test('should escape', () => {
      expect(defaultFilters['escape']('hall&oates', [], '')).toBe('hall&amp;oates')
    })
  })

  describe('hmac_sha1', () => {
    test('should sha1', () => {
      expect(defaultFilters['hmac_sha1']('hello, world!', [], '')).toBe('1f09d30c707d53f3d16c530dd73d70a6ce7596a9')
    })
  })

  describe('hmac_sha256', () => {
    test('should sha256', () => {
      expect(defaultFilters['hmac_sha256']('hello, world!', [], '')).toBe('68e656b251e67e8358bef8483ab0d51c6619f3e7a1a9f0e75838d41ff368f728')
    })
  })

  describe('lstrip', () => {
    test('should strip whitespace from beginning', () => {
      expect(defaultFilters['lstrip']('   hello, world!', [], '')).toBe('hello, world!')
    })
  })

  describe('md5', () => {
    test('should md5', () => {
      expect(defaultFilters['md5']('hello, world!', [], '')).toBe('3adbbad1791fbae3ec908894c4963870')
    })
  })

  describe('newline_to_br', () => {
    test('should replace newline with br', () => {
      expect(defaultFilters['newline_to_br']('hello,\nworld!', [], '')).toBe('hello,<br/>world!')
    })
  })

  describe('pluralize', () => {
    test('should pluralize multiple', () => {
      expect(defaultFilters['pluralize'](2, ['item', 'items'], '')).toBe('2 items')
    })
    test('should pluralize single', () => {
      expect(defaultFilters['pluralize'](1, ['item', 'items'], '')).toBe('1 item')
    })
  })

  describe('prepend', () => {
    test('should prepend', () => {
      expect(defaultFilters['prepend']('world', ['hello'], '')).toBe('helloworld')
    })
  })

  describe('remove', () => {
    test('should remove', () => {
      expect(defaultFilters['remove']('helloworldhello', ['world'], '')).toBe('hellohello')
      expect(defaultFilters['remove']('helloworldhello', ['hello'], '')).toBe('world')
    })
  })

  describe('remove_first', () => {
    test('should remove first', () => {
      expect(defaultFilters['remove_first']('helloworldhelloworld', ['hello'], '')).toBe('worldhelloworld')
      expect(defaultFilters['remove_first']('hello, world', ['moon'], '')).toBe('hello, world')
    })
  })

  describe('remove_last', () => {
    test('should remove last', () => {
      expect(defaultFilters['remove_last']('helloworldhelloworld', ['hello'], '')).toBe('helloworldworld')
      expect(defaultFilters['remove_last']('hello, world', ['moon'], '')).toBe('hello, world')
    })
  })

  describe('replace', () => {
    test('should replace', () => {
      expect(defaultFilters['replace']('helloworldhello', ['world', 'moon'], '')).toBe('hellomoonhello')
      expect(defaultFilters['replace']('helloworldhello', ['hello', 'gutentag'], '')).toBe('gutentagworldgutentag')
    })
  })

  describe('replace_first', () => {
    test('should replace first', () => {
      expect(defaultFilters['replace_first']('helloworldhelloworld', ['hello', 'gutentag'], '')).toBe('gutentagworldhelloworld')
    })
  })

  describe('replace_last', () => {
    test('should replace last', () => {
      expect(defaultFilters['replace_last']('helloworldhelloworld', ['hello', 'gutentag'], '')).toBe('helloworldgutentagworld')
    })
  })

  describe('rstrip', () => {
    test('should strip trailing whitespaces', () => {
      expect(defaultFilters['rstrip']('hello, world!   ', [], '')).toBe('hello, world!')
    })
  })

  describe('sha1', () => {
    test('should sha1', () => {
      expect(defaultFilters['sha1']('hello, world!', [], '')).toBe('1f09d30c707d53f3d16c530dd73d70a6ce7596a9')
    })
  })

  describe('hmac_sha256', () => {
    test('should sha256', () => {
      expect(defaultFilters['sha256']('hello, world!', [], '')).toBe('68e656b251e67e8358bef8483ab0d51c6619f3e7a1a9f0e75838d41ff368f728')
    })
  })

  describe('slice', () => {
    test('should slice string or array', () => {
      expect(defaultFilters['slice']('hello, world!', [7, 12], '')).toBe('world')
      expect(defaultFilters['slice'](['a', 'b', 'c', 'd'], [1, 3], '')).toStrictEqual(['b', 'c'])
    })
  })

  describe('split', () => {
    test('should split string', () => {
      expect(defaultFilters['split']('hello,world', [','], '')).toStrictEqual(['hello', 'world'])
    })
  })

  describe('strip', () => {
    test('should strip string', () => {
      expect(defaultFilters['strip']('  hello, world!   ', [], '')).toBe('hello, world!')
    })
  })

  describe('strip_html', () => {
    test('should strip HTML from string', () => {
      expect(defaultFilters['strip_html']('hello,<br/>world!', [], '')).toBe('hello,world!')
    })
  })

  describe('strip_newlines', () => {
    test('should strip newlines from string', () => {
      expect(defaultFilters['strip_newlines']('hello,\nworld!\n', [], '')).toBe('hello,world!')
    })
  })

  describe('url_encode', () => {
    test('should url-encode', () => {
      expect(defaultFilters['url_encode']('user@host.com', [], '')).toBe('user%40host.com')
    })
  })

  describe('url_decode', () => {
    test('should url-decode', () => {
      expect(defaultFilters['url_decode']('user%40host.com', [], '')).toBe('user@host.com')
    })
  })
})

describe('parseArgs', () => {
  test('should parse filter arguments', () => {
    expect(parseArgs('1, 2')).toEqual([1, 2])
    expect(parseArgs('"test", 2')).toEqual(['test', 2])
    expect(parseArgs("'test', 2")).toEqual(['test', 2])
  })

  test('should parse quoted strings', () => {
    expect(parseArgs('"test"')).toEqual(['test'])
    expect(parseArgs("'test'")).toEqual(['test'])
  })

  test('should parse numbers', () => {
    expect(parseArgs('1, 2')).toEqual([1, 2])
    expect(parseArgs('1.1, 2.2')).toEqual([1.1, 2.2])
  })

  test('should parse booleans', () => {
    expect(parseArgs('true, false')).toEqual([true, false])
  })

  test('should parse null', () => {
    expect(parseArgs('null')).toEqual([null])
  })
})
