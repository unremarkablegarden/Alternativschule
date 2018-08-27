<template lang="pug">
  #levelnav.columns
    .column.is-10
      .columns
        router-link(v-for='level in studentLevels', :key='level', :to='"/level/" + currentSubject + "/" + level').column.is-one-quarter.tab
          .columns
            .column.is-two-fifths.chart
              progresschart(:level='level', type='small')
            .column.is-three-fifths.desc
              .level.padfix {{ level }}
              //- p Lorem ipsum dolor sit amet, consectetur
              LoremIpsum(add="1s")
    router-link(:to='"/project/" + currentSubject', :class="{ 'is-not-lit' : currentLevel }").column.is-2.themen-link Themen
</template>

<script>
import progresschart from '@/components/projectview/progresschart.vue'
import LoremIpsum from 'vue-lorem-ipsum'

export default {
  name: 'levelnav',
  props: ['project'],
  components: {
    progresschart,
    LoremIpsum
  },
  data () {
    return {
      db: null,
      myData: null,
      studentLevels: null
    }
  },
  computed: {
    currentSubject () {
      return this.$route.params.subject
    },
    currentLevel () {
      return this.$route.params.level
    },
    // studentLevels () {
    //   return this.studentCurrentSubjectData.levels
    // }
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
      })
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
      border-top-right-radius: .8rem
      transition: all, 200ms
      background: $teal
      border: 1px solid $teal
      margin-bottom: 1em
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

</style>
