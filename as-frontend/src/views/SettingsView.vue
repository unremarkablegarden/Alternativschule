<template lang="pug">
.wrapper
  .guibox.columns
    .column.is-6.left-zone
      .avatar-grid.columns.is-multiline
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_01.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_02.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_03.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_04.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_05.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_06.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_07.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_08.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_09.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_10.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_11.png')
        .column.is-3
          .avatar.image.is-square
            img(src='@/assets/gfx/avatars/avatar_12.png')
      .colors.columns.is-multiline
        .color.column.is-2
          .dot.blue
        .color.column.is-2
          .dot.orange
        .color.column.is-2
          .dot.yellow
        .color.column.is-2
          .dot.lightgreen
        .color.column.is-2
          .dot.darkgreen
        .color.column.is-2
          .dot.purple
        .color.column.is-2
          .dot.pastelteal
        .color.column.is-2
          .dot.pastelorange
        .color.column.is-2
          .dot.pastelpink
        .color.column.is-2
          .dot.pastelgreen
        .color.column.is-2
          .dot.pastelred
        .color.column.is-2
          .dot.pastelpurple
            
        //- .column.is-2(:v-for='color in colors')
        //-   .dot.is-square
        //-     | {{ color }}
    .column.right-zone
      .avatar-wrap
        .avatar.image.is-square.orange
          img(src='@/assets/gfx/avatars/avatar_06.png')
      .info
        form
          p Name:
          input(type='text', name='name', placeholder='j.robinson' )
          p Passwort
          input(type='text', name='password', placeholder='laufente44')
          button.button.grassgreen Speichern
          button.button Verwerfen
</template>

<script>
export default {
  components: {
  },
  data () {
    return {  
      colors: [
        'blue', 'orange', 'yellow', 'lightgreen', 'darkgreen', 'purple'
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
    background: #B8E986
  .left-zone
    border-right: 2px solid $teal
    .avatar-grid
      border-bottom: 2px solid $teal
      padding: 1rem
    .avatar
      background: $grey
      border-radius: 10px
      display: flex
      align-items: center
      justify-content: center
      img
        width: auto
        height: 75%
    .colors
      padding: 1rem
      .color
        display: flex
        align-items: center
        .dot
          height: 40px
          width: 40px
          border-radius: 50%
          &:hover
            border: 2px solid #fff
            cursor: pointer
  .right-zone
    padding: 0 6rem
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
        border-radius: 50%
        img
          width: 80%
          height: auto
    .button
      font-size: .815rem
      margin: 1em
      border-radius: .5em
</style>
