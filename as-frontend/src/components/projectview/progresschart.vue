<template lang="pug">
.progresschart(v-if='!loading', :class='barClass')
  .bg-or-hover
    .line-box
      .line(v-for='index in 10')
    .gridlines
  .bars
    .bar(v-for='(evaluation, index) in evaluations', :data-bar-n='(index+1)', :class='barClass', :key='index', :data-competence-name='evaluation.competence.slug', :data-value='evaluation.value', :style="{ height: (evaluation.value*10)+'%' }", @click='selectCompetence(evaluation.competence, barClass)')
      .inner &nbsp;
</template>

<script>
export default {
  name: 'progresschart',
  props: ['level', 'type'],
  computed: {
    subject () {
      return this.$route.params.subject
    },
    barClass () {
      if (this.type == 'large') {
        return 'large'
      } else {
        return 'small'
      }
    }
  },
  data () {
    return {
      subjectData: null,
      evaluations: null,
      loading: true
    }
  },
  mounted () {
    this.getMyData()
  },
  watch: {
    '$route' () {
      this.setEvaluations()
    }
  },
  methods: {
    receiveNewEval (data) {
      console.log('receiveNewEval')
      // not working????!!!
      const foundIndex = this.evaluations.findIndex(o => o.competence.id === data.competence.id)
      this.evaluations[foundIndex] = data
    },
    selectCompetence (competence, barClass) {
      // only from the main chart, not mini charts
      if (barClass === 'large') {
        this.$parent.$emit('setCompetence', competence)
      }
    },
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.subjectData = response.studiesSubjects.find(o => o.slug === this.subject)
        this.setEvaluations()
        this.loading = false
      })
    },
    setEvaluations () {
      const existingEvaluations = this.subjectData.evaluations.filter(o => o.level === this.level)
      let evals = []
      this.subjectData.competences.forEach(c => {
        // find matching eval if it exists
        const e = existingEvaluations.find(e => e.competence.id === c.id)
        if (e) {
          evals.push(e)
        } else {
          // otherwise create a new eval
          const newEval = {
            competence: c,
            level: this.level,
            student: {
              id: localStorage.getItem('userId')
            },
            value: 1
          }
          evals.push(newEval)
        }
      })
      this.evaluations = evals
    },
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  .progresschart
    padding-left: 20px
    // height: 100%
    width: 100%
    // min-height: 7em
    min-width: 20px
    background: url('../../assets/gfx/graphs/chart-lines.svg')
    background-repeat: no-repeat
    background-size: cover
    &.small
      height: 13vh
      .bar .inner
        height: 13vh
    &.large
      height: 33vh
      .bar .inner
        height: 33vh
  #levelnav
    .tab:hover .progresschart .bar .inner
        background-image: linear-gradient(-180deg, $teal 0%, $teal 58%)
    .tab:hover .progresschart
      background: url('../../assets/gfx/graphs/chart-lines-teal.svg')
      background-repeat: no-repeat
      background-size: cover
      background-position: 7% 100%
  #leveView
    .progresschart
      height: 90px

  .bars
    display: flex
    align-items: flex-end
    justify-content: space-between
    height: 100%
    padding: 0 7% 0 5%
  .bar
    width: 12.5%
    // height: 100%
    overflow: hidden
    margin: 0
    padding: 0
    transition: all 200ms ease
    display: flex
    align-items: flex-end
    .inner
      width: 100%
      // height: 100%
    &:hover
      opacity: .8
      cursor: pointer

    // &[data-bar-n="1"]
    //   .inner
    //     background-image: linear-gradient(-180deg, #ED1D23 0%, #F5A61B 58%)
    // &[data-bar-n="2"]
    //   .inner
    //     background-image: linear-gradient(-180deg, #9748B4 0%, #ED1D23 56%)
    // &[data-bar-n="3"]
    //   .inner
    //     background-image: linear-gradient(-180deg, #4AA8DA 0%, #653393 53%)
    // &[data-bar-n="4"]
    //   .inner
    //     background-image: linear-gradient(-180deg, #0B643A 0%, #48A7D6 54%)
    &.large
      border: 1px white solid
    .inner
      background-image: linear-gradient(180deg, #056537 0%, #44A6D8 33%, #653393, 75%, #ED1E23 85%, #FCB714 100%)
</style>
