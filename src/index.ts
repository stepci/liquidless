import flat from 'flat'
import { defaultFilters, Filters } from './filters'

function renderString (template: string, props: object, { filters: customFilters }: any): string {
  const flatProps: { [key: string]: any } = flat(props)

  return template.replaceAll(/{{(.+?)}}/g, (a, match: string) => {
    const [variable, ...filters] = match.split('|')
    const combinedFilters: Filters = { ...defaultFilters, ...customFilters }
    let variableValue = flatProps[variable.trim()]

    filters
      .map(filter => filter.trim())
      .forEach(filter => variableValue = combinedFilters[filter](variableValue))

    return variableValue
  })
}

// This is just some boilerplate code
export function renderTemplate (template: string | object, props: object, { filters }: any) {
  if (typeof template === 'object') {
    return {}
  }

  if (typeof template === 'string') {
    return renderString(template, props, { filters })
  }

  return new Error('Expected a string or a object, got: ' + typeof template)
}
