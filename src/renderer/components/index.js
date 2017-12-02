export function componentLoader (list) {
    return (list.map(c => require('/' + c).default).reduce((components, component) => {
        components[component.name] = component
        return components
    }, {}))
}
