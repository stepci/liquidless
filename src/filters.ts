export type Filters = {
  [key: string]: FilterFunction
}

export type FilterFunction = {
  (value: any): any
}

export const defaultFilters: Filters = {
  uppercase: (value) => value.toUpperCase()
}
