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
}

const QUOTED_STRING_REGEX = /^(["'])(?<string>.+)\1$/;

export const parseArgs = (args: string) => args.length > 0
  ? args.split(',')
      .map(arg => arg.trim())
      .map(arg => QUOTED_STRING_REGEX.test(arg)
        ? arg.slice(1, -1)
        : JSON.parse(arg)
      )
  : []
