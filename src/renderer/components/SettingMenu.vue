<template lang="pug">
.container-fluid
    .navbar-brand {{ title }}
    slot
</template>

<script>
export default {
    name: 'setting-menu',
    props: {
        title: String
    },
    data: () => {
        return {
        }
    }
}
</script>

<style scoped>
</style>
