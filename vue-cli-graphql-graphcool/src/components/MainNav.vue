<template lang="pug">
  #mainnav
    el-menu(mode='vertical', :router='true', :default-active='$route.path')
      //- el-menu-item(index='/', v-if='loggedIn == false')
        template(slot='title')
          //- icon(name='sign-in-alt')
          icon(icon='login')
          span Login

      //- el-menu-item(index='/posts', v-if='loggedIn')
        template(slot='title')
          i.el-icon-location
          span Posts

      //- Users
      el-menu-item(index='/benutzer')
        template(slot='title')
          //- icon(name='users')
          icon(icon='people')
          span Benutzer

      //- Subjects
      el-menu-item(index='/themen')
        template(slot='title')
          //- icon(name='book-open')
          icon(icon='book-open')
          span Themen

      //- Students
      el-menu-item(index='/schueler')
        template(slot='title')
          //- icon(name='user-graduate')
          icon(icon='graduation')
          span Schüler

      //- Prefects
      el-menu-item(index='/vertrauensschueler')
        template(slot='title')
          //- icon(name='hands-helping')
          icon(icon='emotsmile')
          span Vertrauensschüler

      //- Account
      el-menu-item(index='/benutzerkonto')
        template(slot='title')
          icon(icon='settings')
          span Benutzerkonto

    el-menu(mode='vertical', :router='false')

      el-menu-item(index='logout', @click='logout')._right
        template(slot='title')
          //- icon(name='sign-out-alt')
          icon(icon='logout')
          span Log out
</template>

<script>
export default {
  name: 'topnav',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    logout() {
      localStorage.removeItem('authenticate-user-token')
      localStorage.removeItem('userId')
      this.$store.dispatch('logoutAction').then(() => this.$router.push({ name: 'login' }) )
    }
  }
}
</script>

<style lang="sass" scoped>
  .sli-svg
    margin-right: 10px
  // .fa-icon
    transform: translate(-7px, -1px)
  // .right
    float: right !important
</style>
