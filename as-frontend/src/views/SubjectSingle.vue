<template lang="pug">
.wrapper
  .map
    .column
      subject(subject="1")
      .button Hinzufugen
    .column
      h1 Planet: Kunst
      .kurs BK - GK - AK
      .Lehrer Charlie
      .Kompetenzen Lorem ipsum dolor
      .description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  
</template>

<script>
import subject from '@/components/areamap/subject.vue'
export default {
  name: 'subjectsingle',
  components: {
    subject
  }
}
</script>

<style lang="sass" scoped>
  .map
    display: flex
    align-items: center
    justify-content: center
    .column
      width: 40vw

</style>
