<template lang="pug">
  #subjectslist
    el-card(v-loading='$apollo.loading').subjects
      div(slot="header")
        span Meine Themen
      //- div
        xmp {{ mySubjects.teachesSubjects }}
      div(v-if='!loading')
        el-row(v-for='subject in mySubjects.teachesSubjects', :key='subject.name').subject
          el-collapse(v-model='activeSubjects')
            el-collapse-item(:title='subject.name', :name='subject.name')
              el-row
                el-col(:span='12')
                  .description {{ subject.description }}
                el-col(:span='12')
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
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .subjects
    min-height: 30vh
</style>
