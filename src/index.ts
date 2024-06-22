import flat from 'flat'
import { defaultFilters, Filters, parseArgs } from './filters'

export type RenderOptions = {
  filters?: Filters
  delimiters?: string[]
}

const getType = (value: any) =>
  Array.isArray(value) ? 'array' : value === null ? 'null' : typeof value

export function renderString(
  template: string,
  props: Record<string, any>,
  options?: RenderOptions
): string | any {
  const delimiters = options?.delimiters ?? ['{{', '}}']

  const expressions = template.split(
    new RegExp(`\\${delimiters[0]}(.+?)${delimiters[1]}`, 'g')
  )

  const combinedFilters: Filters = { ...defaultFilters, ...options?.filters }
  for (let i = 1; i < expressions.length; i += 2) {
    const [variable, ...filters] = expressions[i]
      .split('|')
      .map((s) => s.trim())

    const variableValue = props[variable]

    expressions[i] = filters.reduce((variableValue, filter) => {
      const splitPattern = /:(?![^{}]*})/g
      const [filterMethod, args] = filter.split(splitPattern)
      const parsedArgs = parseArgs(args ?? '')

      return combinedFilters[filterMethod]
        ? combinedFilters[filterMethod](variableValue, parsedArgs, variable)
        : variableValue
    }, variableValue)
  }

  // if there are no other expressions, return the first one which can be of any type, for example a number
  if (
    expressions.length === 3 &&
    expressions[0] === '' &&
    expressions[2] === ''
  ) {
    return expressions[1]
  }

  return expressions.join('')
}

export function renderObject<T extends object>(
  object: object,
  props: object,
  options?: RenderOptions
): T {
  const flatProps: Record<PropertyKey, unknown> = flat(props)

  const transform = <T extends object>(obj: T) => {
    const transformedNode = new (Object.getPrototypeOf(obj).constructor)()
    for (const [key, value] of Object.entries(obj)) {
      const nodeType = getType(value)

      const transformedKey = renderString(key, flatProps, options)

      if (nodeType === 'object' || nodeType === 'array') {
        transformedNode[transformedKey] = transform(value)
      } else if (nodeType === 'string') {
        transformedNode[transformedKey] = renderString(value, flatProps, options)
      } else {
        transformedNode[transformedKey] = value
      }
    }

    return transformedNode
  }

  return transform(object) as T
}
