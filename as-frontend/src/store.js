import Vue from 'vue'
import Vuex from 'vuex'

import { createProvider } from './vue-apollo'
const provide = createProvider().provide()
const apolloClient = provide.$apolloProvider.defaultClient

Vue.use(Vuex)

import LOGGED_IN_USER from '@/graphql/LoggedInUser.gql'
import ALL_SUBJECTS_FOR_STUDENT from '@/graphql/SubjectsStudent.gql'
import USER_STUDENT from '@/graphql/UserStudentById.gql'


export default new Vuex.Store({
  state: {
    userId: null,
    db: null,
    myData: null,

    lernLevels: {
      history: {
        verstehen: {
          bk: 3,
          gk: 5,
          ak1: 8,
          ak2: 7
        },
        lesen: {
          bk: 1,
          gk: 2,
          ak1: 8,
          ak2: 4
        },
        schreiben: {
          bk: 6,
          gk: 4,
          ak1: 3,
          ak2: 0
        },
        sprechen: {
          bk: 8,
          gk: 4,
          ak1: 2,
          ak2: 1
        }
      }
    }
  },
  mutations: {
    setUserId (state, value) {
      state.userId = value
    },
    logout (state) {
      state.userId = null
    },

    setLernLevel (state, p) {
      state.lernLevels[p.subject][p.competence][p.level] = p.value
    },

    setDb (state, db) {
      state.db = db
    },
    setMyData (state, data) {
      state.myData = data
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
    async getUserId ({ self, state, dispatch }) {
      await dispatch('setUserId')
      return state.userId
    },

    // ------------------ SUBJECTS, AREAS, ETC

    async setApolloDataToStore({ commit }) {
      return new Promise((resolve, reject) => {
        apolloClient
          .query({ query: ALL_SUBJECTS_FOR_STUDENT })
          .then(response => {
            const subjects = JSON.parse(JSON.stringify(response.data.allSubjects))

            let areas = {}
            subjects.forEach((subject) => {
              if (!areas[subject.area.slug]) {
                areas[subject.area.slug] = []
              }
              areas[subject.area.slug].push(subject)
            })

            const db = {
              areas: areas,
              subjects: subjects
            }

            commit('setDb', db)
            resolve()
          })
          .catch((error) => {
            console.error(error)
            reject()
          })
      })
    },
    async getDb({ self, state, dispatch }) {
      if (!state.db) {
        await dispatch('setApolloDataToStore')
      }
      return state.db
    },
    async forceGetDb({ self, state, dispatch }) {
      await dispatch('setApolloDataToStore')
      return state.db
    },

    // --------------------- USER INFO

    async setApolloUserToStore({ self, state, dispatch, commit }) {
      return new Promise((resolve, reject) => {
        apolloClient
          .query({
            query: USER_STUDENT,
            variables: {
              id: state.userId
            },
          })
          .then(response => {
            const myData = JSON.parse(JSON.stringify(response.data.User))
            commit('setMyData', myData)
            resolve()
          })
          .catch((error) => {
            console.error(error)
            reject()
          })
      })
    },
    async getUserData({ self, state, dispatch }) {
      if (!state.userId) {
        await dispatch('setUserId')
      }
      if (!state.myData) {
        await dispatch('setApolloUserToStore')
      }
      return state.myData
    },
    async forceGetUserData({ self, state, dispatch }) {
      await dispatch('setUserId')
      await dispatch('setApolloUserToStore')
      return state.myData
    }

  }
})
