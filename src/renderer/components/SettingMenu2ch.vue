<template lang="pug">
setting-menu(title="2ch系掲示板")
    form(:class="{'form-inline': !isExpanded}")
        .form-group.mb-1.mr-1
            label.text-light(:class="{'mr-sm-2': !isExpanded}" for="account") BBS
            select.form-control.custom-select#account(
                v-model="selectedBoardIndex"
                @change="fetchThreads"
                v-if="isExpanded")
                option(v-for="(board, index) in bbsList" :value="index") {{ board.name }}
                option(:value="'others'") Others...
            label.text-light(v-if="!isExpanded") :
                span.ml-1(v-if="selectedBoard.name") {{ selectedBoard.name }}

        .form-group.mb-1.mr-1(v-if="!isOtherBoard")
            label.text-light(:class="{'mr-sm-2': !isExpanded}" for="num") Thread
            select.form-control.custom-select#account(
                v-model="selectedThreadIndex"
                v-if="isExpanded")
                option(v-for="(thread, index) in threads" :value="index") {{ thread.title }}
            label.text-light(v-if="!isExpanded") :
                span.ml-1(v-if="selectedThread.title") {{ selectedThread.title }}
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {componentLoader} from '.'
export default {
    name: 'setting-menu-2ch',
    props: {
        isExpanded: Boolean
    },
    mounted () {
    },
    methods: {
        getBoardByIndex (index) {
            return this.bbsList[index]
        },
        ...mapMutations('bbs', {
            selectThread: 'SELECT_THREAD'
        })
    },
    data: () => {
        return {
            selectedBoardIndex: 0
        }
    },
    computed: {
        isOtherBoard () {
            return this.selectedBoard === 'others'
        },
        isExpandedAndOtherBoard () {
            return this.isExpanded && this.isOtherBoard
        },
        fetchThreads () {
            this.$store.dispatch('bbs/fetchThreads', this.selectedBoardIndex)
        },
        threads () {
            return this.selectedBoard.threads || []
        },
        selectedBoard () {
            return this.bbsList[this.selectedBoardIndex]
        },
        selectedThreadIndex: {
            get () {
                return this.selectedBoard.threadIndex || 0
            },
            set (index) {
                this.selectThread(index)
            }
        },
        ...mapState('bbs', {
            bbsList: 'bbsList'
        })
    },
    components: componentLoader(['SettingMenu'])
}
</script>

<style scoped>
</style>
