export type Filters = {
  [key: string]: FilterFunction
}

export type FilterFunction = {
  (value: any, args: any[] | undefined, variable: string): any
}

export const defaultFilters: Filters = {
  upcase: (value) => value.toUpperCase()
}
