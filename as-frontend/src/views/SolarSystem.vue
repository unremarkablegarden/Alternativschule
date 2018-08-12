<template lang="pug">
  #solarsystem
    .info
      h1 Planet: {{ planetHover }}
    .solarsystem
      .sun
        img(src="../assets/gfx/planets/sun@3x.png")    
      .planet-orbit(v-for="subject in subjects", @mouseover='planetHover = subject.name')
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
      subjects: [
        { name: 'biology' }, 
        {	name: 'history' }, 
        {	name: 'english' }, 
        {	name: 'philosophy' }, 
        { name: 'phys' }, 
        { name: 'mathe' }, 
        {	name: 'welterkunde' }, 
        { name: 'politics' }, 
        { name: 'deutsch' }, 
        { name: 'franzoesisch' }, 
        { name: 'spanisch' }, 
        { name: 'chemie' }
      ],  
      planetHover: 'Nothing selected'
    }
  },
  methods: {
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
  h1
    text-transform: capitalize

.sun
  z-index: 20
  img
    width: $sun 
    height: auto 

.planet  
  transition: border 200ms
  transform: translateY(-($planet / 2)) rotate(130deg)
  width: $planet
  height: $planet
  border-radius: $planet
  transition: box-shadow 50ms
  &:hover
    box-shadow: 0px 0px 24px #fea2fd
    cursor: pointer     

.planet-orbit
  border: 1px solid #ffffff1c
  position: absolute
  display: flex
  align-items: center
  will-change: transform
  transform: translateY(0)
  width: 10px
  .orbit-wrap
    display: flex
    justify-content: center
    
$orbit: 99vh
$rotationtime: 300s
@for $i from 1 through 14
  .planet-orbit:nth-child(#{$i})
    $orbit: $orbit - 6.5vh
    $rotationtime: $rotationtime - 20s
    height: $orbit
    border-radius: $orbit / 2 
    animation: rotating $rotationtime linear infinite
    z-index: $i
    .orbit-wrap
      transform: translateY(0)
      width: $orbit 
      height: $orbit
      a
        z-index: $i
        
  .planet-circle:nth-child(#{$i})
    $orbit: $orbit - 6.5vh
         
</style>