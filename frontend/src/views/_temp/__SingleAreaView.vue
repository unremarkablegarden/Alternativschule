<template lang="pug">
  .quadrant
    h2.title AREA 1
    planet(subject="1")
</template>

<script>
import planet from '@/components/areas/planet.vue'
export default {
  components: {
    planet
  }
}
</script>

<style scoped lang="sass">
  .quadrant
    position: relative
    .planet
      position: absolute
      width: 80px
      height: 80px 
      top: random(35) + vh
      left: random(35) + vw
  .q1
    .planet
      top: random(35) + vh
      left: random(35) + vw
  .q2
    .planet
      top: random(35) + vh
      left: random(35) + vw
  .q3
    .planet
      top: random(35) + vh
      left: random(35) + vw
  .q4 
    .planet
      top: random(35) + vh
      left: random(35) + vw
</style>

<style lang="sass">  
</style>