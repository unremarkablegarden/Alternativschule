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
            planet(:subject="subject.slug", :class="{ inactive : isInactive(subject.id) }")
    .orbit-circle(v-for="subject in subjects")
    .guibox.inactivity
      .inner
        strong Inactivity alert
        p {{ inactivityMsg }}
</template>

<script>
import addYears from 'date-fns/add_years'
import differenceInCalendarYears from 'date-fns/difference_in_calendar_years'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'

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
      subjects: null,
      alertSubjects: [],
      inactivityMsg: null
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
    isInactive (id) {
      if (this.alertSubjects.find(s => s.id === id)) {
        return true
      } else {
        return false
      }
    },
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.myData = response
        this.subjects = response.studiesSubjects
        this.subjects.forEach(subject => subject.rotate = this.rotate())
        this.loading = false
        this.inactivityAlert()
      })
    },
    rotate () {
      return 'rotate(' + Math.floor(Math.random() * 360) + 'deg)'
    },
    inactivityAlert () {
      if (this.myData.selfEvaluations.length) {
        this.myData.selfEvaluations.forEach(d => {
          if (differenceInCalendarYears(new Date(), d.updatedAt) > 0) {
            if (! this.alertSubjects.find(o => o.id === d.subject.id)) {
              // subject not already in alert array
              // console.log('last update to ' + d.subject.name + ' was over a year ago')
              this.alertSubjects.push(d.subject)
            }
          }
          if (differenceInCalendarDays(new Date(), d.updatedAt) > 8) {
            if (! this.alertSubjects.find(o => o.id === d.subject.id)) {
              // console.log('last update to ' + d.subject.name + ' was over 8 days ago')
              this.alertSubjects.push(d.subject)
            }
          }
        })

        if (this.alertSubjects.length) {
          let subjects = []
          this.alertSubjects.forEach(s => {
            subjects.push(s.name)
          })
          this.inactivityMsg = "You haven't made any progress in " + subjects.join(", ") + " for 8 days"
        }
      }

    }
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
.planet.inactive
    box-shadow: 0px 0px 20px #FFF !important
    border: 1.5px lightblue solid
    transform: translateY(-.9vh) rotate(130deg) scale(1.2)

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
@for $i from 2 through 17
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
@for $i from 3 through 18
  $orbital: $orbital + 7.5vh
  .orbit-circle:nth-child(#{$i})
    height: $orbital
    width: $orbital
.guibox.inactivity
  position: fixed
  width: 20vw
  height: auto
  z-index: 999
  padding: 30px
  right: 2vw
  bottom: 2vw
  margin: 0
  // transform: translate(-50%, -50%)
  display: flex
  justify-content: center
  align-items: center
  strong
    color: $teal
    text-transform: uppercase
    font-size: 1.1em
    margin-bottom: 1em
    display: block
  p
    line-height: 1.2em
</style>
