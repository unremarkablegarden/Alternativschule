<template lang="pug">
  #subjectslist
    div(v-if='loading')
      h1 Loading...
      //- subjects ...
    el-card(v-else).subjects
      div(slot="header").header
        span Meine Schüler
      el-collapse(v-model='activeSubjects')
        el-collapse-item(:title='subject.name', :name='subject.name', v-for='subject in mySubjects.teachesSubjects', :key='subject.name').subject
          el-card
            StudentList(:students='subject.students', :subjectId='subject.id')
</template>

<script>
import SUBJECTS_BY_USER from '@/graphql/SubjectsByUser.gql'

export default {
  name: 'subjectslist',
  data () {
    return {
      activeSubjects: [],
      loading: true
    }
  },

  computed: {
    userId () {
      return localStorage.getItem('userId')
    }
  },

  apollo: {
    mySubjects: {
      query: SUBJECTS_BY_USER,
      variables () {
        return {
          id: localStorage.getItem('userId')
        }
      },
      update (response) {
        // simplify the response
        let teacher = JSON.parse(JSON.stringify(response.User))
        // add full names to students
        teacher.teachesSubjects.forEach((subj) => {
          subj.students.forEach((stud) => {
            stud.fullName = stud.firstname + ' ' + stud.surname
          })
        })
        return teacher
      },
      result (result) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass">
  .el-card__body > .el-collapse:first-child
    border-top: 0 !important
  .el-card__body > .el-collapse:last-child
    border-bottom: 0 !important

  #subjectslist
    .header
      font-weight: bold
      text-transform: uppercase
      font-size: 0.75em
      letter-spacing: 0.03em
    .subject
      .el-collapse-item__header
        font-size: 1em
        font-weight: normal
    // height: 2em
    // .subject-wrapper
    //   margin-bottom: 1em
    // .el-card__body
    //   padding: 0 20px
    // .el-collapse, .el-collapse-item__header
    //   border: 0 !important
</style>
