<template lang="pug">
  #levelnav.columns
    .column.is-10
      .columns
        router-link(:to='"/level/" + currentSubject + "/" + level').column.is-one-quarter(v-for='level in studentLevels', :key='level').tab
          .columns
            .column.is-two-fifths.chart
              progresschart(:level='level')
            .column.is-three-fifths.desc
              .level {{ level }}
              p Lorem ipsum dolor sit amet, consectetur.
    router-link(:to='"/project/" + currentSubject', :class="{ 'is-not-lit' : currentLevel }").column.is-2.themen-link Themen
    //- router-link(:to='"/project/" + currentSubject').column.is-2.themen-link Themen
</template>

<script>
import progresschart from '@/components/projectview/progresschart.vue'
export default {
  name: 'levelnav',
  props: ['project'],
  components: {
    progresschart
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
        this.studentLevels = this.studentCurrentSubjectData.levels
      })  
    }
  },
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  #levelnav
    font-size: .8em
    margin-bottom: 4em
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
