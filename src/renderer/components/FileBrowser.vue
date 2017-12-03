<template lang="pug">
form.form-group.mt-2
    .input-group
        label.input-group-btn.m-0
            span.btn.btn-dark
                | Choose File
                input(type="file" @change="selectedFile")
        input.form-control(type="text" readonly :value="fileName")
</template>

<script>
export default {
    name: 'file-browser',
    data: () => {
        return {
            file: undefined
        }
    },
    computed: {
        fileName () {
            if (this.file) {
                if (this.file.name) {
                    return this.file.name
                }
            }
            return ''
        }
    },
    methods: {
        selectedFile (e) {
            e.preventDefault()
            let files = e.target.files
            this.file = files[0]
        }
    }
}
</script>

<style scoped>
input {
    display: none;
}
</style>
