<template lang="pug">
.container
    expanded-navbar
</template>

<script>
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
