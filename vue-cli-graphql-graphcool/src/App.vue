<template lang="pug">
  #app
    el-container
      el-header
        TopNav
      el-main
        router-view
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import LOGGED_IN_USER from '@/graphql/LoggedInUser.gql'

export default {
  name: 'App',
  components: {
    TopNav
  },
  data () {
    return {
      
    }
  },
  mounted () {
    this.checkLoggedIn()
  },
  methods: {
    checkLoggedIn () {
      this.$apollo
        .query({ query: LOGGED_IN_USER })
        .then(response => {
          let loggedIn
          const token = response.data.loggedInUser.id
          if (token) {
            loggedIn = true
          }
          else {
            loggedIn = false
          }
          this.$store.commit('setLoggedIn', loggedIn)
        })
        .catch((error) => {
          console.error(error)
          this.loggedIn = false
        })
    }
  }
}
</script>


<style lang="sass">
  // @import '~bulma/bulma.sass'
  @import '~bulma/sass/utilities/_all'
  @import "~bulma/sass/base/_all"
  @import "~bulma/sass/grid/columns"

  #app
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    a
      color: #66b1ff
      text-decoration: none
</style>
