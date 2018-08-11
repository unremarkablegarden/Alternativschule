import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lernLevels: {
      history: {
        understanding: {
          bk: 10,
          gk: 9,
          ak1: 8,
          ak2: 7
        },
        reading: {
          bk: 1,
          gk: 2,
          ak1: 3,
          ak2: 4
        }
      }
    }
  },
  mutations: {
    setLernLevel (state, p) {
      // subject, competence, level, value
      // console.log(payload)
      state.lernLevels[p.subject][p.competence][p.level] = p.value
    }
  },
  actions: {
  }
})
