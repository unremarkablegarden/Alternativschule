<template lang="pug">
  #planet
    .levels   
      button(@click='levelChange(0)') level 0
      button(@click='levelChange(1)') level 1
      button(@click='levelChange(2)') level 2
      button(@click='levelChange(3)') level 3
      
    .solarsystem
      .planet(:data-levels='levels')
        img(src="@/assets/gfx/planets/01.svg")
      .orbit
        .moon(v-for='(moon, index) in moons', :key='index', :data-index='index')
          img(:src='getImg(index)')
</template>

<script>
export default {
  data () {
    return {
      levels: 3,
      moons: [
        {
          name: 'cyber',
          fuckyou: true
        },
        {
          name: 'putin'
        },
        {
          name: 'ww3'
        }
      ]
    }
  },
  methods: {
    getImg(index) {
      return require('@/assets/gfx/planets/moons/moon_0' + (index+1) + '.svg')
    },
    levelChange(level) {
      this.levels = level
    }
  }
}

</script>

<style lang="sass" scoped>
$orbit: 50vh 

$planet: 25vh
$moon: 4vh


@keyframes rotating 
  from 
    transform: rotate(0deg)
  to 
    transform: rotate(360deg)

.levels
  position: fixed
  top: 4em

.orbit
  animation: rotating 240s linear infinite
  width: $orbit
  height: $orbit
  position: absolute

.planet     
  border-radius: $planet / 2
  width: $planet
  height: $planet 
  background: #fff
  transition: box-shadow 400ms ease
  &[data-levels="0"]
    box-shadow: 0px 0px 24px #fff
  &[data-levels="1"]
    box-shadow: 0 0 0 .5vh #fff, 0 0 0 2vh #9DB7D6
  &[data-levels="2"]
    box-shadow: 0 0 0 .5vh #fff, 0 0 0 2vh #9DB7D6, 0 0 0 4vh #7397C1
  &[data-levels="3"]  
    box-shadow: 0 0 0 .5vh #fff, 0 0 0 2vh #9DB7D6, 0 0 0 4vh #7397C1, 0 0 0 6vh #5477A1
  img
    width: $planet
    height: $planet  

.moon
  width: $orbit
  height: $orbit
  border-radius: $orbit / 2 
  position: absolute
  img
    transform: rotate(140deg)
    height: auto 
    position: absolute 
    transition: box-shadow 200ms ease-out
    width: $moon 
    top: - $moon / 2
    border-radius: $orbit / 2
    &:hover
      box-shadow: 0px 0px 24px #fea2fd
      cursor: pointer          

.moon
  &[data-index="0"]
    border: 1px dashed 
  &[data-index="1"]
    transform: rotate(120deg)
  &[data-index="2"]
    transform: rotate(240deg)
  
</style>