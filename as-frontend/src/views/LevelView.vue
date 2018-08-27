<template lang="pug">
.wrapper
  .guibox(v-if='!loading')
    levelnav
    .columns
      .column.is-3.chart
        progresschart(:level='currentLevel', type='large')
        ul.chart-legend
          li(:class='{ current : (currentCompetence.slug === subject.competences[0].slug) }') A
          li(:class='{ current : (currentCompetence.slug === subject.competences[1].slug) }') B
          li(:class='{ current : (currentCompetence.slug === subject.competences[2].slug) }') C
          li(:class='{ current : (currentCompetence.slug === subject.competences[3].slug) }') D
        ul.competence-names
          li(v-for='competence in subject.competences', :key='competence.slug')
            | {{ competence.name }}
      .column.is-7.is-offset-1.text
        h3 Kurs: {{ currentLevel }}
        //- p Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus, quis mollis nisl nunc et massa. Vestibulum sed metus in lorem tristique ullamcorper id vitae erat. Nulla mollis sapien sollicitudin lacinia lacinia. Vivamus facilisis dolor et massa placerat, at vestibulum nisl egestas. Nullam rhoncus lacus non odio luctus, eu condimentum mauris ultrices.
        h3 Mein lernlevel: {{ currentCompetence.name }}
        lernlevel(:competence='currentCompetence.slug', :level='currentLevel')
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
      currentCompetence: null
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
  },
  watch: {
    '$route' () {
      // console.log('route change');
      this.routeUpdate()
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
    routeUpdate () {
      this.currentLevel = this.$route.params.level
    },
    getDb () {
      this.$store.dispatch('getDb')
        .then((response) => {
          this.db = response
          // console.log(response)
          this.subject = response.subjects.find(subject => subject.slug === this.currentSubject)
          this.currentCompetence = this.subject.competences[0]
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
    overflow-x: scroll
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

  ul.chart-legend
    display: flex
    justify-content: space-around
    padding-left: 12%
    margin-bottom: 1em
    // font-weight: bold
    li
      padding: 1px 8px 0
      border-radius: 5px
      border: 1px transparent solid
    li.current
      font-weight: bold
      border: 1px white solid

  .competence-names
    font-size: .9em
    line-height: 2
    color: $lightgrey
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

  .lernlevel-info
    margin-top: 2em
    color: $lightgrey
    font-size: .8em
</style>
