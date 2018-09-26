<template lang="pug">
  .loading(v-if='loading')
    Loading
  .planetzone(v-else)
    .guibox.message(v-if='noMoons')
      .msg
        strong {{ viewLevel }} Monde
        p Um nun einen Mond (ein Projekt) hinzuzufügen, klickst du ebenfalls unten links neben deinem Avatar auf das „+“.

    .info
      div
        strong(v-if='currentSubjectData') Planet&nbsp;{{ currentSubjectData.name }}
      div(v-if='moonHover')
        strong Moon&nbsp;
        | {{ moonHover }}

    planet(:subject='currentSubject', :data-levels='viewLevel')

    ul.levels
      li(v-for='level in subjectLevels', :class="{ 'is-active' : (level == viewLevel), 'levelUnavailable': (levelValue(level) > levelValue(currentLevel)) }")
        router-link(:to=" '/subject/' + currentSubject + '/' + level ", v-if="levelValue(level) <= levelValue(currentLevel)") {{ level }}
        .level(v-else) {{ level }}

    .orbit-circle(v-if='projects.length')
    .orbit-wrap(:class="moonCount")
      router-link(v-for='project in projectsPerLevel[viewLevel]', :key='project.slug', @mouseover.native='moonHover = project.name', @mouseleave.native='moonHover = null',  :to='"/project/" + currentSubject + "/" + project.slug', :class="{ 'hideMoons': hideMoons }").orbit
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
      currentLevel: null,
      viewLevel: null,
      subjectLevels: null,
      projectsPerLevel: null,
      hideMoons: false,
      moonCount: 'moonN_0'
    }
  },
  created () {
    if (this.$route.params.level) {
      this.viewLevel = this.$route.params.level
    }
  },
  mounted () {
    // console.log('subjectview mounted')
    this.getDb()
    this.getMyData()
  },
  watch: {
    '$route' () {
      if (this.$route.params.level !== this.viewLevel) {
        this.hideMoons = true
        setTimeout(t => {
          this.viewLevel = this.$route.params.level
          setTimeout(t => {
            this.hideMoons = false
            this.moonCount = 'moonN_' + this.projectsPerLevel[this.viewLevel].length
          }, 500)
        }, 500)
      }

    }
  },
  computed: {
    currentArea () {
      return this.$route.params.area
    },
    currentSubject () {
      return this.$route.params.subject
    },
    noMoons () {
      if (this.projectsPerLevel[this.viewLevel].length < 1) {
        return true
      }
    },
    // moonCount () {
    //   if (!this.projects) {
    //     return 'moonN_0'
    //   } else {
    //     // return 'moonN_' + this.projects.length
    //     return this.projectsPerLevel[this.viewLevel].length
    //   }
    // },
    // moonCount () {
    //   if (!this.projects) {
    //     return 'moonN_0'
    //   } else {
    //     return 'moonN_' + this.projects.length
    //   }
    // },
  },
  methods: {
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.myData = response
        this.projects = response.studiesProjects.filter(s => s.subject.slug === this.currentSubject)

        let currentLevel
        currentLevel = response.studentLevels.find(o => o.subject.slug === this.currentSubject)
        // console.log('currentLevel')
        // console.log(currentLevel.level)
        if (currentLevel) {
          currentLevel = currentLevel.level
        } else {
          currentLevel = 'BK'
        }
        this.viewLevel = currentLevel

        this.setProjectsPerLevel()

        this.currentLevel = currentLevel
        this.loading = false
      })
    },
    setProjectsPerLevel () {
      let perLevel = {
        BK: [],
        GK: [],
        AK: [],
        AK1: [],
        AK2: []
      }
      this.projects.forEach(p => {
        p.levels.forEach(l => {
          perLevel[l].push(p)
        })
      })
      this.projectsPerLevel = perLevel

      this.moonCount = 'moonN_' + this.projectsPerLevel[this.viewLevel].length
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
    levelValue (level) {
      if (level == 'BK') return 1
      if (level == 'GK') return 2
      if (level == 'AK') return 3
      if (level == 'AK1') return 3
      if (level == 'AK2') return 4
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
$moonFix: 4.2vh

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
  &[data-levels="BK"]
    box-shadow: 0px 0px 3vh #fff
  &[data-levels="GK"]
    box-shadow: 0 0 0 .5vh #fff, 0 0 0 2vh #9DB7D6
  &[data-levels="AK1"], &[data-levels="AK"]
    box-shadow: 0 0 0 .5vh #fff, 0 0 0 2vh #9DB7D6, 0 0 0 4vh #7397C1
  &[data-levels="AK2"]
    box-shadow: 0 0 0 .5vh #fff, 0 0 0 2vh #9DB7D6, 0 0 0 4vh #7397C1, 0 0 0 6vh #5477A1
  img
    width: $planet
    height: $planet

.hideMoons
  transition: all 500ms
  opacity: 0


.levels
  text-transform: uppercase
  position: fixed
  bottom: 2em
  right: 2em
  display: flex
  font-size: .815rem
  a
    color: #fff
  line-height: .815
  li
    margin-left: .5em
    border: 1px solid #fff
    border-radius: 3px
    padding: .6em
    &.is-active
      border: 1px solid $teal
      a
        color: $teal
    // &.is-active ~ li
    &.levelUnavailable
      border: 1px solid $lightgrey
      cursor: no-drop
      a
        color: $lightgrey
    .levelUnavailable

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
    transition: all 500ms
    .moon
      width: $moonFix
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

.guibox.message
  position: fixed
  width: 40vw
  height: auto
  z-index: 999
  padding: 30px
  left: 50vw
  bottom: 3vh
  margin: 0
  transform: translateX(-50%)
  display: flex
  justify-content: center
  align-items: center
  text-align: left
  padding: 1.5em 2em 2em 2em
  .msg
    width: 100%
  strong
    color: $teal
    text-transform: uppercase
    font-size: 1.1em
    margin-bottom: 0.5em
    display: block
  p
    line-height: 1.2em
</style>
