<template lang="pug">
.wrapper.subjectarea
  .loading(v-if='!currentSubjectData')
    Loading
  div(v-else)
    .guibox.columns
      .column.is-5.is-offset-1
        planet(:subject='currentSubjectData.slug', :class="{ 'hidePlanet' : hidePlanet }")
        .button(@click='editSubject("add", currentSubjectData.id)', v-if='availableSubject') Hinzuf�gen
        //- p(v-else) Hinzugefügt
        //- .button(v-else, @click='editSubject("remove", currentSubjectData.id)') Löschen

      .column.is-4.info.is-offset-1
        h1 Planet: {{ currentSubject }}
        ul.levels
          li(v-for='level in subjectLevels') {{ level }}
        .teacher(v-if='currentSubjectData.teachers.length')
          strong Lehrer:&nbsp;
          span(v-for='teacher in currentSubjectData.teachers')
            | {{ teacher.firstname }}
            //- {{ teacher.surname }}
        .description
          | {{ currentSubjectData.description }}
</template>

<script>
import planet from '@/components/areas/planet.vue'
import gql from 'graphql-tag'

export default {
  components: { planet },
  data () {
    return {
      db: null,
      subjects: null,
      currentSubjectData: null,
      hidePlanet: false,
      subjects: null,
      myData: null,
      loading: true,
      availableSubject: true,
      subjectLevels: null
    }
  },
  mounted () {
    this.getDb()
    this.getMyData()
  },
  computed: {
    currentArea () {
      return this.$route.params.area
    },
    currentSubject () {
      return this.$route.params.subject
    }
  },
  methods: {
    editSubject (method, subjectId) {

      if (method == 'add') {
        const subject = this.db.subjects.find(o => o.id === subjectId)
        console.log('Add ' + subject.name + ' [' + subject.id + ']')
        const id = localStorage.getItem('userId')
        console.log(id)

        if (id) {
          this.$apollo.mutate({
            mutation: gql`mutation ($id: ID!, $subjectId: ID!) {
              addToStudentSubject(studentsUserId: $id, studiesSubjectsSubjectId: $subjectId) {
                studentsUser {
                  id
                  username
                  studiesSubjects {
                    slug
                  }
                }
              }
            }`,
            variables: {
              id: id,
              subjectId: subject.id
            },
            update: (store, { data }) => {}
          }).then((data) => {
            this.$message({
               type: 'success',
               message: 'Planet hinzugefügt'
            })
            this.availableSubject = false
            this.hidePlanet = true
            this.$apolloProvider.defaultClient.reFetchObservableQueries()
            setTimeout(() => {
              // hack
              window.location.href = window.location.origin + '/solarsystem'
              // needs store updated
              // this.$router.push({ name: 'home' })
            }, 1000)
            console.log(data)
          }).catch((error) => {
            console.error(error)
            this.$message({
              type: 'error',
              message: error
            })
          })
        } // if id
      } // if add

      if(method == 'remove') {
        // this.myData.studiesSubjects.find(o => o.id === subjectId)
      }
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
    getDb () {
      this.$store.dispatch('getDb')
        .then((response) => {
          this.db = response
          // console.log(response)
          this.currentSubjectData = response.subjects.find(subject => subject.slug === this.currentSubject)
          this.subjectLevels = this.sortLevels(this.currentSubjectData.levels)
          // console.log(this.currentSubjectData)
        })
    },
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.myData = response
        this.subjects = response.studiesSubjects
        this.subjects.forEach((s) => {
          if (s.id == this.currentSubjectData.id) {
            this.availableSubject = false
          }
        })
        this.loading = false
      })
    },
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  .added
    color: white

  .planet
    transition: all 1200ms
    &.hidePlanet
      transition: all 1200ms
      transform: translateX(-1000px)
  .guibox
    align-items: center
    .planet
      width: 100%
      margin-bottom: 4em
    ul.levels
      display: block
      margin-bottom: 0
      display: flex
      margin-bottom: 1em
      li
        border: 1px solid #ffffff80
        border-radius: 3px
        padding: .6em .6em
        margin-right: .5em
        font-size: .8rem
        line-height: 1
    .teacher
      margin-bottom: 1em
      strong
        color: #fff
      span
        &::after
          content: ', '
        &:last-child::after
          content: ''
    .competences
      font-weight: bold
      margin-bottom: 2em
    .info
      text-align: left
      max-height: 90%
      overflow-x: hidden
      overflow-y: auto
    h1
      text-transform: capitalize
      color: $teal
      font-weight: bold
      font-size: 1.3em
      margin-bottom: .5em
</style>
