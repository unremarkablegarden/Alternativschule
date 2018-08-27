<template lang="pug">
  #selfEvaluations
    .title Kompetenzen
    .evals(v-if='selfEvaluations')
      el-tabs(type='card', :loading='loading')
        //- xmp {{ competences }}
        //- xmp {{ subjectLevels }}
        el-tab-pane(v-for='(level, index) in subjectLevels', :key='level', :label='level')
          .eval(v-for='e in competences', v-if='competencesLoaded')
            strong {{ e.name }}
            .circles
              .circle(v-for='val in [1,2,3,4,5,6,7,8,9,10]', :class='{ active : (val == getEvalValue(e.id, level)) }', @click='setEvalValue(e.id, level, val)')
                .inner
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'studentselfevaluations',
  props: ['subjectId', 'studentId'],
  data () {
    return {
      loading: true,
      competencesLoaded: false,
      evalsByLevel: [
        {
          level: 'BK',
          data: []
        },
        {
          level: 'GK',
          data: []
        },
        {
          level: 'AK',
          data: []
        },
        {
          level: 'AK1',
          data: []
        },
        {
          level: 'AK2',
          data: []
        }
      ]
    }
  },

  methods: {

    getEvalValue (competenceId, level) {
      let returnVal
      // subject and student set in query
      // filter by comp ID and level
      const data = this.selfEvaluations.filter(o => o.level === level)
      if (data) {
        const comp = data.find(o => o.competence.id === competenceId)
        if (comp) { returnVal = comp.value}
        else { returnVal = 0 }
      } else {
        returnVal = 0
      }
      return returnVal
    },

    setEvalValue (competenceId, level, val) {
      if (this.hasEvalValue(competenceId, level)) {
        this.updateEvalValue(competenceId, level, val)
      } else {
        this.createEvalValue(competenceId, level, val)
      }
    },

    updateEvalValue (competenceId, level, val) {
      const data = this.selfEvaluations.filter(o => o.level === level)
      const comp = data.find(o => o.competence.id === competenceId)

      this.$apollo.mutate({
        mutation: gql`mutation ($id: ID!, $value: Int!) {
          updateEvaluation(id: $id, value: $value) {
            id
            value
          }
        }`,
        variables: {
          id: comp.id,
          value: val
        },
      }).then((data) => {
        console.log(data)
        this.msg('success', 'Evaluation saved')
      }).catch((error) => {
        console.error(error)
        this.msg('error', error)
      }).then(() => {
        this.loading = false
      })
    },

    createEvalValue (competenceId, level, val) {
      // type Evaluation @model {
      //   id: ID! @isUnique
      //   value: Int! # max 10
      //   student: User! @relation(name: "StudentSelfEvaluation")
      //   competence: Competence! @relation(name: "CompetenceEvaluation")
      //   subject: Subject! @relation(name: "EvaluationSubject")
      //   level: Levels!
      // }

      // props: ['subjectId', 'studentId'],

      this.$apollo.mutate({
        mutation: gql`mutation ($value: Int!, $studentId: ID!, $competenceId: ID!, $subjectId: ID!, $level: Levels!) {
          createEvaluation(value: $value, studentId: $studentId, competenceId: $competenceId, subjectId: $subjectId, level: $level) {
            id
            value
          }
        }`,
        variables: {
          value: val,
          studentId: this.studentId,
          competenceId: competenceId,
          subjectId: this.subjectId,
          level: level
        },
      }).then((data) => {
        this.$apolloProvider.defaultClient.reFetchObservableQueries()
        console.log(data)
        this.msg('success', 'Evaluation saved')
      }).catch((error) => {
        console.error(error)
        this.msg('error', error)
      }).then(() => {
        this.loading = false
      })
    },

    hasEvalValue (competenceId, level) {
      let returnVal
      const data = this.selfEvaluations.filter(o => o.level === level)
      if (data) {
        const comp = data.find(o => o.competence.id === competenceId)
        if (comp) { returnVal = true }
        else { returnVal = false }
      } else {
        returnVal = false
      }
      return returnVal
    },

    sortLevels (arrayToSort) {
      // useage: levels = this.sortLevels(levels)
      let arrayOrder = ['BK', 'GK', 'AK', 'AK1', 'AK2']
      let newArray = []
      arrayOrder.forEach((level) => {
        if (arrayToSort.includes(level)) {
          newArray.push(level)
        }
      })
      return newArray
    },

    msg (type, message) {
      this.$message({
         type: type,
         message: message
      })
    }
  },

  apollo: {
    subjectLevels: {
      query: gql`query ($subjectId: ID!) {
        Subject(id: $subjectId) {
          levels
        }
      }`,
      variables () {
        return {
          subjectId: this.subjectId,
        }
      },
      update (result) {
        return this.sortLevels(result.Subject.levels)
      },
    },

    competences: {
      query: gql`query ($subjectId: ID!) {
        Subject(id: $subjectId) {
          competences {
            id
            slug
            name
          }
        }
      }`,
      variables () {
        return {
          subjectId: this.subjectId,
        }
      },
      update (result) {
        // console.log(result)
        return result.Subject.competences
      },
      result (res) {
        this.competencesLoaded = true
      }
    },

    selfEvaluations: {
      query: gql`query ($subjectId: ID!, $studentId: ID!) {
        User(id: $studentId) {
          selfEvaluations(filter: {
            subject: {
              id: $subjectId
            }
          }) {
            id
            value
            level
            competence {
              name
              id
            }
            subject {
              name
            }
            student {
              username
            }
          }
        }
      }`,
      variables () {
        return {
          subjectId: this.subjectId,
          studentId: this.studentId
        }
      },
      update (result) {
        const evaluations = result.User.selfEvaluations
        // clear it
        this.evalsByLevel.forEach(e => {
          e.data = []
        })
        // set it
        evaluations.forEach(e => {
          this.evalsByLevel.find(o => o.level === e.level).data.push(e)
        })
        this.loading = false
        return evaluations
      },
      result (result) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  $c1: #FCB714
  $c2: #EC2126
  $c3: #653393
  $c4: #48A7D6
  $c5: #0B643A

  .title
    font-weight: bold
    margin-bottom: 1em
  .circles
    display: flex
    justify-content: space-between
    margin: 0.5em 0
  .circle
    height: 24px
    width: 24px
    border-radius: 20px
    border: 2px white solid
    opacity: 0.7
    cursor: pointer
    &.active
      border: 1px black solid
      opacity: 1
      cursor: default
    .inner
      height: 22px
      width: 22px
      border: 2px white solid
      border-radius: 20px
    &:nth-child(1), &:nth-child(2)
      .inner
        background: $c1
    &:nth-child(3), &:nth-child(4)
      .inner
        background: $c2
    &:nth-child(5), &:nth-child(6)
      .inner
        background: $c3
    &:nth-child(7), &:nth-child(8)
      .inner
        background: $c4
    &:nth-child(9), &:nth-child(10)
      .inner
        background: $c5


</style>

<style lang="sass">
  #selfEvaluations .el-tabs__item
    height: 32px
    font-size: 12px
</style>
