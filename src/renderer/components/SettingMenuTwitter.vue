<template lang="pug">
.container-fluid
    .navbar-brand Twitter
</template>

<script>
export default {
    name: 'setting-menu-twitter',
    mounted () {
        this.initialHeight = this.$refs.navbar.offsetHeight
    },
    data: () => {
        return {
            isNavbarExpanded: true,
            initialHeight: 0
        }
    },
    components: require('./index.js')
}
</script>

<style scoped>
.navbar {
    min-height: 0;
    transition: min-height 1s cubic-bezier(0.6, -0.28, 0.74, 0.05);
}
.navbar.expanded {
    min-height: 100%;
    transition: min-height 1s ease;
}
</style>
