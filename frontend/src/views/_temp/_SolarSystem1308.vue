<template lang="pug">
  
  #solarsystem
    .info
      h1(v-if='planetHover') Planet: {{ planetHover }}
    .solarsystem
      .sun
        img(src="../assets/gfx/planets/sun@3x.png")    
      .planet-orbit(v-for="subject in subjects", @mouseover='planetHover = subject.name', @mouseleave='planetHover = null')
        //-.orbit-wrap
        .orbit-wrap(:style="{ transform: subject.rotate }")   
          router-link(:to=' "subject/" + subject.name')
            planet(:subject="subject.name")       
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
      db: null,
      subjects: null  
    }
  },
  mounted () {
    this.getDb()
  },
  computed: {
    currentArea () {
      return this.$route.params.area
    }
  },
  methods: {
    getDb () {
      this.$store.dispatch('getDb').then((res) => {
        this.db = res
        console.log(res)
      })
    },
    rotate () {
      return 'rotate(' + Math.floor(Math.random() * 360) + 'deg)'
    }
  },
  created () {
    this.subjects.forEach((o) => {
      o.rotate = this.rotate()
    })
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
$planet: 2.5vh
$sun: 10vh

@keyframes rotating 
  from 
    transform: rotate3d(0,0,1,0deg)
  to 
    transform: rotate3d(0,0,1,360deg)
    
.info
  position: fixed
  top: 30px
  right: 30px
  color: #fff
  h1
    text-transform: capitalize

.sun
  z-index: 20
  img
    width: $sun 
    height: auto 

.planet  
  transition: border 200ms
  transform: translateY(-($planet / 3)) rotate(130deg)
  width: $planet
  height: $planet
  border-radius: $planet
  // transition: box-shadow 100ms
  &:hover
    box-shadow: 0px 0px 24px #fea2fd
    cursor: pointer     

.planet-orbit
  position: absolute
  display: flex
  align-items: center
  will-change: transform
  transform: translateY(0)
  width: 10px
  // border: 1px solid #ffffff20
  .orbit-wrap
    display: flex
    justify-content: center
    
.orbit-circle
  background: url('../assets/gfx/circle.svg')
  background-repeat: no-repeat
  background-size: contain
  position: absolute
  z-index: 0
  opacity: .2
    
$orbit: 99vh
$orbit-start: 5vh
$rotationtime: 20s
@for $i from 2 through 14
  $orbit-start: $orbit-start + 7vh
  $rotationtime: $rotationtime + 20s
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
$orbital: 5vh        
@for $i from 3 through 15
  $orbital: $orbital + 7vh          
  .orbit-circle:nth-child(#{$i})
    height: $orbital
    width: $orbital
</style>