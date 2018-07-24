<template lang="pug">
  .quadrant
    h2.title AREA 1
    subject(subject="1")
    subject(subject="2")
    subject(subject="3")
</template>

<script>
import subject from '@/components/areamap/subject.vue'
export default {
  name: 'areaquadrant',
  components: {
    subject
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  
      
    @for $i from 1 through 9
      .planet:nth-child(#{$i})
        img
          height: random(20) + 20 + px
        top: random(30) + vh
        left: random(45) + vw
</style>  
