export type Filters = {
  [key: string]: FilterFunction
}

export type FilterFunction = {
  (value: any, args: any[] | undefined, variable: string): any
}

export const defaultFilters: Filters = {
  upcase: (value) => value.toUpperCase(),
  downcase: (value) => value.toLowerCase(),
  capitalize: (value) => value.charAt(0).toUpperCase() + value.slice(1),
  toInt: (value) => parseInt(value),
  toFloat: (value) => parseFloat(value),
  toString: (value: any) => value.toString(),
}
