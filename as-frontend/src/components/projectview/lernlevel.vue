<template lang="pug">
#lernlevel
  //- div
    h2 {{ competence }}
    h2 {{ level }}
    h2 {{ currentSubject }}
  img(src="@/assets/gfx/graphs/lernlevel.svg")
  .select-level
    button(v-if='currentEvaluation', v-for="(item, i) in [1,2,3,4,5,6,7,8,9,10]", :class="{ 'is-selected' : (currentEvaluation.value === item) }", @click='levelChange(item)', :key="item")
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'lernlevel',
  props: ['competence', 'competenceId', 'level'],
  data () {
    return {
      value: 0,
      evaluations: null,
      subjectData: null,
      currentEvaluation: null
    }
  },
  watch: {
    competence () {
      // console.log('competence changed')
      this.setEvaluations()
    },
    level () {
      // console.log('level changed')
      this.setEvaluations()
    }
  },
  created () {
    this.$on('testEvent', val => {
      console.log('$on testEvent: ' + val)
    })
  },
  mounted () {
    this.getMyData()
    // console.log(this.competenceId)
  },
  methods: {
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.subjectData = response.studiesSubjects.find(o => o.slug === this.currentSubject)
        this.setEvaluations()
        this.loading = false
      })
    },
    setEvaluations () {
      this.evaluations = this.subjectData.evaluations.filter(o => o.level === this.level)
      // console.log(this.evaluations)
      this.setEvaluation()
    },
    setEvaluation () {
      this.currentEvaluation = this.evaluations.find(o => o.competence.slug === this.competence)
      if (!this.currentEvaluation) {
        console.log('no current eval')
        this.currentEvaluation = {
          value: 1,
          new: true
        }
      }
    },

    levelChange(value) {
      this.currentEvaluation.value = value
      if (this.currentEvaluation.new) {
        console.log('create new eval')
        this.createEvaluation(value)
      }
      else {
        console.log('update existing eval')
        this.updateEvaluation(value)
      }
    },


    createEvaluation (value) {
      this.$apollo.mutate({
        mutation: gql`mutation ($val: Int!, $studentId: ID!, $competenceId: ID!, $subjectId: ID!, $level: Levels!) {
          createEvaluation(studentId: $studentId, competenceId: $competenceId, subjectId: $subjectId, level: $level, value: $val) {
            value
            student {
              username
            }
            competence {
              slug
              id
            }
            subject {
              slug
            }
            level
          }
        }`,
        variables: {
          val: value,
          studentId: localStorage.getItem('userId'),
          competenceId: this.competenceId,
          subjectId: this.subjectData.id,
          level: this.level
        },
        update: (store, { data }) => {
          // this.$apolloProvider.defaultClient.reFetchObservableQueries()
          this.$parent.$emit('evalCreated', data.createEvaluation)
        }
      }).then((data) => {
        this.$message({
           type: 'success',
           message: 'Lernlevel Gespeichert'
        })
        window.location.reload(false)
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },

    updateEvaluation (value) {
      this.$apollo.mutate({
        mutation: gql`mutation ($id: ID!, $value: Int!) {
          updateEvaluation(id: $id, value: $value) {
            id
            value
            student {
              username
            }
            competence {
              slug
            }
            subject {
              slug
            }
            level
          }
        }`,
        variables: {
          id: this.currentEvaluation.id,
          value: value
        },
        update: (store, { data }) => {
          // this.$apolloProvider.defaultClient.reFetchObservableQueries()
        }
      }).then((data) => {
        this.$message({
           type: 'success',
           message: 'Lernlevel Gespeichert'
        })
        // console.log(data)
      }).catch((error) => {
        // console.error(error)
        this.$message({
          type: 'error',
          message: error
        })
      })

    }
  },
  computed: {
    currentSubject () {
      return this.$route.params.subject
    }
  }
}
</script>

<style lang="sass" scoped>
  #lernlevel
    position: relative
  .select-level
    position: absolute
    top: 47px
    left: -4px
    button
      height: 30px
      width: 30px
      border-radius: 15px
      border: 1px solid transparent
      background: none
      margin-right: 18.2px
      outline: none
      transition: border 200ms
      &:last-child
        margin-right: 0
      &:hover, &.is-selected
        border: 1px solid #fff
        cursor: pointer


</style>
