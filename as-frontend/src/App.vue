<template lang="pug">
  #app
    #nav
      router-link(to='/solarsystem') Solar System
      router-link(to='/planet') Planet
      router-link(to='/areamap') Area Map
      router-link(to='/areamap/subjects') Subject Map
      router-link(to='/areamap/subjects/single') Subject Single
    router-view#view
</template>

<style lang="sass">
  @import "~bulma"

  // *
  //   margin: 0
  //   padding: 0

  $space-blue: #000948

  @function alphaRandom()
    @return random(1000)*.001


  @function stars($s, $max-area, $min-area : 0, $star-size : 0)
    $stars : #{$min-area + random($max-area)}px #{$min-area + random($max-area)}px 0 #{$star-size}px rgba(255,255,255, alphaRandom());
    @for $i from 1 to $s
      $stars: '#{$stars} , #{$min-area + random($max-area)}px #{$min-area + random($max-area)}px 0 #{$star-size}px rgba(255,255,255, #{alphaRandom()})'
    @return unquote($stars)

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50

    #view
      background: $space-blue
      height: 100vh
      display: flex
      align-items: center
      justify-content: center
      &:after
       content: ""
       position: absolute
       height: 2px
       width: 2px
       top: -2px
       background: white
       box-shadow: stars(200, 1300)
       border-radius: 100px
       z-index: -1

  #nav
    padding: 0 .1em .1em
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 909
    background: #ffffff30
    line-height: 1
    a
      line-height: 1
      font-weight: bold
      font-size: .8em
      text-decoration: none
      color: #fff
      &.router-link-exact-active
        color: #42b983
</style>
