<template lang="pug">
  #solarsystem
    ul.solarsystem
      li.sun
        a(href='#sun')
          span Sun
      li.mercury
        a(href='#mercury')
          span Mercury
      li.venus
        a(href='#venus')
          span Venus
      li.earth
        a(href='#earth')
          span
            | Earth
            span.moon
      li.mars
        a(href='#mars')
          span Mars
      li.jupiter
        a(href='#jupiter')
          span Jupiter
      li.saturn
        a(href='#saturn')
          span
            | Saturn  
            span.ring Ring
      li.uranus
        a(href='#uranus')
          span Uranus
      li.neptune
        a(href='#neptune')
          span Neptune
      li.pluto
        a(href='#pluto')
          span Pluto
</template>

<script>
// import planet from '@/components/areas/planet.vue'
export default {
  components: {
    // planet
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
}
</script>

<style lang="sass" scoped>
#solarsystem
  display: flex 
  align-items: center 
  justify-content: center
  height: 100vh

/* Solar System Styles

ul.solarsystem
  height: 640px
  list-style: none
  transition: all 0.09s ease-in
  overflow: hidden
  li
    text-indent: -9999px
    display: block
    position: absolute
    border: 2px solid #394057
    /*    opacity: 0.7;
    span
      display: block
      position: absolute
      width: 10px
      height: 10px
      border-radius: 5px
    &.active
      border-color: #aa4200
      &.sun, span
        transform: scale(1.3)
      &.sun span, &.earth .moon
        border: none
        box-shadow: none
    &.sun
      width: 40px
      height: 40px
      border-radius: 20px
      background: #fc3
      // background-image: gradient(linear, left bottom, left top, color-stop(0.22, rgb(204, 153, 0)), color-stop(1, rgb(255, 219, 112)))
      top: 302px
      left: 462px
      border: none
      box-shadow: 0 0 50px #c90
      z-index: 100
      transition: all 0.2s ease-in
      span
        width: 60px
        height: 60px
        border-radius: 30px
    &.mercury
      width: 100px
      height: 100px
      border-radius: 52px
      top: 270px
      left: 430px
      z-index: 99
      span
        background: #b6bac5
        top: 10px
        left: 10px
    &.venus
      width: 160px
      height: 160px
      border-radius: 82px
      top: 240px
      left: 400px
      z-index: 98
      span
        background: #bf8639
        top: 118px
        left: 5px
    &.earth
      width: 220px
      height: 220px
      border-radius: 112px
      top: 210px
      left: 370px
      z-index: 97
      span
        background: #06c
        top: 56px
        left: 5px
        &.moon
          width: 4px
          height: 4px
          border-radius: 2px
          background: #ccc
          top: 12px
          left: 12px
    &.mars
      width: 280px
      height: 280px  
      border-radius: 142px
      top: 180px
      left: 340px
      z-index: 96
      span
        background: #aa4200
        top: 0px
        left: 175px
    &.jupiter
      width: 340px
      height: 340px
      border-radius: 172px
      top: 150px
      left: 310px
      z-index: 95
      span
        background: #e0ae6f
        top: 67px
        left: 24px
    &.saturn
      width: 400px
      height: 400px
      border-radius: 202px
      top: 120px
      left: 280px
      z-index: 94
      span
        background: #dfd3a9
        top: 24px
        left: 300px
        &.ring
          width: 12px
          height: 12px
          border-radius: 8px
          background: none
          border: 2px solid #5a4e34
          left: -3px
          top: -3px
          transform: skewY(50deg)
    &.uranus
      width: 460px
      height: 460px
      border-radius: 232px
      top: 90px
      left: 250px
      z-index: 93
      span
        background: #82b3d1
        top: 7px
        left: 300px
    &.neptune
      width: 520px
      height: 520px  
      border-radius: 262px
      top: 60px
      left: 220px
      z-index: 92
      span
        background: #77c2ec
        top: 0px
        left: 200px
    &.pluto
      width: 580px
      height: 580px
      border-radius: 292px
      top: 30px
      left: 190px
      z-index: 91
      span
        background: #7c6a5c
        top: 79px
        left: 79px
    animation-iteration-count: infinite
    animation-timing-function: linear
    animation-name: orbit
    &.earth span
      animation-iteration-count: infinite
      animation-timing-function: linear
      animation-name: moon
    &.mercury
      animation-duration: 5s
    &.venus
      animation-duration: 8s
    &.earth
      animation-duration: 12s
      span
        animation-duration: 2s
    &.mars
      animation-duration: 20s
    &.asteroids_meteorids
      animation-duration: 50s
    &.jupiter
      animation-duration: 30s  
    &.saturn
      animation-duration: 60s
    &.uranus
      animation-duration: 70s
    &.neptune
      animation-duration: 100s  
    &.pluto
      animation-duration: 120s

/* CSS3 Animations

@keyframes orbit
  from
    transform: rotate3d(0,0,1,0deg) translateZ(0)
  to
    transform: rotate3d(0,0,1,360deg) translateZ(0)

@keyframes moon
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)
  /*ul.solarsystem:hover li {-webkit-animation-play-state: paused;}
</style>