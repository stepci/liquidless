import JSON5 from 'json5'
import * as crypto from 'crypto'

export type Filters = {
  [key: string]: FilterFunction
}

export type FilterFunction = {
  (value: any, args: any, variable: string): any
}

export const defaultFilters: Filters = {
  upcase: (value: string) => value.toUpperCase(),
  downcase: (value: string) => value.toLowerCase(),
  capitalize: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
  toInt: (value: any) => parseInt(value),
  toFloat: (value: any) => parseFloat(value),
  toString: (value: any) => value.toString(),
  append: (value: string, args: string[]) => value.concat(...args),
  base64_decode: (value: string) => atob(value),
  base64_encode: (value: any) => btoa(value),
  camelize: (value: string) => value.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase()),
  escape: (value: string) => value.replace( /[&"'<>]/g, c => htmlEscapeLookup.get(c)!),
  hmac_sha1: (value: any) => crypto.createHash("sha1").update(value).digest("hex"),
  hmac_sha256: (value: any) => crypto.createHash("sha256").update(value).digest("hex"),
  lstrip: (value: string) => value.trimStart(),
  md5: (value: any) => crypto.createHash("md5").update(value).digest("hex"),
  newline_to_br: (value: string) => value.replace(/\n/g, '<br/>'),
  pluralize: (value: any, args: string[]) => value.toString().concat(' ', parseInt(value) === 1 ? args[0] : args[1]),
  prepend: (value: string, args: string[]) => args[0].toString().concat(value),
  remove: (value: string, args: string[]) => value.replaceAll(args[0], ''),
  remove_first: (value: string, args: string[]) => replace_first(value,args[0], ''),
  remove_last: (value: string, args: string[]) => replace_last(value,args[0], ''),
  replace: (value: string, args: string[]) => value.replaceAll(args[0], args[1]),
  replace_first: (value: string, args: string[]) => replace_first(value,args[0], args[1]),
  replace_last: (value: string, args: string[]) => replace_last(value,args[0], args[1]),
  rstrip: (value: string) => value.trimEnd(),
  sha1: (value: any) => crypto.createHash("sha1").update(value).digest("hex"),
  sha256: (value: any) => crypto.createHash("sha256").update(value).digest("hex"),
  slice: (value: any, args: number[]) => Array.isArray(value) ? (value as Array<any>).slice(args[0], args[1]) : value.toString().slice(args[0], args[1]),
  split: (value: string, args: string[]) => value.toString().split(args[0]),
  strip: (value: string) => value.trim(),
  strip_newlines: (value: string) => value.replace(/[\r\n]/g, ''),
  strip_html: (value: string) => value.toString().replace(/<[^>]+>/g, ''),
  url_encode: (value: string) => encodeURIComponent(value),
  url_decode: (value: string) => decodeURIComponent(value),
}

const QUOTED_STRING_REGEX = /^(["'])(?<string>.+)\1$/
const splitPattern = /,(?![^{}]*})/g
const htmlEscapeLookup = new Map<string,string>([
  ['&', '&amp;'],
  ['"', '&quot;'],
  ['\'', '&apos;'],
  ['<', '&lt;'],
  ['>', '&gt;'],
]);

function replace_first(str: string, substr: string, newstr: string) {
  const pos = str.indexOf(substr);
  return pos < 0 ? str : str.substring(0, pos) + newstr + str.substring(pos+substr.length);
}

function replace_last(str: string, substr: string, newstr: string) {
  const pos = str.lastIndexOf(substr);
  return pos < 0 ? str : str.substring(0, pos) + newstr + str.substring(pos+substr.length);
}

export const parseArgs = (args: string) =>
  args.length > 0
    ? args
        .split(splitPattern)
        .map((arg) => arg.trim())
        .map((arg) =>QUOTED_STRING_REGEX.test(arg) ? arg.slice(1, -1) : JSON5.parse(arg))
    : []
