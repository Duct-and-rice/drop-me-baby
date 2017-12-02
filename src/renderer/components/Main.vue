<template lang="pug">
.container
    expanded-navbar
</template>

<script>
import {componentLoader} from '.'
export default {
    name: 'main',
    data: () => {
        return {}
    },
    methods: {
        open (link) {
            this.$electron.shell.openExternal(link)
        }
    },
    components: componentLoader(['ExpandedNavbar'])
}
</script>

<style scoped>
</style>
