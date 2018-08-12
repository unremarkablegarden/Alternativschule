<template lang="pug">
#areas
  .areas.guibox.columns.is-multiline  
    router-link(:to='subject.area + "/" + subject.name').area.column.is-6(v-for='subject in subjects')
      h2.title {{ subject.name }}
      planet(:subject="subject.name")
</template>

<script>
import planet from '@/components/areas/planet.vue'
// import AreaSubject from '@/components/areas/AreaSubject.vue'
export default {
  components: {
    // AreaSubject
    planet
  },
  data () {
    return {
      subjects:[
        {
          name: 'biology',
          area: 'naturwissenschaft'
        },
        {
          name: 'english',
          area: 'naturwissenschaft'
        },
        {
          name: 'history',
          area: 'naturwissenschaft'
        },
        {
          name: 'philosophy',
          area: 'naturwissenschaft'
        } 
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass" 
</style>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass" 
  .area
    display: flex
    align-items: center
    justify-content: center
    position: relative
    transition: background-color 200ms 
    
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
      text-transform: capitalize
    .planet
      width: 12vw
</style>
