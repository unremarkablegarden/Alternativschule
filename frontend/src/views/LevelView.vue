<template lang="pug">
.wrapper
  .guibox(v-if='!loading')
    levelnav
    .columns
      .column.is-3.chart
        progresschart(:level='currentLevel', type='large', ref='chart')
        .chart-legend
          .inner
            .letter(v-for='(competence, index) in subject.competences', :class='{ current : (currentCompetence.slug === subject.competences[index].slug) }') {{ alphabet[index] }}
        ul.competence-names
          li(v-for='competence in subject.competences', :key='competence.slug')
            | {{ competence.name }}

      .column.is-7.is-offset-1.text
        h3 Kurs: {{ currentLevel }}

        //- p {{ subject.description }}
        p {{ subjectLevelDescription }}

        h3 Mein lernlevel: {{ currentCompetence.name }}
        lernlevel(:competence='currentCompetence.slug', :competenceId='currentCompetence.id', :level='currentLevel')
        ul.lernlevel-info
          li 1: Ich benötige noch viel Übung!
          li 2: Ich bin noch etwas unsicher.
          li 3: Meine leistungen sind in Ordnung.
          li 4: Super! Ich bin total sicher.
          li 5: Ich bin ein Profi!
</template>

<script>
import levelnav from '@/components/projectview/levelNav.vue'
import progresschart from '@/components/projectview/progresschart.vue'
import lernlevel from '@/components/projectview/lernlevel.vue'

export default {
  data () {
    return {
      myData: null,
      subject: null,
      loading: true,
      currentLevel: null,
      currentCompetence: null,
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F'],
      subjectLevelDescription: null
    }
  },
  components: {
    levelnav,
    progresschart,
    lernlevel
  },
  created () {
    this.routeUpdate()
    this.$on('setCompetence', competence => {
      console.log('$on setCompetence')
      this.currentCompetence = competence
    })
    this.$on('evalCreated', data => {
      console.log('$on evalCreated')
      this.$refs.chart.receiveNewEval(data)
    })

  },
  watch: {
    '$route' () {
      this.routeUpdate()
      this.setLevelDescription()
    }
  },
  computed: {
    currentSubject () {
      return this.$route.params.subject
    },
  },
  mounted () {
    this.getDb()
    // this.getMyData()
  },
  methods: {
    levelValue (level) {
      if (level == 'BK') return 1
      if (level == 'GK') return 2
      if (level == 'AK') return 3
      if (level == 'AK1') return 3
      if (level == 'AK2') return 4
    },
    setLevelDescription () {
      if (this.subject.levelDescriptions) {
        const descriptionsArr = this.subject.levelDescriptions.split('//')
        this.subjectLevelDescription = descriptionsArr[this.levelValue(this.currentLevel)-1]
      }
    },
    routeUpdate () {
      this.currentLevel = this.$route.params.level
    },
    getDb () {
      this.$store.dispatch('getDb')
        .then((response) => {
          this.db = response
          this.subject = response.subjects.find(subject => subject.slug === this.currentSubject)
          this.currentCompetence = this.subject.competences[0]
          // console.log(this.currentCompetence)
          this.setLevelDescription()
          this.loading = false
        })
    },
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  .guibox
    text-align: left
    padding: 1.5rem
    // overflow-x: scroll
    .progresschart
      // height: 60%
      width: auto
      margin-bottom: .5em
      grid-column-gap: 5.5%
      padding: 0 0 0 15%
      border-bottom: 1px solid #fff
      .bar
        border: 1px solid #fff
    .competences
      display: flex
      justify-content: space-around
      padding-left: 8%
      margin-bottom: 2em
      font-size: .8em
      font-weight: bold
  .text
    h3
      font-family: $A
      font-size: 1.125rem
      text-transform: uppercase
      margin-bottom: 1em
    p
      font-size: .875rem
      margin-bottom: 2em


  .chart-legend
    padding: 0 8% 0 13%
    // background: red
    .inner
      display: flex
      justify-content: space-between
      margin-bottom: 1em
      // padding: 0 5.5% 0 3.5%
    .letter
      padding: 1px 8px 0
      border-radius: 5px
      border: 1px transparent solid
    .letter.current
      font-weight: bold
      border: 1px white solid

  .competence-names
    font-size: .8em
    line-height: 1.4
    color: #BBB
    li
      padding-bottom: 0.7em
    li::before
      font-weight: bold
    li:nth-child(1)::before
      content: 'A:  '
    li:nth-child(2)::before
      content: 'B:  '
    li:nth-child(3)::before
      content: 'C:  '
    li:nth-child(4)::before
      content: 'D:  '
    li:nth-child(5)::before
      content: 'E:  '

  .lernlevel-info
    margin-top: 2em
    color: #BBB
    font-size: .8em
</style>
