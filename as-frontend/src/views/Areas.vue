<template lang="pug">
#areas
  .areas.guibox.columns.is-multiline
    AreaSingle(v-for='area in areas', :key='area', :area='area')
</template>

<script>
import AreaSingle from '@/components/areas/AreaSingle.vue'
export default {
  components: {
    AreaSingle
  },
  data () {
    return {
      areas: [
        'naturwissenschaft',
        'gesellschaftswissenschaften',
        'sprachen',
        'projecten'
      ]
    }
  }
}
</script>

<style lang="sass">
@import "@/assets/styles/variables.sass"  
.guibox
  width: calc(100vw - 200px)
  height: calc(100vh - 100px)
  margin-left: 100px
  background: #11111199
  color: #fff
  border: 3px solid $teal
  border-radius: .8rem
  box-shadow: 0px 0px 15px $teal
  transition: all 500ms
  z-index: 2
  &:hover
    box-shadow: 0px 0px 30px $teal
</style>

<style lang="sass" scoped>
  
</style>
