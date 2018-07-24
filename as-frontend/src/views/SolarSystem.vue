<template lang="pug">
  #solarsystem
    .info
      h1 {{ planetHover }}
    .solarsystem
      .sun
        img(src="../assets/gfx/planets/sun@3x.png")
      
      router-link(to="/planet", @mouseover.native='hoverPlanet(1)', @mouseleave.native='planetHover = null').planet._1
        img(src="../assets/gfx/planets/01.svg")
      router-link(to="/planet", @mouseover.native='hoverPlanet(2)', @mouseleave.native='planetHover = null').planet._2
        img(src="../assets/gfx/planets/02.svg")
      router-link(to="/planet", @mouseover.native='hoverPlanet(3)', @mouseleave.native='planetHover = null').planet._3
        img(src="../assets/gfx/planets/03.svg")
      router-link(to="/planet", @mouseover.native='hoverPlanet(4)', @mouseleave.native='planetHover = null').planet._4
        img(src="../assets/gfx/planets/04.svg")
</template>

<script>
export default {
  data () {
    return {
      planets: 4,
      planetHover: 'test'
    }
  },
  methods: {
    hoverPlanet(planet) {
      let name
      if (planet === 1) {
        name = 'planet 1'
      }
      if (planet === 2) {
        name = 'planet 2'
      }
      if (planet === 3) {
        name = 'planet 3'
      }
      if (planet === 4) {
        name = 'planet 4'
      }
      this.planetHover = name
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
$orbit1: 70vh 
$orbit2: 55vh
$orbit3: 40vh
$orbit4: 28vh

$sun: 240px
$planet1: 30px
$planet2: 24px
$planet3: 20px
$planet4: 20px

@keyframes rotating 
  from 
    transform: rotate(0deg)
  to 
    transform: rotate(360deg)

.info
  position: fixed
  top: 30px
  right: 30px

.sun img
  width: $sun 
  height: auto 

.planet
  border: 1px solid #ffffff1c
  position: absolute
  transition: border 200ms
  &:hover
    border: 1px solid #ffffff30
    cursor: pointer
  img
    transform: rotate(130deg)
    height: auto 
    position: absolute 
    box-shadow: 0px 0px 8px #fea2fd
    transition: box-shadow 300ms ease-out
    &:hover
      box-shadow: 0px 0px 24px #fea2fd
      cursor: pointer

.planet._1
  width: $orbit1 
  height: $orbit1 
  border-radius: $orbit1 / 2 
  animation: rotating 240s linear infinite 
  img
    width: $planet1 
    top: - $planet1 / 2 
    border-radius: $planet1 / 2
  
.planet._2
  width: $orbit2 
  height: $orbit2 
  border-radius: $orbit2 / 2 
  animation: rotating 200s linear infinite 
  img
    width: $planet2 
    top: - $planet2 / 2 
    border-radius: $planet2 / 2 
  
.planet._3
  width: $orbit3
  height: $orbit3
  border-radius: $orbit3 / 2 
  animation: rotating 130s linear infinite 
  img
    width: $planet3
    top: - $planet3 / 2 
    border-radius: ($planet3 / 2) - 1px

.planet._4
  width: $orbit4
  height: $orbit4
  border-radius: $orbit4 / 2 
  animation: rotating 60s linear infinite 
  img
    width: $planet4
    top: - $planet4 / 2 
    border-radius: $planet4 / 2

</style>