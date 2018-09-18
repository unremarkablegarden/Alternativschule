<template lang="pug">
  #subjectslist
    el-card(v-loading='$apollo.loading', shadow='never').subjects
      div(slot="header").header
        span Meine Fächer
      el-collapse(v-model='activeSubjects', v-if='!loading')
        el-collapse-item(v-for='subject in mySubjects.teachesSubjects', :key='subject.name', :title='subject.name', :name='subject.name').subject
          template(slot='title')
            icon(icon='docs')
            | &nbsp;
            | {{ subject.name }}
            span.right.count
              | {{ countProjectsBySubject(subject.slug) }}&nbsp;&nbsp;&nbsp;
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
        const subs = JSON.parse(JSON.stringify(response.User))
        subs.teachesProjects.forEach(p => {
          p.levels = this.$sortLevels(p.levels)
        })
        return subs
      },
      result (result) {
        this.loading = false
      }
    }
  },
  methods: {
    countProjectsBySubject (slug) {
      const projects = this.mySubjects.teachesProjects.filter(s => s.subject.slug === slug)
      if (projects.length) {
        return projects.length
      } else {
        return 0
      }
    }
  }

}
</script>

<style lang="sass">
#subjectslist .el-collapse-item__header
  .sli-svg
    transform: scale(0.8) translate(0px, 6px)
  .count
    font-size: 0.7em
    background: #f0f0f0
    width: 25px
    text-align: center
    display: flex
    justify-content: center
    align-items: center
    padding-left: 8px
    height: 20px
    margin-right: 15px
    margin-top: 14px
    border-radius: 10px
    // font-weight: bold
</style>

<style lang="sass" scoped>
  .description
    font-size: 1em
    line-height: 1.66em
  .subjects
    min-height: 30vh
  .box
    padding-top: 1em
    padding-bottom: 1em
</style>
