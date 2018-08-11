<template lang="pug">
  .planetzone
    planet(:subject='currentSubject')
    ul.courses
     li BK
     li.is-active GK
     li AK1
     li.is-deactivated AK2
    .orbit-wrap
      .orbit(v-for='project in projects')
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
      levels: 3,
      projects:[ 'cells', 'mamals', 'reptiles' ]
    }
  },
  computed: {
    currentSubject () {
      return this.$route.params.subject
    }
  },
  methods: {
    // getImg(index) {
    //   return require('@/assets/gfx/planets/moons/moon_0' + (index+1) + '.svg')
    // },
    levelChange(level) {
      this.levels = level
    }
  }
}

</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
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
  
.orbit-wrap
  animation: rotating 240s linear infinite
  width: $orbit
  height: $orbit
  position: absolute

.planet     
  border-radius: $planet / 2
  width: $planet
  height: $planet 
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

.courses
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
    &:hover, &.is-active
      border: 1px solid $teal
      color: $teal
      cursor: pointer
    &.is-deactivated
      border: 1px solid $lightgrey
      color: $lightgrey
    

.orbit
  width: $orbit
  height: $orbit
  border-radius: $orbit / 2 
  position: absolute
  display: flex
  align-items: center
  .moon
    transform: rotate(50deg) translateX(-20px)
    transition: box-shadow 200ms ease-out
    width: $moon 
    height: $moon 
    top: - $moon / 2
    border-radius: $orbit / 2
    z-index: 909
    &:hover
      box-shadow: 0px 0px 24px #fea2fd
      cursor: pointer          

.orbit
  &:nth-child(1)
    border: 1px dashed 
  &:nth-child(2)
    transform: rotate(120deg)
  &:nth-child(3)
    transform: rotate(240deg)
  
</style>