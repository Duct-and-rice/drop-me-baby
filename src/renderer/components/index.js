const files = require.context('.', false, /\.vue$/)
const components = {}

files.keys().map(key => files(key).default).forEach(component => {
    if (component) {
        components[component.name] = component
    }
})

export default components
