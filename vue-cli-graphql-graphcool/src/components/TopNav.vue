<template lang="pug">
  #nav
    el-menu(mode='horizontal', :router='true', :default-active='$route.path')
      el-menu-item(index='/', v-if='loggedIn == false') Login
      el-menu-item(index='/posts', v-if='loggedIn') Posts
      el-menu-item(index='/users', v-if='loggedIn') Users
      el-menu-item(index='/', @click='logout', v-if='loggedIn').right Log out
</template>

<script>
export default {
  name: 'topnav',
  data () {
    return {
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.loggedIn
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('authenticate-user-token')
      this.$store.commit('setLoggedIn', false)
      // location.reload()
    }
  }
}
</script>

<style lang="sass" scoped>
  .right
    float: right !important
</style>
