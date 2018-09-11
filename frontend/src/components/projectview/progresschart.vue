<template lang="pug">
.progresschart(v-if='!loading', :class='barClass')
  .bg-or-hover
    .line-box
      .line(v-for='index in 10')
    .gridlines
  .bars(:class='level')
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
      let size
      if (this.type == 'large') {
        size = 'large'
      } else {
        size = 'small'
      }
      let levelClass
      if (this.level == 'BK') levelClass = 'levels-3'
      if (this.level == 'GK') levelClass = 'levels-3'
      if (this.level == 'AK') levelClass = 'levels-3'
      if (this.level == 'AK1') levelClass = 'levels-4'
      if (this.level == 'AK2') levelClass = 'levels-4'
      const output = size+" "+levelClass
      return output
    },
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
      // console.log(competence + ' ' + barClass);
      if (barClass.includes('large')) {
        console.log('yes');
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


    &.large
      border: 1px white solid

  .levels-3
    .bars.BK .bar .inner
      background-image: linear-gradient(180deg, #DC1F32 0%, #FCB814 100%)
    .bars.GK .bar .inner
      background-image: linear-gradient(180deg, #653393 0%, #ED1D25 100%)
    .bars.AK .bar .inner
      background-image: linear-gradient(180deg, #0B663D 0%, #66BAE6 50%, #653494 100%)

  .levels-4
    .bars.BK .bar .inner
      background-image: linear-gradient(180deg, #DC1F32 0%, #FCB814 100%)
    .bars.GK .bar .inner
      background-image: linear-gradient(180deg, #653393 0%, #ED1D25 100%)
    .bars.AK1 .bar .inner
      background-image: linear-gradient(180deg, #66BEE9 0%, #653393 100%)
    .bars.AK2 .bar .inner
      background-image: linear-gradient(180deg, #0B663D 0%, #47A7D6 100%)

</style>
