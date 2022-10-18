export type Filters = {
  [key: string]: FilterFunction
}

export type FilterFunction = {
  (value: any, args: any[] | undefined): any
}

export const defaultFilters: Filters = {
  uppercase: (value) => value.toUpperCase()
}
