const state = {
    isExpanded: true
}

const mutations = {
    EXPAND (state) {
        state.isExpanded = true
    },
    UNEXPAND (state) {
        state.isExpanded = false
    },
    TOGGLE (state) {
        state.isExpanded = !state.isExpanded
    }
}

const actions = {
    toggle ({commit, state}) {
        if (state.isExpanded) {
            commit('UNEXPAND')
        } else {
            commit('EXPAND')
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
