<template lang="pug">
.wrapper
  .areas.guibox.columns
    .column.is-5.is-offset-1
      planet(:subject='currentSubject') 
      .button Hinzufugen
    .column.is-4.info.is-offset-1
      h1 Planet: {{ currentSubject }}
      .kurs
        span(v-for='course in courses')
          | {{ subject.course }} —
      .Lehrer {{ subject.teacher }}
      .Kompetenzen Lorem ipsum dolor
      .description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  
</template>

<script>
import planet from '@/components/areas/planet.vue'
export default {
  components: { planet },
  computed: {
    currentSubject () {
      return this.$route.params.subject
    }
  },
  data () {
    return {
      subject:[ 
        {
          name: 'Biology',
          slug: 'biology',
          competences: [ 'lorem', 'ipsum' ],
          courses: [ 'BK', 'GK', 'AK' ],
          teacher: 'Klaus',
          info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"  
  .areas
    align-items: center
    .planet
      width: 30vw
      margin-bottom: 2em
    .info
      text-align: left
    h1
      text-transform: capitalize
      color: $teal
      font-weight: bold
</style>
