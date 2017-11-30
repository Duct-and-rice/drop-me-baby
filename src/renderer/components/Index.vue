<template lang="pug">
    #wrapper
        | a
</template>

<script>
  export default {
      name: 'index',
      methods: {
          open (link) {
              this.$electron.shell.openExternal(link)
          }
      }
  }
</script>

<style></style>
