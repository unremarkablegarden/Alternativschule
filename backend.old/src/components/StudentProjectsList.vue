<template lang="pug">
  #studentprojectslist
    .title Projekten
    .projects(v-if='!loading')
      ul(v-if='projects.length')
        li(v-for='(project, index) in projects', :key='project.slug')
          | {{ project.name }}
      div(v-else)
        i (Keine)
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'studentprojectslist',
  props: ['subjectId', 'studentId'],
  data () {
    return {
      loading: true
    }
  },
  apollo: {
    projects: {
      query: gql`query ($subjectId: ID!, $studentId: ID!) {
        User(id: $studentId) {
          studiesProjects(filter: {
            subject: {
              id: $subjectId
            }
          }) {
            id
            name
            slug
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
        return result.User.studiesProjects
      },
      result (result) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .title
    font-weight: bold
  ul, li
    margin: 0
    padding: 0
  ul
    margin-top: 0.5em
    margin-left: 1.25em
</style>
