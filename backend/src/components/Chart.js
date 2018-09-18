// CommitChart.js
import { Radar } from 'vue-chartjs'

export default {
  extends: Radar,
  props: ['selfEvals', 'subjects', 'allSubjects'],
  methods: {
    subjectCompetencesN (subjectSlug) {
      return this.subjects.find(s => s.slug === subject.slug).competences.length
    }
  },
  mounted () {
    let subjectsArr = []
    let subjectsProgress = []

    // 3-4 levels x 3-5 competences x 0-10 value

    this.selfEvals.forEach(x => {
      if (!subjectsArr.includes(x.subject.slug)) {
        subjectsArr.push(x.subject.slug)
      }
      const index = subjectsArr.indexOf(x.subject.slug)

      if (!subjectsProgress[x.subject.slug] && subjectsProgress[x.subject.slug] !== 0) {
        subjectsProgress[x.subject.slug] = 0
      }
      subjectsProgress[x.subject.slug] = subjectsProgress[x.subject.slug] + x.value
    })


    let subjectsMax = [] // max value
    let subjectsDone = [] // percentage
    // let subjectsDone2 = [] // percentage
    const scale = 100

    subjectsArr.forEach(x => {
      const s = this.subjects.find(s => s.slug === x)
      const levels = s.levels.length
      const competences = s.competences.length
      const max = levels * competences * 10
      subjectsMax[x] = max
      subjectsDone[x] = Math.round( (subjectsProgress[x] / max) * scale * 10 ) / 10
    })

    // console.log(subjectsArr)
    // console.log(subjectsProgress)
    // console.log(subjectsMax)
    // console.log(subjectsDone)
    // console.log(subjectsDone2)

    let labelsAll = []
    let dataAll = []
    let i = 0
    this.allSubjects.forEach(s => {
      labelsAll.push(s.name)
      if (subjectsDone[s.slug]) {
        dataAll[i] = subjectsDone[s.slug]
      } else {
        dataAll[i] = 0
      }
      i = i + 1
    })


    const dataset = {
      labels: labelsAll,
      datasets: [{
        label: '2018',
        data: dataAll,
        backgroundColor: 'rgba(0,200,50,0.4)',
        pointBackgroundColor: 'rgba(0,150,30,0.5)',
        pointHoverBorderColor: 'rgba(0,200,50,1)',
        pointRadius: 4,
        lineTension: 0,
      }]
    }
    const options = {
      scale: {
        display: true
      }
    }
    this.renderChart(dataset, options)

  }
}
