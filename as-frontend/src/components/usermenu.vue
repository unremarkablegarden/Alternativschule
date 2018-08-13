<template lang="pug">
.user-menu
  .top.btn
    router-link(to='/settings', v-if="routeName == 'home'")
      img(src='@/assets/gfx/icons/settings.svg')
    router-link(to='/solarsystem', v-else) 
      img(src='@/assets/gfx/icons/close-btn.svg')
  .add.btn(v-if='addLink')
    router-link(:to='addLink')    
      img(src='@/assets/gfx/icons/add.svg')
  .avatar
    img(src='@/assets/gfx/avatars/avatar_01.png')
</template>

<script>
export default {
  computed: {
    addLink () {
      const r = this.$route.name 
      if (r == 'home') return '/areas'
      if (r == 'subjectView') return '/project/' + this.$route.params.subject
    },
    routeName () {
      return this.$route.name 
    }
  },
  mounted () {
  }
}
</script>

<style lang="sass" scoped>
  .user-menu
    position: fixed
    bottom: 20px
    left: 20px
    // &:hover .btn.top
    //   top: -45px
    // &:hover .btn.add
    //   right: -45px
    .btn
      position: absolute
      width: 30px
      height: auto
      transition: all 200ms
      z-index: 1
      &:hover
        opacity: .7
      &.top, &.settings 
        // top: 0px
        left: 35px
        top: -45px
      &.add
        top: 35px
        right: -45px
        // right: 0
    .avatar
      width: 100px
      height: 100px
      background: #4A90E2
      padding: 20px
      display: flex
      align-items: center
      justify-content: center
      border-radius: 50px
      z-index: 10
      position: relative
</style>
