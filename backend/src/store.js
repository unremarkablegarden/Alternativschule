import Vue from 'vue'
import Vuex from 'vuex'

import { createProvider } from './vue-apollo'
// const provide = createProvider().provide()
const provide = createProvider()
// console.log(provide)
const apolloClient = provide.defaultClient
Vue.use(Vuex)

import LOGGED_IN_USER from '@/graphql/LoggedInUser.gql'
import USER_TYPE_BY_ID from '@/graphql/UserTypeById.gql'

export default new Vuex.Store({
  state: {
    userId: null,
    userType: null
  },
  mutations: {
    setUserId (state, value) {
      state.userId = value
    },
    setUserType (state, value) {
      state.userType = value
    },
    logout (state) {
      state.userId = null
    }
  },
  getters: {
    getUserId: state => state.userId
  },
  actions: {
    async logoutAction({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        resolve()
      })
    },
    async setUserId ({ commit }) {
      return new Promise((resolve, reject) => {
        apolloClient
          .query({ query: LOGGED_IN_USER })
          .then(response => {
            commit('setUserId', response.data.loggedInUser.id)
            resolve()
          })
      })
    },
    async setUserType ({ commit }, userId) {
      return new Promise((resolve, reject) => {
        apolloClient
          .query({
            query: USER_TYPE_BY_ID,
            variables: {
              userId: userId
            }
          })
          .then(response => {
            // console.log('--store---');
            // console.log(response.data.User.userType)
            // console.log('---------');
            commit('setUserType', response.data.User.userType)
            resolve()
          })
      })
    },
    async getUserId ({ self, state, dispatch }) {
      if (!state.userId) {
        await dispatch('setUserId')
      }
      return state.userId
    },
    async getUserType ({ self, state, dispatch }, userId) {
      if (!state.userType) {
        await dispatch('setUserType', userId)
      }
      return state.userType
    }
  }
})
