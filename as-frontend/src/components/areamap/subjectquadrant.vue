<template lang="pug">
  .quadrant
    h2.title AREA 1
    subject(subject="1")
</template>

<script>
import subject from '@/components/areamap/subject.vue'
export default {
  name: 'subjectquadrant',
  components: {
    subject
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>

<style lang="sass">  
</style>