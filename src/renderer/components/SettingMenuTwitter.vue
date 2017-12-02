<template lang="pug">
setting-menu(title="Twitter")
    form(:class="{'form-inline': !isExpanded}")
        .form-group.mb-1.mr-1
            label.text-light(:class="{'mr-sm-2': !isExpanded}" for="account") Account
            select.form-control.custom-select#account(
                v-model="selectedAccount"
                v-if="isExpanded")
                option(v-for="account of twitterAccounts" :value="account") {{ account.id }}
            label.text-light(v-if="!isExpanded") : 
                span.ml-1 @{{ selectedAccount }}

        .form-group.mb-1.mr-1
            label.text-light(:class="{'mr-sm-2': !isExpanded}" for="num") Images
            input.form-control#num(
                type="number"
                v-model="imageNum"
                v-if="isExpanded")
            label.text-light(v-if="!isExpanded") : 
                span.ml-1 {{ imageNum }}
</template>

<script>
import {componentLoader} from '.'
import {mapState} from 'vuex'
export default {
    name: 'setting-menu-twitter',
    props: {
        isExpanded: Boolean
    },
    mounted () {
        this.selectedAccount = this.twitterAccounts[0]
    },
    computed: {
        ...mapState('twitter', {
            twitterAccounts: state => state.accounts
        })
    },
    data: () => {
        return {
            imageNum: 4,
            selectedAccount: ''
        }
    },
    components: componentLoader(['SettingMenu'])
}
</script>

<style scoped>
</style>
