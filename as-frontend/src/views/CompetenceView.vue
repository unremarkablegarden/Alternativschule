<template lang="pug">
.wrapper
  .guibox
    competencesnav
    .columns
      .column.is-3.chart
        progresschart 
        ul.explanation 
          li 1: Ich benötige noch viel Übung!
          li 2: Ich bin noch etwas unsicher.
          li 3: Meine leistungen sind in Ordnung.
          li 4: Super! Ich bin total sicher.
          li 5: Ich bin ein Profi!
      .column.is-7.is-offset-1.text
        h3 Kompetenz: {{ currentCompetence }}
        p Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus, quis mollis nisl nunc et massa. Vestibulum sed metus in lorem tristique ullamcorper id vitae erat. Nulla mollis sapien sollicitudin lacinia lacinia. Vivamus facilisis dolor et massa placerat, at vestibulum nisl egestas. Nullam rhoncus lacus non odio luctus, eu condimentum mauris ultrices. 
        h3 Mein lernlevel
        lernlevel
</template>

<script>
import competencesnav from '@/components/projectview/competencesnav.vue'
import progresschart from '@/components/projectview/progresschart.vue'
import lernlevel from '@/components/projectview/lernlevel.vue'
export default {
  components: {
    competencesnav,
    progresschart,
    lernlevel
  },
  computed: {
    currentCompetence () {
      return this.$route.params.competence
    },
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  .guibox
    text-align: left
    padding: 1.5em
    overflow-x: scroll
    .progresschart
      height: 60%
      width: auto
      margin-bottom: 2em
  .text
    h3 
      font-family: $A
      font-size: 1.125rem
      text-transform: uppercase
      margin-bottom: 1em
    p
      font-size: .875rem
      margin-bottom: 2em
  .explanation
    font-size: .75em
</style>
