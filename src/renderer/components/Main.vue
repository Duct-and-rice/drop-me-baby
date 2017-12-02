<template lang="pug">
.container
    expanded-navbar
</template>

<script>
console.log(require('./index.js').default)
export default {
    name: 'index',
    data: () => {
        return {}
    },
    methods: {
        open (link) {
            this.$electron.shell.openExternal(link)
        }
    },
    components: {
        'expanded-navbar': require('./ExpandedNavbar').default
    }
}
</script>

<style scoped>
</style>
