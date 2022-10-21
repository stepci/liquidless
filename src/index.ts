import flat from 'flat'
import cloneDeep from 'rfdc'
import { defaultFilters, Filters } from './filters'

type RenderOptions = {
  filters?: Filters
}

function renderString (template: string, props: object, options?: RenderOptions): string {
  const flatProps: { [key: string]: any } = flat(props)

  return template.replaceAll(/{{(.+?)}}/g, (a, match: string) => {
    const [variable, ...filters] = match.split('|')
    const combinedFilters: Filters = { ...defaultFilters, ...options?.filters }
    let variableValue = flatProps[variable.trim()]

    filters
      .map(filter => filter.trim())
      .forEach(filter => {
        const [filterMethod, ...args] = filter.split(':')
        let parsedArgs: any[] | undefined

        if (args.length > 0) {
          parsedArgs = args[0].split(',').map(arg => JSON.parse(arg.trim()))
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

function renderObject (template: object, props: object, options?: RenderOptions): object {
  const cloned = cloneDeep()(template)

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
  return cloned
}

// This is just some boilerplate code
export function renderTemplate (template: string | object, props: object, options?: RenderOptions): string | object | never {
  if (typeof template === 'object') {
    return renderObject(template, props, options)
  }

  if (typeof template === 'string') {
    return renderString(template, props, options)
  }

  throw new Error('Expected a string or a object, got: ' + typeof template)
}
