<template lang="pug">
  #subjectslist
    el-card(v-loading='$apollo.loading').subjects
      div(slot="header").header
        span Meine Fächer
      el-collapse(v-model='activeSubjects', v-if='!loading')
        el-collapse-item(:title='subject.name', :name='subject.name', v-for='subject in mySubjects.teachesSubjects', :key='subject.name').subject
          el-row
            el-col(:span='9')
              .description {{ subject.description }}
            el-col(:span='13', :offset='2')
              ProjectsList(:projects='mySubjects.teachesProjects', :subjectId='subject.id', :user='userId')
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
        // console.log(response.User)
        return JSON.parse(JSON.stringify(response.User))
      },
      result (result) {
        this.loading = false
        console.log(this.mySubjects)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .subjects
    min-height: 30vh
</style>
