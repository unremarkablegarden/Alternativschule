<template lang="pug">
.wrapper
  .guibox.columns
    .column.is-6.left-zone
      .avatar-grid.columns.is-multiline
        .column.is-3(v-for='avatar in avatars', @click='avatarImage = avatar').avatar
          .image
            img(:src='"@/assets/gfx/avatars/avatar_" + avatar + ".png"')
      .colors.columns.is-multiline
        .color.column.is-2(v-for='color in colors')
          .dot(@click='avatarColor = color', :class='color')
    .column.right-zone
      .flex-wrap
        .avatar-wrap
          .avatar.image(:class='avatarColor')
            img(:src='"@/assets/gfx/avatars/avatar_" + avatarImage + ".png"')
        .info
          form
            p Name:
            input(type='text', name='name', placeholder='j.robinson' )
            p Passwort
            input(type='text', name='password', placeholder='laufente44')
            .buttons
              button.button.grassgreen Speichern
              button.button Verwerfen
</template>

<script>
export default {
  components: {
  },
  data () {
    return {  
      avatars: [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' 
      ],
      avatarImage : '01',
      avatarColor: 'blue',
      colors: [
        'blue', 'orange', 'yellow', 'lightgreen', 'darkgreen', 'purple', 'pastelteal', 'pastelorange', 'pastelpink', 'pastelgreen', 'pastelred', 'pastelpurple'
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  .guibox
    text-align: left
    overflow-x: scroll
  .left-zone
    border-right: 2px solid $teal
    .avatar-grid
      border-bottom: 2px solid $teal
      padding: 1rem
    .avatar      
      .image
        background: $grey
        border-radius: 10px
        padding: .5rem
        &:hover
          background: $lightgrey
          cursor: pointer
    .colors
      padding: 1rem
      .color
        display: flex
        align-items: center
        .dot
          height: 50px
          width: 50px
          border-radius: 25px
          &:hover
            border: 2px solid #fff
            cursor: pointer
  .right-zone
    padding: 0 3rem
    display: flex
    align-items: center
    justify-content: center
    .flex-wrap
      input
        border: none
        padding: .9em
        line-height: 1
        border-radius: 1em
        width: 100%
        margin-bottom: 1em
        font-size: .8rem
      .avatar-wrap
        padding: 2rem
        .avatar 
          width: 300px
          height: 300px
          border-radius: 150px
          padding: 1em
          display: flex
          align-items: center
          justify-content: center
          margin: 0 auto
          img
            width: 80%
            height: auto
      .buttons
        display: flex
        justify-content: center
        .button
          font-size: .815rem
          margin: 1em
          border-radius: .5em
  .blue
    background: #4A90E2
  .orange
    background: #F5A623
  .yellow
    background: #F8E71C
  .lightgreen
    background: #7ED321
  .darkgreen
    background: #417505
  .purple
    background: #BD10E0
  .pastelteal
    background: #77C3B2
  .pastelorange
    background: #FFD185
  .pastelpink
    background: #FFB8B9
  .pastelgreen
    background: #CBE5B1
  .pastelred
    background: #FF5F73
  .pastelpurple
    background: #D3A1FF
  .grassgreen
    background: #97c963
</style>
