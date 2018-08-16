<template lang="pug">
.wrapper
  .loading(v-if='!currentSubjectData') Loading...
  div(v-else)
    .guibox.columns
      .column.is-5.is-offset-1
        planet(:subject='currentSubjectData.slug', :class="{ 'hidePlanet' : (hidePlanet == true) }")
        .button(@click='editSubject("add", currentSubjectData.id)', v-if='availableSubject') Hinzufugen
        .button(v-else, @click='editSubject("remove", currentSubjectData.id)') Löschen

      .column.is-4.info.is-offset-1
        h1 Planet: {{ currentSubject }}
        ul.levels
          li(v-for='level in subjectLevels') {{ level }}
        .teacher 
          strong Lehrer: 
          span(v-for='teacher in currentSubjectData.teachers')
            | {{ teacher.firstname }} {{ teacher.lastname }}
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
      this.availableSubject = !this.availableSubject
      // console.log(method)
      // console.log(subjectId)
      console.log(this.myData)
      console.log(this.db)
      console.log(this.hidePlanet)

      if (method == 'add') {
        // console.log(this.db.subjects.find(o => o.id === subjectId));
      }
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
          console.log(this.currentSubjectData)
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
  .planet
    transition: all, 600ms
    &.hidePlanet
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
      overflow-x: scroll
    h1
      text-transform: capitalize
      color: $teal
      font-weight: bold
      font-size: 1.3em
      margin-bottom: .5em
</style>
