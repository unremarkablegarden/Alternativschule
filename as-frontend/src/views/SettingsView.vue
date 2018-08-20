<template lang="pug">
.wrapper
  .guibox.columns(v-if='!loading')
    .column.is-6.left-zone
      .avatar-grid.columns.is-multiline
         .column.is-3(v-for='(avatar, index) in avatars').avatar
          .image(@click='changeAvatar(index+1)')
            img(:src='"@/assets/gfx/avatars/avatar_" + avatar + ".png"')
      .colors.columns.is-multiline
        .color.column.is-2(v-for='color in colors')
          .dot(@click='changeColor(color)', :class='color')
    .column.right-zone
      .flex-wrap
        .avatar-wrap
          .avatar.image(:class='myData.avatarColor')
            img(:src='"@/assets/gfx/avatars/avatar_" + myData.avatar + ".png"')
        .info
          el-form(:model='form', ref='form', :rules='rules', @keyup.enter.native="submitForm('form')").form
            p Benutzername
            el-form-item(prop='username')
              el-input(type='text', name='name', v-model='form.username')
            p Kennwort
            el-form-item(prop='password')
              el-input(type='password', name='password', placeholder='Kennwort eingeben', v-model='form.password')
            p
            el-form-item(prop='checkPassword')
              el-input(type='password', name='checkPassword', placeholder='Kennwort noch einmal eingeben', v-model='form.checkPassword')
            p.center
              el-button(type='primary', size='medium', icon='el-icon-check', :loading='loading', @click="submitForm('form')", :disabled='disableSubmit') Speichern
              //- button.button Verwerfen
</template>

<script>
import gql from 'graphql-tag'
// import ACCOUNT_PASSWORD_RESET from '../graphql/AccountPasswordReset.gql'
import bcryptjs from 'bcryptjs'

export default {
  components: {
  },
  data () {
    var validatePass = (rule, value, callback) => {
      this.disableSubmit = true
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword')
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      this.disableSubmit = true
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error('Two inputs don\'t match!'))
      } else {
        this.disableSubmit = false
        callback();
      }
    };

    return {
      disableSubmit: true,
      loading: true,
      avatars: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
      ],
      colors: [
        'blue', 'orange', 'yellow', 'lightgreen', 'darkgreen', 'purple', 'pastelteal', 'pastelorange', 'pastelpink', 'pastelgreen', 'pastelred', 'pastelpurple'
      ],
      myData: null,
      form: {
        username: null,
        password: null,
        checkPassword: null
      },
      rules: {
        username: [
          { required: true }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    // console.log(this.$apollo)
    this.getMyData()
  },
  methods: {
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        let data = JSON.parse(JSON.stringify(response))
        this.myData = data
        this.form.username = this.myData.username
        // console.log(this.myData)
        this.loading = false
      })
    },
    changeAvatar (i) {
      this.myData.avatar = i
      this.apolloAvatar()
      console.log(this.myData)
    },
    changeColor (c) {
      this.myData.avatarColor = c
      this.apolloAvatar()
    },
    apolloAvatar () {
      const id = localStorage.getItem('userId')
      this.$apollo.mutate({
        mutation: gql`mutation ($id: ID!, $avatar: Int!, $avatarColor: String!) {
          updateUser(id: $id, avatar: $avatar, avatarColor: $avatarColor) {
            id
            username
            avatar
            avatarColor
          }
        }`,
        variables: {
          id: id,
          avatar: this.myData.avatar,
          avatarColor: this.myData.avatarColor
        },
        update: (store, { data }) => {
          this.$apolloProvider.defaultClient.reFetchObservableQueries()
        }
      }).then((data) => {
        // console.log('then')
        this.$message({
           type: 'success',
           message: 'Avatar Gespeichert'
        })
        console.log(data)
      }).catch((error) => {
        console.error(error)
        this.$message({
          type: 'error',
          message: error
        })
      })
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('valid')
          this.updateStudent()
        } else {
          this.$message({
            type: 'error',
            message: 'Form error'
          })
          return false
        }
      });
    },

    updateStudent () {
      const id = localStorage.getItem('userId')
      const newPass = this.form.password

      const salt = bcryptjs.genSaltSync(10)
      let saltyPassword

      if (newPass && id) {
        return bcryptjs.hash(newPass, salt)
          .then(hash => {
            saltyPassword = hash
            this.$apollo.mutate({
              mutation: gql`mutation ($id: ID!, $username: String! $password: String!) {
                updateUser(id: $id, username: $username, password: $password) {
                  id
                  username
                  password
                }
              }`,
              variables: {
                id: id,
                username: this.form.username,
                password: saltyPassword
              },
              update: (store, { data }) => {
              }
            }).then((data) => {
              this.$message({
                 type: 'success',
                 message: 'Gespeichert'
              })
              // resetFields()
              this.form.password = null
              this.form.checkPassword = null
              this.$refs.form.clearValidate()
              console.log(data)
            }).catch((error) => {
              console.error(error)
              this.$message({
                type: 'error',
                message: error
              })
            })
          })
        }
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
    // padding: 0 3rem
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

  .form
    p
      margin: 1em 0 0.5em
    p.center
      margin-top: 1.5em
</style>
