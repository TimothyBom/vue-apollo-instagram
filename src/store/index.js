import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export default new Vuex.Store({
    state: {
        isLoggedIn: !!localStorage.getItem('jwtToken')
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn
    },
    actions: {
        getUserLogin({ commit }, payload) {
            commit(LOGIN)
            localStorage.setItem('jwtToken', payload.token)
        },
        getUserLogout({ commit }) {
            commit(LOGOUT)
            localStorage.removeItem('jwtToken')
        }
    },
    mutations: {
        [LOGIN] (state) {
            state.isLoggedIn = true
        },
        [LOGOUT] (state) {
            state.isLoggedIn = false
        }
    }
})