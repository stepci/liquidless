import flat from 'flat'

// This is just some boilerplate code
export function renderTemplate (template: string | object, props: object) {
  const flatProps: {[key:string]: any} = flat(props)

  if (typeof template === 'object') {
    return {}
  }

  return template.replaceAll(/{{(.*)}}/g, (a, match) => flatProps[match])
}
