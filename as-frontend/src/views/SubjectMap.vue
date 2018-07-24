<template lang="pug">
#subjectmap
  div(class="map")
    subjectquadrant.q1
    subjectquadrant.q2
    subjectquadrant.q3
    subjectquadrant.q4
</template>

<script>
import subjectquadrant from '@/components/areamap/subjectquadrant.vue'
export default {
  name: 'areamap',
  components: {
    subjectquadrant
  }
}
</script>

<style lang="sass" scoped>
  
</style>
