<template lang="pug">
#areas
  .areas.guibox.columns.is-multiline  
    AreaSubject(v-for='subject in subjects', :subject='subject.name')
</template>

<script>
import AreaSubject from '@/components/areas/AreaSubject.vue'
export default {
  components: {
    AreaSubject
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
  
</style>
