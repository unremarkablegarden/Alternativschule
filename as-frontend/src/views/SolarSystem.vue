<template lang="pug">
  #solarsystem
    .info
      h1 {{ planetHover }}
    .solarsystem
      .sun
        img(src="../assets/gfx/planets/sun@3x.png")    
      .planet-orbit(v-for="subject in subjects", :style="{ transform: rotate() }")
        router-link(:to=' "subject/" + subject')
          planet(:subject="subject")
</template>

<script>
import planet from '@/components/areas/planet.vue'
export default {
  data () {
    return {
      subjects:[ 
        'biology', 'history', 'english', 'philosophy'
      ],
      planetHover: 'test'
    }
  },
  methods: {
    rotate () {
      return 'rotate(' + Math.floor(Math.random() * 360) + 'deg)'
    }
  },
  components: {
    planet
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
$orbit1: 70vh 
$orbit2: 55vh
$orbit3: 40vh
$orbit4: 28vh

$sun: 240px

$orbit-start: random(360)

@keyframes rotating 
  from 
    transform: rotate($orbit-start deg)
  to 
    transform: rotate($orbit-start + 360deg)
  

.info
  position: fixed
  top: 30px
  right: 30px

.sun img
  width: $sun 
  height: auto 

.planet  
  transition: border 200ms
  transform: translateX(-15px) rotate(45deg)
  &:hover
    opacity: .8   

.planet-orbit
  border: 1px solid #ffffff1c
  position: absolute
  display: flex
  align-items: center
  &:hover
    border: 1px solid #ffffff30
    cursor: pointer

.planet-orbit:nth-child(2)
  width: $orbit1 
  height: $orbit1 
  border-radius: $orbit1 / 2 
  animation: rotating 240s linear infinite 
  z-index: 1
  
.planet-orbit:nth-child(5)
  width: $orbit2 
  height: $orbit2 
  border-radius: $orbit2 / 2 
  animation: rotating 200s linear infinite
  z-index: 2
  
.planet-orbit:nth-child(3)
  width: $orbit3
  height: $orbit3
  border-radius: $orbit3 / 2 
  animation: rotating 130s linear infinite
  z-index: 3

.planet-orbit:nth-child(4)
  width: $orbit4
  height: $orbit4
  border-radius: $orbit4 / 2 
  animation: rotating 60s linear infinite
  z-index: 4
</style>