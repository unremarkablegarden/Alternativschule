<template lang="pug">
  .planet(:data-subject='subject')
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

  .planetzone .planet
    img
      transform: scale(1.03)
    &[data-subject="englisch"]
      img
        transform: scale(1.75)
    &[data-subject="franzoesisch"]
      img
        transform: scale(1.66)
    &[data-subject="geografie"]
      img
        transform: scale(1.54)
</style>
