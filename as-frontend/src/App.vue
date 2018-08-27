<template lang="pug">
  #app
    a(@click='logout', v-if='!login').logout Logout
    transition(name="fade", mode="out-in")
      router-view#view
    usermenu(v-if='!login')
</template>

<script>
import usermenu from '@/components/usermenu.vue'
export default {
  components: {
    usermenu
  },
  data () {
    return {
      login: true
    }
  },
  computed: {
    userId () {
      return localStorage.getItem('userId')
    }
  },

  created () {
    if (this.$route.name == 'login') {
      this.login = true
    } else  {
      this.login = false
    }
  },

  watch: {
    $route (to, from) {
      // this.checkLoggedIn()
      this.login = false
    }
  },
  mounted () {
    // window.addEventListener('mousemove', this.parallax)
  },
  methods: {
    parallax (event) {
      let x = event.clientX
      let y = event.clientY
      const winW = window.innerWidth
      const winH = window.innerHeight
      const p = 20
      let moveX = ((x / winW) * p) - (p/2)
      let moveY = ((y / winH) * p) - (p/2)
      document.body.style.backgroundPosition = moveX+'px '+moveY+'px'

    },
    // checkLoggedIn() {
    //   const userId = localStorage.getItem('userId')
    //   if (userId !== 'null') {
    //     this.userId = userId
    //     console.log('---app-localstorage---\n' + userId);
    //   } else {
    //     this.$store.dispatch('getUserId')
    //       .then((userId) => {
    //         if (userId) {
    //           this.userId = userId
    //           console.log('---app-dispatch---\n' + userId)
    //           localStorage.setItem('userId', userId)
    //         } else {
    //           this.userId = null
    //           localStorage.removeItem('userId')
    //         }
    //       })
    //   }
    // },
    logout() {
      localStorage.removeItem('authenticate-user-token')
      localStorage.removeItem('userId')
      this.$store.dispatch('logoutAction').then(() => this.$router.push({ name: 'login' }) )
    }
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

  html,body
    font-family: $R
    font-size: 16px
    line-height: 1.5
    background-color: $space-blue
    max-height: 100vh
    max-width: 100vw
    overflow: hidden
  body
    background-image: url('assets/gfx/stars.svg')
    background-size: contain

  .logout
    position: fixed
    color: #DDD
    left: 1rem
    top: 1rem
    &:hover
      color: white

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    #view
      height: 100vh
      display: flex
      align-items: center
      justify-content: center

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

  .fade-enter-active, .fade-leave-active
    transition-duration: 0.2s
    transition-property: opacity
    transition-timing-function: ease

  .fade-enter,.fade-leave-active
    opacity: 0

</style>
