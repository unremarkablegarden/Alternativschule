<template lang="pug">
  .loading(v-if='!projects') Loading...
  .planetzone(v-else)
    .info
      div
        strong Planet&nbsp;
        | {{ currentSubjectData.name }}
      div(v-if='moonHover')
        strong Moon&nbsp;
        | {{ moonHover }}
    planet(:subject='currentSubject', :data-levels='currentLevel')
    .orbit-circle(v-if='projects.length')
    ul.levels
     li(v-for='level in subjectLevels', :class="{ 'is-active' : (level == currentLevel) }") {{ level }}
    .orbit-wrap(:class='moonCount')
      router-link(v-for='project in projects', :key='project.slug', @mouseover.native='moonHover = project.name', @mouseleave.native='moonHover = null',  :to='"/project/" + currentSubject + "/" + project.slug').orbit
        moon
</template>

<script>
import planet from '@/components/areas/planet.vue'
import moon from '@/components/areas/moon.vue'
export default {
  components: {
    planet,
    moon
  },
  name: 'subjectView',
  data () {
    return {
      db: null,
      projects: null,
      currentSubjectData: null,
      moonHover: null,
      loading: true,
      currentLevel: null
    }
  },
  mounted () {
    // console.log('subjectview mounted')
    this.getDb()
    this.getMyData()
  },
  computed: {
    currentArea () {
      return this.$route.params.area
    },
    currentSubject () {
      return this.$route.params.subject
    },
    moonCount () {
      if (!this.projects) {
        return 'moonN_0'
      } else {
        return 'moonN_' + this.projects.length
      }
    },
  },
  methods: {
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.myData = response
        this.projects = response.studiesProjects.filter(s => s.subject.slug === this.currentSubject)

        let currentLevel
        currentLevel = response.studentLevels.find(o => o.subject.slug === this.currentSubject)
        if (currentLevel) {
          currentLevel = currentLevel.level
        } else {
          currentLevel = 'BK'
        }

        this.currentLevel = currentLevel
        this.loading = false
      })
    },
    sortLevels (arrayToSort) {
      // useage: levels = this.sortLevels(levels)
      let arrayOrder = ['BK', 'GK', 'AK', 'AK1', 'AK2']
      let newArray = []
      arrayOrder.forEach((level) => {
        if (arrayToSort.includes(level)) {
          newArray.push(level)
        }
      })
      return newArray
    },
    getDb () {
      this.$store.dispatch('getDb').then((response) => {
          this.db = response
          this.currentSubjectData = response.subjects.find(subject => subject.slug === this.currentSubject)
          this.subjectLevels = this.sortLevels(this.currentSubjectData.levels)
        })
    },
    levelChange(level) {
      this.levels = level
    }
  },
}

</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
$orbit: 30vh
$planet: 25vh
$moon: 4vh

@keyframes rotating
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

.info
  background: $space-blue
  strong
    color: #fff
  position: fixed
  font-size: 1.3rem
  top: 1.5rem
  right: 1.5rem
  text-align: right
  color: #fff
  text-transform: capitalize

.planet
  border-radius: $planet / 2
  width: $planet
  height: $planet
  transition: box-shadow 400ms ease
  z-index: 2
  &[data-levels="bk"]
    box-shadow: 0px 0px 3vh #fff
  &[data-levels="gk"]
    box-shadow: 0 0 0 .5vh #fff, 0 0 0 2vh #9DB7D6
  &[data-levels="ak1"]
    box-shadow: 0 0 0 .5vh #fff, 0 0 0 2vh #9DB7D6, 0 0 0 4vh #7397C1
  &[data-levels="ak2"]
    box-shadow: 0 0 0 .5vh #fff, 0 0 0 2vh #9DB7D6, 0 0 0 4vh #7397C1, 0 0 0 6vh #5477A1
  img
    width: $planet
    height: $planet

.levels
  text-transform: uppercase
  position: fixed
  bottom: 2em
  right: 2em
  display: flex
  font-size: .815rem
  color: #fff
  line-height: .815
  li
    margin-left: .5em
    border: 1px solid #fff
    border-radius: 3px
    padding: .6em
    &.is-active
      border: 1px solid $teal
      color: $teal
    &.is-active ~ li
      border: 1px solid $lightgrey
      color: $lightgrey

.orbit-circle
  height: ($orbit*2) - $moon
  width: ($orbit*2) - $moon
  border-radius: (($orbit*2) - $moon)*2
  border: 1px dashed $lightgrey
  position: absolute
  z-index: 0

.orbit-wrap
  position: absolute
  display: flex
  align-items: center
  justify-content: center
  margin-top: - $orbit / 2
  animation: rotating 200s linear infinite
  transform-origin: 0 15vh
  .orbit
    height: $orbit
    position: absolute
    transform-origin: bottom
    .moon
      width: $moon
      height: $moon
      border-radius: $moon/2
      &:hover
        box-shadow: 0px 0px 24px #fea2fd
        cursor: pointer

$rotation: 0

@for $ii from 1 through 12
  .moonN_#{$ii}
    @for $i from 1 through $ii
      $rotation: $rotation + (360deg / $ii)
      .orbit:nth-child(#{$i})
        transform: rotate($rotation)
</style>
