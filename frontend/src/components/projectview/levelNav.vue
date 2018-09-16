<template lang="pug">
  #levelnav.columns
    .column.is-10.levelsWrapper
      .columns.is-gapless.inner
        router-link(v-for='level in studentLevels', :key='level', :to='"/level/" + currentSubject + "/" + level').level.column.is-3.tab
          .columns.is-gapless
            .column.is-8
              progresschart(:level='level', type='small')
            .column.is-4
              .level.padfix {{ level }}
    router-link(:to='"/project/" + currentSubject', :class="{ 'is-not-lit' : currentLevel }").column.is-2.themen-link Themen
</template>

<script>
import progresschart from '@/components/projectview/progresschart.vue'
// import LoremIpsum from 'vue-lorem-ipsum'

export default {
  name: 'levelnav',
  props: ['project'],
  components: {
    progresschart,
    // LoremIpsum
  },
  data () {
    return {
      db: null,
      myData: null,
      studentLevels: null,
      availableLevels: null
    }
  },
  computed: {
    currentSubject () {
      return this.$route.params.subject
    },
    currentLevel () {
      return this.$route.params.level
    }
  },
  mounted () {
    this.getDb()
    this.getMyData()
  },
  methods: {
    getDb () {
      this.$store.dispatch('getDb')
        .then((response) => {
          this.db = response
          // console.log(response)
          this.currentSubjectData = response.subjects.find(subject => subject.slug === this.currentSubject)
          // console.log(this.currentSubjectData)
        })
    },
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.myData = response
        this.subjects = response.studiesSubjects
        // console.log(this.subjects)
        this.studentCurrentSubjectData = response.studiesSubjects.find(subject => subject.slug === this.currentSubject)
        this.studentLevels = this.sortLevels(this.studentCurrentSubjectData.levels)

        let studentsLevel = this.myData.studentLevels.find(o => o.subject.id === this.studentCurrentSubjectData.id)
        if (!studentsLevel) {
          studentsLevel = { level: 'BK' }
        }

        let filteredLevels = []
        this.studentLevels.forEach(o => {
          if (this.levelValue(o) <= this.levelValue(studentsLevel.level)) {
            filteredLevels.push(o)
          }
        })
        this.studentLevels = filteredLevels

        // console.log(filteredLevels)
        // bk, gk, ak, ak1, ak2
        // if (studentsLevel == 'BK') {
        //   this.studentLevels
        // }
        // this.availableLevels =
      })
    },

    levelValue (level) {
      if (level == 'BK') return 1
      if (level == 'GK') return 2
      if (level == 'AK') return 3
      if (level == 'AK1') return 3
      if (level == 'AK2') return 4
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
  },
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  .padfix
    margin-bottom: 0.7em
  .lorem
    height: 6em
    overflow: hidden
  #levelnav
    font-size: .8em
    margin-bottom: 4vh
    // background: red
    height: 16vh
    // position: absolute
    overflow: hidden
    a
      color: #fff
    .chart
      padding-bottom: 0
    .desc
      .level
        font-weight: bold
    .themen-link
      font-weight: bold
      display: flex
      align-items: center
      // border-top-right-radius: .8rem
      border-top-right-radius: 0.3rem
      transition: all, 200ms
      background: darken($teal, 10)
      text-shadow: 0.5px 0.5px 3px darken($teal, 25)
      border: 1px solid $teal
      margin-bottom: 1em
      // margin-bottom: 1.8em
      padding-left: 2em
    .themen-link.is-not-lit
      background: none
      border: 1px solid #fff
      &:hover
        background: $teal
        border: 1px solid $teal
  .progresschart
    padding: 0
    background-position: 12% 100%
    .bar
    .competence-names
      display: none
  .levelsWrapper
    padding: 1em 0 0 2em
    .inner
      max-width: 768px
</style>
