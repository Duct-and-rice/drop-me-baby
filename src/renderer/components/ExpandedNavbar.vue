<template lang="pug">
.navbar.navbar-expand-lg.fixed-top.navbar-dark.p-0.bg-primary(
    :class="{expanded: isNavbarExpanded}",
    ref="navbar")
    .container-fluid.align-self-stretch.d-flex.flex-column.justify-content-start
        .row.w-100
            .col
                file-browser
        .row.align-self-stretch.m-0.w-100.flex-row
            .col.no-gutters.bg-primary
                setting-menu-2ch(:is-expanded="isNavbarExpanded")
            .col.no-gutters.bg-dark
                setting-menu-twitter(:is-expanded="isNavbarExpanded")
</template>

<script>
import {componentLoader} from '.'
import {mapState} from 'vuex'
export default {
    name: 'expanded-navbar',
    mounted () {
        this.initialHeight = this.$refs.navbar.offsetHeight
    },
    data: () => {
        return {
            initialHeight: 0
        }
    },
    computed: {
        ...mapState('navbar', {
            isNavbarExpanded: state => state.isExpanded
        })
    },
    components: componentLoader([
        'SettingMenuTwitter',
        'SettingMenu2ch',
        'FileBrowser'])
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
