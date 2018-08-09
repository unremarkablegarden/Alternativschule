<template lang="pug">
  router-link(:to='"/area/" + area').area.column.is-6(:class='area')
    h2.title {{ area }}
    planet(v-for='(subject, index) in subjects', :subject="subject", :key="subject") 
</template>

<script>
import planet from '@/components/areas/planet.vue'
export default {
  props: ['area'],
  data () {
    return {
      subjects:[ 
        'biology', 'history', 'english', 'philosophy'
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
  @for $i from 1 through 9
    .area:nth-child(1) div:nth-child(#{$i})
      position: absolute
      top: random(35) + vh
      left: random(35) + vw
      width: random(20) + 20 + px
  @for $i from 1 through 9
    .area:nth-child(2) div:nth-child(#{$i})
      position: absolute
      top: random(35) + vh
      left: random(35) + vw
      width: random(20) + 20 + px
  @for $i from 1 through 9
    .area:nth-child(3) div:nth-child(#{$i})
      position: absolute
      top: random(35) + vh
      left: random(35) + vw
      width: random(20) + 20 + px
  @for $i from 1 through 9
    .area:nth-child(4) div:nth-child(#{$i})
      position: absolute
      top: random(35) + vh
      left: random(35) + vw
      width: random(20) + 20 + px
</style>  
