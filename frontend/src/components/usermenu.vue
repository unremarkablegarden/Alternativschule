<template lang="pug">
.user-menu(v-if='!loading')
  .top.btn
    router-link(to='/settings', v-if="routeName == 'home'")
      img(src='@/assets/gfx/icons/settings.svg')
    router-link(:to='closeLink', v-else)
      img(src='@/assets/gfx/icons/close-btn.svg')
  .add.btn(v-if='addLink')
    router-link(:to='addLink')
      img(src='@/assets/gfx/icons/add.svg')
  .avatar(:data-color='myData.avatarColor')
    .avatarImg-wrapper(v-if='myData.avatarImg')
      img(:src='myData.avatarImg').avatarImg
    img(v-else, :src='"@/assets/gfx/avatars/avatar_" + myData.avatar + ".png"')
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      myData: null,
      loading: true
    }
  },
  computed: {
    isSpacestation () {
      if (this.$route.params.subject == 'space-station') {
        return true
      } else {
        return false
      }
    },
    addLink () {
      const r = this.$route.name
      if (r == 'home') return '/areas'
      if (r == 'subjectView') return '/project/' + this.$route.params.subject
      if (r == 'subjectViewLevel') return '/project/' + this.$route.params.subject
    },
    closeLink () {
      const r = this.$route.name
      if (this.isSpacestation && r == 'projectview') return '/solarsystem'
      else if (r == 'projectview') return '/subject/' + this.$route.params.subject
      else if (r == 'levelview') return '/project/' + this.$route.params.subject
      else return '/solarsystem'
    },
    routeName () {
      return this.$route.name
    }
  },
  methods: {
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        let data = JSON.parse(JSON.stringify(response))
        this.myData = data
        this.loading = false
      })
    }
  },
  apollo: {
    $subscribe: {
      userUpdated: {
        query: gql`subscription updateUser($id: ID!) {
          User(
            filter: {
              mutation_in: [UPDATED]
              node: {
                id: $id
              }
            }
          ) {
            mutation
            node {
              avatar
              avatarColor
              avatarImg
            }
            updatedFields
          }
        }`,
        variables () {
          return {
            id: localStorage.getItem('userId')
          }
        },
        result (data) {
          console.log('subscription: avatar updated');
          this.myData.avatar = data.data.User.node.avatar
          this.myData.avatarColor = data.data.User.node.avatarColor
          this.myData.avatarImg = data.data.User.node.avatarImg
        }
      }
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
      .avatarImg-wrapper
        height: 90px
        width: 90px
        overflow: hidden
        border-radius: 90px
      .avatarImg
        height: 90px
        width: auto !important
        max-width: none
      width: 100px
      height: 100px
      padding: 5px
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
