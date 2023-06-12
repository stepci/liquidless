import flat from 'flat'
import cloneDeep from 'rfdc'
import { defaultFilters, Filters } from './filters'

type RenderOptions = {
  filters?: Filters
  delimiters?: string[]
}

function isNumeric (value: string) {
  return /^-?\d+$/.test(value)
}

export function renderString (template: string, props: object, options?: RenderOptions) {
  const flatProps: { [key: string]: any } = flat(props)
  let delimiters = ['{{', '}}']
  if (options?.delimiters) delimiters = options.delimiters

  return template.replaceAll(new RegExp(`\\${delimiters[0]}(.+?)${delimiters[1]}`, 'g'), (_, match: string) => {
    const [variable, ...filters] = match.split('|')
    const combinedFilters: Filters = { ...defaultFilters, ...options?.filters }
    let variableValue = flatProps[variable.trim()]

    filters
      .map(filter => filter.trim())
      .forEach(filter => {
        const [filterMethod, ...args] = filter.split(':')
        let parsedArgs: any[] | undefined

        if (args.length > 0) {
          parsedArgs = args[0].split(',')
            .map(arg => arg.trim())
            .map(arg => isNumeric(arg) ? parseInt(arg) : arg)
        }

        variableValue = combinedFilters[filterMethod]
          ? combinedFilters[filterMethod](variableValue, parsedArgs, variable.trim())
          : variableValue
      })

    return variableValue
      ? variableValue.toString()
      : "undefined"
  })
}

export function renderObject <T> (object: object, props: object, options?: RenderOptions): T {
  const cloned = cloneDeep()(object)

  function recursive (obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        recursive(obj[key])
      }

      else if (typeof obj[key] === 'string') {
        obj[key] = renderString(obj[key], props, options)
      }
    }
  }

  recursive(cloned)
  return cloned as T
}
