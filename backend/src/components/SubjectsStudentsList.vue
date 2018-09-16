<template lang="pug">
  #subjectslist
    div(v-if='loading')
      Loading
    el-card(shadow='never', v-else).subjects
      div(slot="header").header
        span Meine Schüler*innen
      el-collapse(v-model='activeSubjects')
        el-collapse-item(v-for='subject in mySubjects.teachesSubjects', :key='subject.name', :title='subject.name', :name='subject.name', v-if="allMyStudents[subject.slug]").subject
          template(slot='title')
            icon(icon='people')
            | &nbsp;
            | {{ subject.name }}
            span.right.count
              | {{ subject.students.length }}&nbsp;&nbsp;
          el-card(shadow='never')
            //- StudentList(:students='allMyStudents[subject.slug]', :subjectId='subject.id')
            StudentList(:students='subject.students', :subjectId='subject.id')
</template>

<script>
import SUBJECTS_BY_USER from '@/graphql/SubjectsByUser.gql'

export default {
  name: 'subjectslist',
  data () {
    return {
      activeSubjects: [],
      loading: true,
      allMyStudents: {}
    }
  },

  computed: {
    userId () {
      return localStorage.getItem('userId')
    }
  },

  methods: {
    myStudents (subject) {
      return subject.students
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
        // teacher.teachesSubjects.forEach((subj) => {
        //   subj.students.forEach((stud) => {
        //     stud.fullName = stud.firstname + ' ' + stud.surname
        //   })
        // })
        // teacher.teachesProjects.forEach((proj) => {
        //   proj.students.forEach((stud) => {
        //     stud.fullName = stud.firstname + ' ' + stud.surname
        //   })
        // })
        return teacher
      },
      result (result) {
        // fill out allMyStudents with student objects based on which classes the teacher owns, that the students have added
        result.data.User.teachesProjects.forEach(p => {
          if ( ! this.allMyStudents.hasOwnProperty(p.subject.slug)) {
            this.allMyStudents[p.subject.slug] = []
          }
          p.students.forEach(s => {
            if (! this.allMyStudents[p.subject.slug].find(n => n.id === s.id)) {
              this.allMyStudents[p.subject.slug].push(s)
            }
          })
        })
        // console.log(this.allMyStudents)
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
    .el-collapse-item__header
      .sli-svg
        transform: scale(0.8) translate(0px, 6px)

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
