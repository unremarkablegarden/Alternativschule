<template lang="pug">
  .container
    el-container#wrapper
      el-header#header
        h1(v-if='showMenu()')#logo Alternativschule Berlin
      el-container#main
        el-aside(width='220px', v-if='showMenu()')
          MainNav
        el-main
          router-view()
</template>

<script>
import MainNav from '@/components/MainNav.vue'
import LOGGED_IN_USER from '@/graphql/LoggedInUser.gql'
// import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    MainNav
  },
  data () {
    return {
      userId: null
    }
  },
  created () {
    this.checkLoggedIn()
  },
  watch: {
    $route (to, from) {
      this.checkLoggedIn()
    }
  },
  methods: {
    showMenu () {
      if (this.userId && this.$route.path !== '/') {
        return true
      }
      else {
        return false
      }
    },
    checkLoggedIn() {
      const userId = localStorage.getItem('userId')
      if (userId !== 'null') {
        this.userId = userId
        console.log('---app-localstorage---\n' + userId);
      } else {
        this.$store.dispatch('getUserId')
          .then((userId) => {
            if (userId) {
              this.userId = userId
              console.log('---app-dispatch---\n' + userId)
              localStorage.setItem('userId', userId)
            } else {
              this.userId = null
              localStorage.removeItem('userId')
            }
          })
      }
    }

    // checkToken () {
    //   const token = localStorage.getItem('authenticate-user-token')
    //   if (token) {
    //     this.loggedIn = true
    //   } else {
    //     this.loggedIn = false
    //   }
    // },

    // async setUserId () {
    //   return new Promise((resolve, reject) => {
    //     this.$store.dispatch('setUserId')
    //       .then( () => {
    //         const userId = this.$store.state.userId
    //         // console.log('dispatchd userId: ' + userId)
    //         if (userId) {
    //           this.userId = userId
    //           this.loggedIn = true
    //           resolve()
    //         } else {
    //           console.log('—— async checkLoggedIn fail ——')
    //           this.userId = null
    //           this.loggedIn = false
    //           reject()
    //         }
    //       })
    //   })
    // }

    // async asyncCheck () {
    //   this.checkLoggedIn().then(() => {
    //     console.log('async: ' + this.userId)
    //     this.$store.dispatch('setUserIdAction', this.userId)
    //       .then(() => {
    //         console.log('dispatch callback')
    //       })
    //   })
    // },

    // async checkLoggedIn () {
    //   // this.loggedIn = this.$store.state.loggedIn
    //   // console.log(this.$store.getters.getLoggedIn)
    //   // this.$store.dispatch('checkLoggedIn')
    //   //   .then(() => {
    //   //     const id = this.$store.state.loggedInID
    //   //     console.log(id)
    //   //   })
    //   // console.log('checkLoggedIn('+origin+') = ' + this.loggedIn)
    //   // WEIRD TIMING ISSUE
    //
    //   return new Promise((resolve, reject) => {
    //   // try {
    //     this.$apollo
    //       .query({ query: LOGGED_IN_USER })
    //       .then(response => {
    //         // console.log('-- apollo check --')
    //         // console.log(response)
    //         // let loggedIn
    //         const id = response.data.loggedInUser.id
    //         this.userId = id
    //         // console.log('user id: ' + id)
    //         // if (id) {
    //         //   loggedIn = id
    //         // } else {
    //         //   loggedIn = true // fix!
    //         // }
    //         // this.loggedIn = id
    //         // console.log('this.loggedIn: ' + this.loggedIn)
    //         // this.$store.commit('setLoggedIn', id)
    //         resolve()
    //       })
    //       .catch((error) => {
    //         reject()
    //         console.error(error)
    //         this.loggedIn = false
    //       })
    //   })
    //
    // }
  }
}
</script>


<style lang="sass">
  @import "~bulma/sass/utilities/_all"
  @import "~bulma/sass/base/generic"
  @import "~bulma/sass/base/helpers"
  @import "~bulma/sass/grid/columns"
  @import "~bulma/sass/elements/container"
  @import "~bulma/sass/layout/section"
  @import url('https://fonts.googleapis.com/css?family=Archivo+Black|Roboto')

  // body *
  //   transition: height 200ms

  #logo
    // text-align: center
    font-family: "Roboto","Helvetica Neue",Helvetica,Arial,sans-serif
    font-weight: normal
    font-size: 1.2em
    letter-spacing: 0.02em
    margin-left: 222px
    margin-top: 1.3em

  #app
    font-family: "Roboto","Helvetica Neue",Helvetica,Arial,sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
  a
    color: #66b1ff
    text-decoration: none

  h1, h2, h3, h4, h5
    font-family: "Archivo Black","Helvetica Neue",Helvetica,Arial,sans-serif

  .right
    float: right

  .el-menu
    border: 0 !important

  main h1
    margin: 0 0 0.8em
    font-weight: normal
    letter-spacing: 0.01em

  // partial bulma minireset
  body, html
    margin: 0
    padding: 0
    background: #fdfdfd
  html
    box-sizing: border-box
  *
    &,
    &::before,
    &::after
      box-sizing: inherit
  img,
  audio,
  video
    height: auto
    max-width: 100%
  iframe
    border: 0
  table
    border-collapse: collapse
    border-spacing: 0
  td,
  th
    padding: 0
    text-align: left

</style>
