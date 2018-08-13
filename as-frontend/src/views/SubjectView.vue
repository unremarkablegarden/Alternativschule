<template lang="pug">
  .loading(v-if='!currentSubjectData') Loading...
  .planetzone(v-else)
    .info
      div Planet: {{ currentSubjectData.slug }}
      div(v-if='moonHover') Moon: {{ moonHover }}
    planet(:subject='currentSubjectData.slug')
    //- planet(:subject='currentSubjectData.slug', :data-levels='subject.currentLevel') FIX CURRENTLEVELS   
    .orbit-circle  
    //- ul.levels  
     li(v-for='(level, index) in subject.levels', :class="{ 'is-active' : (level == subject.currentLevel) }") {{ level }}
    .orbit-wrap(:class='moonCount') 
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
      subjects: null,
      currentSubjectData: null,
      moonHover: null,
      // subject: {
      //   name: 'Biology',
      //   projects: [ 'cells', 'mamals', 'country', 'god', 'trump' ],
      //   levels: [ 'bk', 'gk', 'ak1', 'ak2' ],
      //   currentLevel: 'gk'
      // },
    }
  },
  mounted () {
    this.getDb()
  },
  computed: {
    currentArea () {
      return this.$route.params.area
    },
    currentSubject () {
      return this.$route.params.subject
    },
    moonCount(){
      return 'moonN_' + this.currentSubjectData.projects.length
    }
  },
  methods: {
    getDb () {
      this.$store.dispatch('getDb')
        .then((response) => {
          this.db = response
          console.log(response)
          this.currentSubjectData = response.subjects.find(subject => subject.slug === this.currentSubject)
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
  position: fixed
  top: 1rem
  right: 1rem
  text-align: right
  color: $lightgrey
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

// .moonN_2
//   @for $i from 1 through 2
//     $rotation: $rotation + 180deg
//     .orbit:nth-child(#{$i})
//       transform: rotate($rotation)
// .moonN_3
//   @for $i from 1 through 3
//     $rotation: $rotation + 120deg
//     .orbit:nth-child(#{$i})
//       transform: rotate($rotation)
// .moonN_4
//   @for $i from 1 through 4
//     $rotation: $rotation + 90deg
//     .orbit:nth-child(#{$i})
//       transform: rotate($rotation)
// .moonN_5
//   @for $i from 1 through 5
//     $rotation: $rotation + 72deg
//     .orbit:nth-child(#{$i})
//       transform: rotate($rotation)
// .moonN_6
//   @for $i from 1 through 6
//     $rotation: $rotation + 60deg
//     .orbit:nth-child(#{$i})
//       transform: rotate($rotation)
// .moonN_7
//   @for $i from 1 through 7
//     $rotation: $rotation + 120deg
//     .orbit:nth-child(#{$i})
//       transform: rotate($rotation)
// .moonN_8
//   @for $i from 1 through 8
//     $rotation: $rotation + 120deg
//     .orbit:nth-child(#{$i})
//       transform: rotate($rotation)
</style>
