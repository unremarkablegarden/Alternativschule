<template lang="pug">
  #students
    el-card(v-loading='$apollo.loading').students
      div(slot="header")
        span Meine Schüler
      div(v-if='!loading')
        el-row(v-for='student in myStudents', :key='student.username').subject
          el-collapse(v-model='activeEl')
            el-collapse-item(:title='student.firstname', :name='subject.firstname')
              //- ProjectsList(:projects='mySubjects.teachesProjects', :subjectId='subject.id', :user='userId')
</template>

<script>
import STUDENTS_BY_TEACHER from '@/graphql/StudentsByTeacher.gql'

export default {
  name: 'subjectslist',
  data () {
    return {
      activeEl: [],
      loading: true
    }
  },

  computed: {
    userId () {
      return localStorage.getItem('userId')
    }
  },

  apollo: {
    myStudents: {
      query: STUDENTS_BY_TEACHER,
      variables () {
        return {
          id: localStorage.getItem('userId')
        }
      },
      update (response) {
        console.log('students')
        console.log(response)
        return JSON.parse(JSON.stringify(response.User))
      },
      result (result) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .students
    min-height: 30vh
</style>
