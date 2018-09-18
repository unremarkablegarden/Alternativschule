<template lang="pug">
  #selfEvaluations
    .title Kompetenzen
    .evals(v-if='selfEvaluations')
      el-tabs(type='border-card', :loading='loading', stretch)
        el-tab-pane(v-for='(level, index) in subjectLevels', :key='level', :label="level", :class='level')
          template(slot='label')
            | &nbsp;&nbsp;&nbsp;&nbsp;
            | {{ level }}
            | &nbsp;&nbsp;&nbsp;&nbsp;
          .eval(v-for='e in competences', v-if='competencesLoaded')
            strong {{ e.name }}
            span &nbsp;— {{ getEvalValue(e.id, level) }}/10
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
        return this.$sortLevels(result.Subject.levels)
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

  .BK .circle:nth-child(1) .inner
    background: #FCB814
  .BK .circle:nth-child(2) .inner
    background: #F7A318
  .BK .circle:nth-child(3) .inner
    background: #F38F1B
  .BK .circle:nth-child(4) .inner
    background: #EF7D1F
  .BK .circle:nth-child(5) .inner
    background: #ED7122
  .BK .circle:nth-child(6) .inner
    background: #EB6624
  .BK .circle:nth-child(7) .inner
    background: #E75328
  .BK .circle:nth-child(8) .inner
    background: #E4442B
  .BK .circle:nth-child(9) .inner
    background: #E0332E
  .BK .circle:nth-child(10) .inner
    background: #DC2031


  .GK .circle:nth-child(1) .inner
  	background: #ED1D25
  .GK .circle:nth-child(2) .inner
  	background: #DC1F32
  .GK .circle:nth-child(3) .inner
  	background: #CF223E
  .GK .circle:nth-child(4) .inner
  	background: #BE244B
  .GK .circle:nth-child(5) .inner
  	background: #B22654
  .GK .circle:nth-child(6) .inner
  	background: #A22961
  .GK .circle:nth-child(7) .inner
  	background: #962B6C
  .GK .circle:nth-child(8) .inner
  	background: #862D78
  .GK .circle:nth-child(9) .inner
  	background: #783084
  .GK .circle:nth-child(10) .inner
  	background: #653393

  .AK .circle:nth-child(1) .inner
  	background: #653594
  .AK .circle:nth-child(2) .inner
  	background: #6557A9
  .AK .circle:nth-child(3) .inner
  	background: #6672BA
  .AK .circle:nth-child(4) .inner
  	background: #6690CC
  .AK .circle:nth-child(5) .inner
  	background: #66A9DC
  .AK .circle:nth-child(6) .inner
  	background: #5AAFCF
  .AK .circle:nth-child(7) .inner
  	background: #479DAD
  .AK .circle:nth-child(8) .inner
  	background: #308881
  .AK .circle:nth-child(9) .inner
  	background: #207963
  .AK .circle:nth-child(10) .inner
  	background: #0B663D

  .AK1 .circle:nth-child(1) .inner
  	background: #653393
  .AK1 .circle:nth-child(2) .inner
  	background: #65429C
  .AK1 .circle:nth-child(3) .inner
  	background: #6554A7
  .AK1 .circle:nth-child(4) .inner
  	background: #6561AF
  .AK1 .circle:nth-child(5) .inner
  	background: #6670B9
  .AK1 .circle:nth-child(6) .inner
  	background: #657FC2
  .AK1 .circle:nth-child(7) .inner
  	background: #668ECB
  .AK1 .circle:nth-child(8) .inner
  	background: #669CD4
  .AK1 .circle:nth-child(9) .inner
  	background: #66AADD
  .AK1 .circle:nth-child(10) .inner
  	background: #66BCE8

  .AK2 .circle:nth-child(1) .inner
  	background: #47A7D6
  .AK2 .circle:nth-child(2) .inner
  	background: #3F9FC2
  .AK2 .circle:nth-child(3) .inner
  	background: #3997B1
  .AK2 .circle:nth-child(4) .inner
  	background: #3290A0
  .AK2 .circle:nth-child(5) .inner
  	background: #2C8990
  .AK2 .circle:nth-child(6) .inner
  	background: #25827F
  .AK2 .circle:nth-child(7) .inner
  	background: #1F7B6F
  .AK2 .circle:nth-child(8) .inner
  	background: #19745F
  .AK2 .circle:nth-child(9) .inner
  	background: #126D4F
  .AK2 .circle:nth-child(10) .inner
  	background: #0B663D

</style>

<style lang="sass">
  .el-tabs--border-card
    box-shadow: none !important
  #selfEvaluations .el-tabs__item
    height: 32px
    font-size: 12px
    line-height: 2.6em
</style>
