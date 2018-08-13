<template lang="pug">
.wrapper
  .loading(v-if='!currentSubjectData') Loading...
  div(v-else)
    .guibox.columns
      .column.is-5.is-offset-1
        planet(:subject='currentSubjectData.slug')
        .button(@click='editSubject("add", currentSubjectData.id)', v-if='availableSubject') Hinzufugen
        .button(v-else, @click='editSubject("remove", currentSubjectData.id)') Löschen

      .column.is-4.info.is-offset-1
        h1 Planet: {{ currentSubject }}
        .level
          span GK
          span BK
          span AK1
          span AK2
          span(v-for='level in currentSubjectData.tutorlevels') {{ level }})
        .teacher Lehrer: {{ currentSubjectData.teachers[0].firstname }}
          //- span(v-for='')
            | {{ teacher.username }}
        //- .competences Kompetenzen:
        .description
          //- | {{ currentSubjectData.description }}
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</template>

<script>
import planet from '@/components/areas/planet.vue'
export default {
  components: { planet },
  data () {
    return {
      db: null,
      subjects: null,
      currentSubjectData: null,
      hidePlanet: true,
      subjects: null,
      myData: null,
      loading: true,
      availableSubject: true
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
      this.availableSubject = !this.availableSubject
      // console.log(method)
      // console.log(subjectId)
      console.log(this.myData);
      console.log(this.db);




      if (method == 'add') {
        // console.log(this.db.subjects.find(o => o.id === subjectId));
      }
      if(method == 'remove') {
        // this.myData.studiesSubjects.find(o => o.id === subjectId)
      }
    },
    getDb () {
      this.$store.dispatch('getDb')
        .then((response) => {
          this.db = response
          // console.log(response)
          this.currentSubjectData = response.subjects.find(subject => subject.slug === this.currentSubject)

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
  .hidePlanet
    display: none
  .guibox
    align-items: center
    .planet
      width: 100%
      margin-bottom: 4em
    .level
      display: block
      margin-bottom: 0
      span
        &::after
          content: ' –'
          margin: 0 .5em 0 .2em
        &:last-child::after
          content: ''
    .teacher
      margin-bottom: 1em
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
    h1
      text-transform: capitalize
      color: $teal
      font-weight: bold
</style>
