<template lang="pug">
#competencesnav.columns
  .column.is-10
    .columns
      router-link(:to='"/competence/" + currentSubject + "/" + competence.slug').column.is-one-quarter(v-for='competence in competences', :key='competence.slug').tab
        .columns
          .column.is-two-fifths.chart
            progresschart(:competence='competence.slug')
          .column.is-three-fifths.desc
            .competence {{ competence.name }}
            p {{ competence.text }}
  router-link(:to='"/project/" + currentSubject', :class="{ 'is-not-lit' : currentCompetence }").column.is-2.themen-link Themen
</template>

<script>
import progresschart from '@/components/projectview/progresschart.vue'
export default {
  name: 'competencesnav',
  props: ['project'],
  components: {
    progresschart
  },
  data () {
    return {
      competences: [
        {
          name: 'Verstehen',
          slug: 'verstehen',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          name: 'Lesen',
          slug: 'lesen',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          name: 'Schreiben',
          slug: 'schreiben',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          name: 'Sprechen',
          slug: 'sprechen',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        }
      ]
    }
  },
  computed: {
    currentSubject () {
      return this.$route.params.subject
    },
    currentCompetence () {
      return this.$route.params.competence
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  #competencesnav
    font-size: .8em
    margin-bottom: 4em
    a
      color: #fff
    .chart
      padding-bottom: 0
    .desc
      .competence
        font-weight: bold
    .themen-link
      font-weight: bold
      display: flex
      align-items: center
      border-top-right-radius: .8rem
      transition: all, 200ms
      background: $teal
      border: 1px solid $teal
    .themen-link.is-not-lit
      background: none
      border: 1px solid #fff
      &:hover
        background: $teal
        border: 1px solid $teal
  .progresschart
    padding: 0
    background-position: 7% 100%
    .bar

</style>
