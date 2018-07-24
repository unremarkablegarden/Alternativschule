<template lang="pug">
#areamap
  div(class="map")
    areaquadrant.q1
    areaquadrant.q2
    areaquadrant.q3
    areaquadrant.q4
</template>

<script>
import areaquadrant from '@/components/areamap/areaquadrant.vue'
export default {
  name: 'areamap',
  components: {
    areaquadrant
  }
}
</script>

<style lang="sass">
.map
  width: 90vw
  height: 90vh
  background: #11111190
  border: 3px solid #50E3C2
  border-radius: 6px
  box-shadow: 0px 0px 15px #50E3C2
  transition: all 500ms
  z-index: 2
  &:hover
    box-shadow: 0px 0px 30px #50E3C2
.quadrant
  width: 49.5%
  height: 49.75%
  display: flex
  float: left
  border: 1px solid #ffffff20
  position: relative
  transition: all 300ms
  z-index: 1
  &:hover
    background: #00094880
  .title
    bottom: 0
    left: 1em
    font-size: 1em
    position: absolute
#areamap
  .planet
    position: absolute
    z-index: 99
    img
      width: auto
      height: 20px
      
</style>

<style lang="sass" scoped>
  
</style>
