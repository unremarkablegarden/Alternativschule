<template lang="pug">
  router-link(:to='"/area/" + area').area.column.is-6(:class='area')
    h2.title {{ area }}
    planet(v-for='subject in subjects', :subject="subject.name", :key="subject.name",  :style="{ top: subject.position.y, left: subject.position.x }") 
</template>

<script>
import planet from '@/components/areas/planet.vue'
export default {
  props: ['area'],
  data () {
    return {
      subjects:[
        {
          name: 'biology',
          position: {
            x: '25vw',
            y: '30vh'
          }
        },
        {
          name: 'english',
          position: {
            x: '33vw',
            y: '23vh'
          }
        },
        {
          name: 'history',
          position: {
            x: '5vw',
            y: '7vh'
          }
        },
        {
          name: 'philosophy',
          position: {
            x: '13vw',
            y: '20vh'
          }
        }
      ]
    }
  },
  components: {
    planet
  }
}
</script>

<style scoped lang="sass">
  @import "@/assets/styles/variables.sass"  
  .area
    position: relative
    transition: all 300ms
    &:nth-child(1)
      border-right: 1px solid $grey
      border-bottom: 1px solid $grey
    &:nth-child(4)
      margin-top: -1px
      margin-left: -1px
      border-left: 1px solid $grey
      border-top: 1px solid $grey  
    &:hover
      background: #00094880
    .title
      bottom: 0
      left: 1em
      font-size: 1em
      position: absolute
    .planet
      width: 30px
      height: 30px
      position: absolute
</style>  
