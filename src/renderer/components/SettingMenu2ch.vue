<template lang="pug">
setting-menu(title="2ch系掲示板")
    form(:class="{'form-inline': !isExpanded}")
        .form-group.mb-1.mr-1
            label.text-light(:class="{'mr-sm-2': !isExpanded}" for="account") BBS
            select.form-control.custom-select#account(
                v-model="selectedBoard"
                v-if="isExpanded")
                option(v-for="board of boards" :value="board") {{ board.name }}
                option(:value="{url:'', name:'Others', others:true}") Others...
            label.text-light(v-if="!isExpanded") :
                span.ml-1(v-if="selectedBoard.name") {{ selectedBoard.name }}

        .form-group.mb-1.mr-1(v-if="!isOtherBoard")
            label.text-light(:class="{'mr-sm-2': !isExpanded}" for="num") Thread
            select.form-control.custom-select#account(
                v-model="selectedThread"
                v-if="isExpanded")
                option(v-for="(thread,i) in threads" :value="thread") {{ thread.title }}
            label.text-light(v-if="!isExpanded") :
                span.ml-1(v-if="selectedThread.title") {{ selectedThread.title }}
</template>

<script>
import {componentLoader} from '.'
export default {
    name: 'setting-menu-2ch',
    props: {
        isExpanded: Boolean
    },
    mounted () {
        this.selectedBoard = this.boards[0]
    },
    data: () => {
        return {
            selectedBoard: {url: '', name: ''},
            selectedThread: {url: '', title: ''},
            boards: [
                {url: 'yaruyomi', name: 'yaruyomi'}
            ]
        }
    },
    computed: {
        isOtherBoard () {
            return this.selectedBoard['others'] !== undefined
        },
        isExpandedAndOtherBoard () {
            return this.isExpanded && this.isOtherBoard
        },
        threads () {
            return Array.from({length: 100}, (v, k) => k).map(
                i => ({url: 'http://' + i, title: i})
            )
        }
    },
    components: componentLoader(['SettingMenu'])
}
</script>

<style scoped>
</style>
