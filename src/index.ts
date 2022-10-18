import flat from 'flat'
import { defaultFilters, Filters } from './filters'

type RenderOptions = {
  filters: Filters
}

function renderString (template: string, props: object, { filters: customFilters }: RenderOptions): string {
  const flatProps: { [key: string]: any } = flat(props)

  return template.replaceAll(/{{(.+?)}}/g, (a, match: string) => {
    const [variable, ...filters] = match.split('|')
    const combinedFilters: Filters = { ...defaultFilters, ...customFilters }
    let variableValue = flatProps[variable.trim()]

    filters
      .map(filter => filter.trim())
      .forEach(filter => {
        const [filterMethod, ...args] = filter.split(':')
        let parsedArgs: any[] | undefined

        if (args.length > 0) {
          parsedArgs = args[0].split(',').map(arg => JSON.parse(arg.trim()))
        }

        variableValue = combinedFilters[filterMethod](variableValue, parsedArgs)
      })

    return variableValue.toString()
  })
}

function renderObject (template: object, props: object, { filters }: RenderOptions): object {
  const cloned = { ...template }

  function recursive (obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        recursive(obj[key])
      }

      else if (typeof obj[key] === 'string') {
        obj[key] = renderString(obj[key], props, { filters })
      }
    }
  }

  recursive(cloned)
  return cloned
}

// This is just some boilerplate code
export function renderTemplate (template: string | object, props: object, { filters }: RenderOptions): string | object | never {
  if (typeof template === 'object') {
    return renderObject(template, props, { filters })
  }

  if (typeof template === 'string') {
    return renderString(template, props, { filters })
  }

  throw new Error('Expected a string or a object, got: ' + typeof template)
}
