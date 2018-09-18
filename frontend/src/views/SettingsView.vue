<template lang="pug">
.wrapper
  .loading(v-if='loading')
    Loading
  .guibox.columns(v-else)
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
          .uploadingImg(v-if='uploadingImg')
            i.el-icon-loading
            br
            strong Uploading...
          .moreWrap(:class='{ graphic : (!uploadUrl && !myData.avatarImg) }', v-else)
            .avatar.image(:class='myData.avatarColor')

              .avatarImg-wrapper(v-if='uploadUrl')
                img(:src='uploadUrl').builtin
              .avatarImg-wrapper(v-else-if='myData.avatarImg')
                img(:src='myData.avatarImg').builtin
              img(:src='"@/assets/gfx/avatars/avatar_" + myData.avatar + ".png"', v-else).builtin

              //- img(:src='uploadUrl', v-else).builtin

              el-upload.avatar-uploader.hide(action='/', :auto-upload='false', :show-file-list='false', drag, accept='image/*', :on-change='formChanged', ref='file', v-if='uploadUrl == false')
                //- , :class='{ hide : (uploadUrl == false) }'
                //- img.avatar(v-if='uploadUrl', :src='uploadUrl')
                i.el-icon-upload.avatar-uploader-icon

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
import axios from 'axios'
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
      fileToUpload: null,
      uploadUrl: false,
      disableSubmit: true,
      loading: true,
      uploadingImg: false,
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
  // computed: {
  //   avatarSquare () {
  //     let img
  //     let img1 = this.myData.avatarImg
  //     let img2 = this.uploadUrl
  //     if (img1 || img2) {
  //       if (img1) img = img1
  //       else img = img2
  //
  //       upload/
  //     } else {
  //       return null
  //     }
  //       // https://res.cloudinary.com/nilsolleoskar/image/upload/c_fill,g_face,h_600,q_80,w_600/v1537183652/Alternativschule/ck5grli82thx3s78zezn.jpg
  //
  //   }
  // },
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
        console.log('ava img: '+this.myData.avatarImg)
        this.loading = false
      })
    },
    changeAvatar (i) {
      this.myData.avatar = i
      this.uploadUrl = null
      this.myData.avatarImg = null
      this.apolloAvatar()
      console.log(this.myData)
    },
    changeColor (c) {
      this.myData.avatarColor = c
      this.apolloAvatar()
    },
    apolloAvatar () {
      const id = localStorage.getItem('userId')
      let newImage
      if (this.uploadUrl) {
        newImage = this.uploadUrl.replace('upload/', 'upload/c_fill,g_face,h_600,q_80,w_600/')
        this.uploadUrl = newImage
      } else if (this.myData.avatarImg) {
        newImage = this.myData.avatarImg
      } else {
        newImage = null
      }
      this.$apollo.mutate({
        mutation: gql`mutation ($id: ID!, $avatar: Int!, $avatarColor: String!, $avatarImg: String) {
          updateUser(id: $id, avatar: $avatar, avatarColor: $avatarColor, avatarImg: $avatarImg) {
            id
            username
            avatar
            avatarColor
            avatarImg
          }
        }`,
        variables: {
          id: id,
          avatar: this.myData.avatar,
          avatarColor: this.myData.avatarColor,
          avatarImg: newImage
        },
        update: (store, { data }) => {

        }
      }).then((data) => {
        // console.log('then')
        this.$message({
           type: 'success',
           message: 'Avatar Gespeichert'
        })
        this.$apolloProvider.defaultClient.reFetchObservableQueries()
        this.uploadingImg = false
        console.log(data)
      }).catch((error) => {
        console.error(error)
        this.$message({
          type: 'error',
          message: error
        })
        this.uploadingImg = false
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
    },

    formChanged () {
      this.uploadingImg = true
      const file = this.$refs.file.$children[0].fileList[0].raw
      this.$refs.file.clearFiles()
      const maxFileSize = 500 * 1024 // 500kb
      if (file.size > maxFileSize) {
        this.$message({
          type: 'error',
          message: 'File too large (max 500kb)'
        })
        this.uploadingImg = false
      } else if (!file.type.includes('image')) {
        this.$message({
          type: 'error',
          message: 'File must be an image'
        })
        this.uploadingImg = false
      } else {
        this.fileToUpload = file
        this.uploadFile()
      }
      console.log(file)
      // this.uploadFile()
    },

    uploadFile () {
      // const file = this.$refs.file.$children[0].fileList[0].raw
      const file = this.fileToUpload
      // this.form.file = file
      const clConf = {
        cloud_name: 'nilsolleoskar',
        secure: true,
        unsignedUploadPreset: 'jnlwa8it'
      }
      const url = 'https://api.cloudinary.com/v1_1/' + clConf.cloud_name + '/upload'

      let fd = new FormData()
      fd.append("upload_preset", clConf.unsignedUploadPreset)
      fd.append("file", file)

      const config = { headers: { "X-Requested-With": "XMLHttpRequest" } }

      axios.post(url, fd, config)
        .then((res) => {
          const response = res.data
          const url = response.secure_url
          this.uploadUrl = url
          this.apolloAvatar()
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error('err', err)
          this.uploadingImg = false
        })
    },
  }
}
</script>

<style lang="sass">
  .el-upload-dragger
    width: 27vw !important
    height: 27vw !important
    border-radius: 13.5vw !important
    transition: all 500ms !important
    border: 0
    // background: #FF050
    &.is-dragover
      background: #FFF40 !important
    .el-icon-upload
      margin-top: 11vw !important
  .hide .el-upload-dragger
    opacity: 0 !important
    border: 1px dashed #d9d9d9
  .hide .el-upload-dragger.is-dragover
    opacity: 1 !important
</style>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  .avatarImg-wrapper
    overflow: hidden
    width: 22vw
    height: 22vw
    border-radius: 11vw

  .builtin
    height: 22vw !important
    // width: 22vw !important
    width: auto !important
    max-width: none
    border-radius: 11vw

  .uploadingImg
    width: 22vw
    height: 22vw
    display: flex
    justify-content: center
    align-items: center
    color: #CCC !important

  .avatar-uploader
    position: fixed
    width: 27vw
    height: 27vw
    border-radius: 13.5vw
    // &.hide
      // opacity: 0 !important
  .guibox
    text-align: left
    overflow-x: hide
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
          height: 3.5vw
          width: 3.5vw
          border-radius: 3.5vw
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
          // width: 300px
          // height: 300px
          border-radius: 50%
          padding: 1em
          display: flex
          align-items: center
          justify-content: center
          margin: 0 auto
          img
            width: 100%
            // width: 80%
            height: auto
      .graphic .avatar
        padding: 1em !important
        img
          border-radius: 0

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
