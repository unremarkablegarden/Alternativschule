<template lang="pug">
.progresschart
  .gridlines
  .bar-1.bor
  .bar-2.bor
  .bar-3.bor
  .bar-4.bor
</template>

<script>
export default {
  name: 'progresschart',
  props: ['competence'],
  data () {
    return {
      skills: [
        {
          name: 'bk',
          level: '1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          name: 'gk',
          level: '30',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          name: 'ak1',
          level: '20',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          name: 'ak2',
          level: '40',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        }
      ]
    }
  }
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
    .tab:hover .progresschart [class*="bar"]
        background-image: linear-gradient(-180deg, $teal 0%, $teal 58%)     
    .tab:hover .progresschart
      background: url('../../assets/gfx/graphs/chart-lines-teal.svg')
      background-repeat: no-repeat
      background-size: cover
      background-position: 7% 100%
  [class*="bar"]
    margin: 0 
    padding: 0 
    transition: all 200ms ease 
    grid-row-end: 102 
    &:hover 
      opacity: .8 
      cursor: pointer 
  
  .bar-1
    grid-row-start: $bar1
    background-image: linear-gradient(-180deg, #ED1D23 0%, #F5A61B 58%) 
  .bar-2 
    grid-row-start: $bar2
    background-image: linear-gradient(-180deg, #9748B4 0%, #ED1D23 56%)
  .bar-3
    grid-row-start: $bar3
    background-image: linear-gradient(-180deg, #4AA8DA 0%, #653393 53%)
  .bar-4 
    grid-row-start: $bar4
    background-image: linear-gradient(-180deg, #0B643A 0%, #48A7D6 54%)
    
</style>
