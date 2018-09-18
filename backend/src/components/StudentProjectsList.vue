<template lang="pug">
  #studentprojectslist
    .title Projekte
    .projects(v-if='!loading')
      div(v-if='projects.length')
        .project(v-for='(project, index) in projects', :key='project.slug')
          icon(icon='doc')
          | {{ project.name }}
        //- ul(v-if='projects.length')
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
  .projects
    margin: 3px 0 0 5px
  .project
    padding: 3px 0
    svg
      width: 16px
      height: 16px
      transform: translate(-4px, 2.5px)
</style>
