<template lang="pug">
  .planet
    img(:src='src')
</template>

<script>
export default {
  name: 'planet',
  props: ['subject'],
  computed: {
    src: function () {
      return require('@/assets/gfx/planets/' + this.subject + '.svg')
    }
  }
}
</script>

<style scoped lang="sass">  
  .planet
    width: 30px
    height: auto
    display: flex
    background: none
    img
      width: 100%
      height: auto
</style>
