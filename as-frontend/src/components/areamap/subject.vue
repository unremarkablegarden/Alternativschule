<template lang="pug">
  .planet
    img(:src='src')
</template>

<script>
export default {
  name: 'subject',
  props: ['subject'],
  computed: {
    src: function () {
      return require('@/assets/gfx/planets/0' + this.subject + '.svg')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  #areamap
    .planet
      img
        width: 20px
        height: auto    
  #subjectmap
    .planet
      img
        width: 20vh
        height: auto    
</style>
