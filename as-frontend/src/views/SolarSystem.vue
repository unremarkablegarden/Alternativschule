<template lang="pug">
  #solarsystem
    .info
      div(v-if='planetHover')
        strong Planet&nbsp;
        | {{ planetHover }}
    .solarsystem
      .sun
        img(src="../assets/gfx/planets/sun@3x.png")
      .planet-orbit(v-for="(subject, index) in subjects", v-if='!loading')
        .orbit-wrap(:style="{ transform: subject.rotate }", data-orbit-n='index')
          router-link(:to=' "subject/" + subject.slug', @mouseover.native='planetHover = subject.name', @mouseleave.native='planetHover = null', data-planet-n='index').planet-link
            planet(:subject="subject.slug")
    .orbit-circle(v-for="subject in subjects")
</template>

<script>
import planet from '@/components/areas/planet.vue'
export default {
  components: {
    planet
  },
  data () {
    return {
      myData: null,
      subjects: null,
      planetHover: null,
      loading: true,
      db: null,
      subjects: null
    }
  },
  mounted () {
    // this.getDb()
    this.getMyData()
  },
  computed: {
    currentArea () {
      return this.$route.params.area
    }
  },
  methods: {
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.myData = response
        this.subjects = response.studiesSubjects
        this.subjects.forEach(subject => subject.rotate = this.rotate())
        this.loading = false
        console.log(response)
      })
    },
    rotate () {
      return 'rotate(' + Math.floor(Math.random() * 360) + 'deg)'
    }
  },
  created () {
  }
}
</script>

<style lang="sass">
.solarsystem
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
</style>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
$planet: 2.5vh
$sun: 10vh

@keyframes rotating
  from
    transform: rotate3d(0,0,1,0deg)
  to
    transform: rotate3d(0,0,1,360deg)

.info
  strong
    color: #fff
  background: $space-blue
  font-size: 1.5rem
  position: fixed
  top: 1.5rem
  right: 1.5rem
  color: #fff
  text-transform: capitalize

.sun
  z-index: 20
  img
    width: $sun
    height: auto

.planet
  transition: border 200ms
  transform: translateY(-.9vh) rotate(130deg)
  width: $planet
  height: $planet
  border-radius: $planet
  transition: all 200ms
  &:hover
    transition: all 200ms
    box-shadow: 0px 0px 34px #fea2fd
    cursor: pointer

.planet-orbit
  position: absolute
  display: flex
  align-items: center
  will-change: transform
  transform: translateY(0)
  // border: 1px solid #ffffff20
  .orbit-wrap
    // border: 1px red solid
    display: flex
    justify-content: center
    border-radius: 100%

.orbit-circle
  background: url('../assets/gfx/circle.svg')
  background-repeat: no-repeat
  background-size: contain
  position: absolute
  z-index: 0
  opacity: .25
  &:nth-child(3)
    opacity: .4
  &:nth-child(4)
    opacity: .3

$orbit: 99vh
$orbit-start: 6vh
$rotationtime: 8s
@for $i from 2 through 14
  $orbit-start: $orbit-start + 7.5vh
  $rotationtime: $rotationtime + 32s
  .planet-orbit:nth-child(#{$i})
    animation: rotating $rotationtime linear infinite
    z-index: 20 - $i
    border-radius: $orbit-start / 2
    .orbit-wrap
      transform: translateY(0)
      width: $orbit-start
      height: $orbit-start
      a
        z-index: 20 - $i
$orbital: 6vh
@for $i from 3 through 15
  $orbital: $orbital + 7.5vh
  .orbit-circle:nth-child(#{$i})
    height: $orbital
    width: $orbital
</style>
