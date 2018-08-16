<template lang="pug">
.user-menu(v-if='!loading')
  .top.btn
    router-link(to='/settings', v-if="routeName == 'home'")
      img(src='@/assets/gfx/icons/settings.svg')
    router-link(to='/solarsystem', v-else) 
      img(src='@/assets/gfx/icons/close-btn.svg')
  .add.btn(v-if='addLink')
    router-link(:to='addLink')    
      img(src='@/assets/gfx/icons/add.svg')
  .avatar(:data-color='myData.avatarColor')
    img(:src='"@/assets/gfx/avatars/avatar_" + myData.avatar + ".png"')
</template>

<script>
export default {
  data () {
    return {
      myData: null,
      loading: true
    }
  },
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
  methods: {
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.myData = response
        this.loading = false
      })
    }
  },
  mounted () {
    this.getMyData()
  },
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
      padding: 20px
      display: flex
      align-items: center
      justify-content: center
      border-radius: 50px
      z-index: 10
      position: relative
      // blue
      &[data-color="blue"]
        background: #4A90E2
      // orange
      &[data-color="orange"]
        background: #F5A623
      // yellow
      &[data-color="yellow"]
        background: #F8E71C
      // lightgreen
      &[data-color="lightgreen"]
        background: #7ED321
      // darkgreen
      &[data-color="darkgreen"]
        background: #417505
      // purple
      &[data-color="purple"]
        background: #BD10E0
      // pastel teal
      &[data-color="pastelteal"]
        background: #77C3B2
      // pastel orange
      &[data-color="pastelorange"]
        background: #FFD185
      // pastel pink
      &[data-color="pastelpink"]
        background: #FFB8B9
      // pastel green
      &[data-color="pastelgreen"]
        background: #CBE5B1
      // pastel red
      &[data-color="pastelred"]
        background: #FF5F73
      // pastel purple
      &[data-color="pastelpurple"]
        background: #D3A1FF
</style>
