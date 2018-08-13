<template lang="pug">
.wrapper
  .loading(v-if='!currentSubjectData') Loading...
  div(v-else)
    .guibox.columns
      .column.is-5.is-offset-1
        planet(:subject='currentSubjectData.slug') 
        .button Hinzufugen
      .column.is-4.info.is-offset-1
        h1 Planet: {{ currentSubject }}
        .level
          span GK
          span BK
          span AK1
          span AK2
          span(v-for='level in currentSubjectData.tutorlevels') {{ level }}) (fix)
        .teacher Lehrer: (fix)
          span(v-for='teacher in currentSubjectData.teachers') 
            | {{ teacher.username }} 
        .competences 
          | Kompetenzen: 
          br
          | Lorem ipsum dolor
        .description 
          | {{ currentSubjectData.description }}
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
      planetHide: true
    }
  },
  mounted () {
    this.getDb()
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
    getDb () {
      this.$store.dispatch('getDb')
        .then((response) => {
          this.db = response
          console.log(response)
          this.currentSubjectData = response.subjects.find(subject => subject.slug === this.currentSubject)
        })
    },
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"  
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
          content: '–'
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
