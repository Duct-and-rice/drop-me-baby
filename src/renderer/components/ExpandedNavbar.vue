<template lang="pug">
.navbar.navbar-expand-lg.fixed-top.navbar-dark.bg-primary.animated.bounce(
    :class="{expanded: isNavbarExpanded}",
    @click="isNavbarExpanded=!isNavbarExpanded"
    ref="navbar")
    .container
        .navbar-brand Drop Me Baby
</template>

<script>
export default {
    name: 'expanded-navbar',
    mounted () {
        this.initialHeight = this.$refs.navbar.offsetHeight
    },
    data: () => {
        return {
            isNavbarExpanded: true,
            initialHeight: 0
        }
    }
}
</script>

<style scoped>
.navbar {
    min-height: 0;
    transition: min-height 1s cubic-bezier(0.6, -0.28, 0.74, 0.05);
}
.navbar.expanded {
    min-height: 100%;
}
</style>
