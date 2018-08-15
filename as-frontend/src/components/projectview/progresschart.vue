<template lang="pug">
.progresschart
  .gridlines
  .bar(v-for='level in lernLevels', :data-level='level', :style="{ 'grid-row-start': (101-(level*10)) }")
</template>

<script>
export default {
  name: 'progresschart',
  props: ['competence'],
  computed: {
    subject () {
      return this.$route.params.subject
    },
  },
  created () {
    // this.lernLevels = this.$store.state.lernLevels[this.subject][this.competence]
    this.lernLevels = this.$store.state.lernLevels.history[this.competence]
  },
  watch: {
    competence () {
      // this.lernLevels = this.$store.state.lernLevels[this.subject][this.competence]
      this.lernLevels = this.$store.state.lernLevels.history[this.competence]
    }
  },
  data () {
    return {
      lernLevels: null,
      courses: {
        
        competences: [
          {
            name: 'lesen',
            level: '1',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
          },
          {
            name: 'schreiben',
            level: '30',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
          },
          {
            name: 'verstehen',
            level: '20',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
          },
          {
            name: 'sprechen',
            level: '40',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
          }
        ]
      }
    }
  },

}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  $bar1: 80
  $bar2: 30
  $bar3: 20
  $bar4: 60

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
  #competencesnav
    .tab:hover .progresschart .bar
        background-image: linear-gradient(-180deg, $teal 0%, $teal 58%)
    .tab:hover .progresschart
      background: url('../../assets/gfx/graphs/chart-lines-teal.svg')
      background-repeat: no-repeat
      background-size: cover
      background-position: 7% 100%
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
