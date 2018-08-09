<template lang="pug">
  #app
    router-view#view
    usermenu
</template>

<script>
import usermenu from '@/components/usermenu.vue'
export default {
  components: {
    usermenu
  }
}
</script>

<style lang="sass" scoped>
  .avatar
    position: fixed
    left: 20px
    bottom: 20px
</style>

<style lang="sass">
  @import "~bulma"
  @import "@/assets/styles/variables.sass"
  @import url('https://fonts.googleapis.com/css?family=Archivo+Black|Roboto')
  
  body
    font-family: $R
    font-size: 16px
    line-height: 1.5
  
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
      background-image: radial-gradient(white, rgba(255,255,255,.8) 1px, transparent 3px), radial-gradient(white, rgba(255,255,255,.5) 1px, transparent 3px), radial-gradient(white, rgba(255,255,255,.3) 1px, transparent 1px), radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.9) 1px, transparent 2px)
      background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px; 
      background-position: 0 0, 40px 60px, 130px 270px, 70px 100px

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
        
  .button
    background: $pinkred
    color: #fff
    border: none
    font-weight: bold
    padding-left: 1rem
    padding-right: 1rem
    border-radius: .75rem
    &:hover
      background: darken($pinkred, 5)
      color: #fff
</style>
