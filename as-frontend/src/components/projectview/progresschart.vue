<template lang="pug">
.progresschart(v-if='!loading')
  .line-box
    .line(v-for='index in 10')
  .gridlines
  .bar(v-for='evaluation in evaluations', :data-competence-name='evaluation.competence.slug', :style="{ 'grid-row-start': (101-(evaluation.value*10)) }")
</template>

<script>
export default {
  name: 'progresschart',
  props: ['level'],
  computed: {
    subject () {
      return this.$route.params.subject
    },
  },
  data () {
    return {
      beanz: null,
      evaluations: null, 
      loading: true
    }
  },
  mounted () {
    this.getMyData()
  },
  watch: {
    '$route' () {
      this.setEvaluations()
    }
  },
  methods: {
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        // console.log(response)
        this.beanz = response.studiesSubjects.find(o => o.slug === this.subject)
        this.setEvaluations()
        this.loading = false
      })   
    },
    setEvaluations () {
      this.evaluations = this.beanz.evaluations.filter(o => o.level === this.level)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  .progresschart
    padding-left: 20px
    display: grid
    grid-template-columns: repeat(4, 1fr)
    grid-template-rows: repeat(100, 1fr)
    grid-column-gap: 3px
    height: 100%
    width: 100%
    min-height: 7em
    min-width: 20px
    background: url('../../assets/gfx/graphs/chart-lines.svg')
    background-repeat: no-repeat
    background-size: cover
  #levelnav
    .tab:hover .progresschart .bar
        background-image: linear-gradient(-180deg, $teal 0%, $teal 58%)
    .tab:hover .progresschart
      background: url('../../assets/gfx/graphs/chart-lines-teal.svg')
      background-repeat: no-repeat
      background-size: cover
      background-position: 7% 100%
  #leveView
    .progresschart
      height: 90px
  .bar
    margin: 0
    padding: 0
    transition: all 200ms ease
    grid-row-end: 102
    &:hover
      opacity: .8
      cursor: pointer

  .bar:nth-child(2)
    grid-row-start: 0
    background-image: linear-gradient(-180deg, #ED1D23 0%, #F5A61B 58%)
  .bar:nth-child(3)
    grid-row-start: 0
    background-image: linear-gradient(-180deg, #9748B4 0%, #ED1D23 56%)
  .bar:nth-child(4)
    grid-row-start: 0
    background-image: linear-gradient(-180deg, #4AA8DA 0%, #653393 53%)
  .bar:nth-child(5)
    grid-row-start: 0
    background-image: linear-gradient(-180deg, #0B643A 0%, #48A7D6 54%)
  
  
</style>
