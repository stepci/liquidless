export type Filters = {
  [key: string]: FilterFunction
}

export type FilterFunction = {
  (value: any): string
}

export const defaultFilters: Filters = {
  uppercase: (value) => value.toUpperCase()
}
