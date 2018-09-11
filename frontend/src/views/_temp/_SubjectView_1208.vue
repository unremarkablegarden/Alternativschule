<template lang="pug">
  .planetzone
    .info
      div Planet: {{ currentSubject }}
      div Moon: {{ moonHover }}
    planet(:subject='currentSubject', :data-levels='subject.currentLevel')
    ul.levels  
     li(v-for='(level, index) in subject.levels', :class="{ 'is-active' : (level == subject.currentLevel) }") {{ level }}
    .orbit-wrap(:class='moonCount') 
      .orbit(v-for='project in subject.projects', @mouseover='moonHover = project')
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
      subject: {
        name: 'Biology',
        projects:[ 'cells', 'mamals', 'reptilians', 'country', 'josh_turner', 'god'],
        levels: [ 'bk', 'gk', 'ak1', 'ak2' ],
        currentLevel: 'gk'
      },
      moonHover: 'Nothing selected'
    }
  },
  methods: {
    levelChange(level) {
      this.levels = level
    }
  },
  computed: {
    currentSubject () {
      return this.$route.params.subject
    },
    moonCount(){
      return 'moonN_' + this.subject.projects.length
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

.info
  position: fixed
  top: 1rem
  right: 1rem
  text-align: right
  color: $lightgrey
  text-transform: capitalize
  
.orbit-wrap
  transform: translateY(0)
  animation: rotating 240s linear infinite
  width: $orbit
  height: $orbit
  position: absolute

.planet     
  border-radius: $planet / 2
  width: $planet
  height: $planet 
  transition: box-shadow 400ms ease
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
    
.moonN_2
  .orbit
    &:nth-child(2)
      transform: rotate(180deg)
.moonN_3
  .orbit
    &:nth-child(2)
      transform: rotate(120deg)
    &:nth-child(3)
      transform: rotate(240deg)
.moonN_3
  .orbit
    &:nth-child(2)
      transform: rotate(120deg)
    &:nth-child(3)
      transform: rotate(240deg)
.moonN_4
  .orbit
    &:nth-child(2)
      transform: rotate(90deg)
    &:nth-child(3)
      transform: rotate(180deg)
    &:nth-child(4)
      transform: rotate(270deg)
.moonN_5
  .orbit
    &:nth-child(2)
      transform: rotate(72deg)
    &:nth-child(3)
      transform: rotate(144deg)
    &:nth-child(4)
      transform: rotate(216deg)
    &:nth-child(5)
      transform: rotate(288deg)
.moonN_6
  .orbit
    &:nth-child(2)
      transform: rotate(60deg)
    &:nth-child(3)
      transform: rotate(120deg)
    &:nth-child(4)
      transform: rotate(180deg)
    &:nth-child(5)
      transform: rotate(240deg)
    &:nth-child(6 )
      transform: rotate(300deg)
</style>
