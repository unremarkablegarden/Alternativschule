<template lang="pug">
  #accountedit
    br
    //- div(style='margin-left: 120px')
      h1 Benutzerkonto
    el-form(:model='accountForm', ref='accountForm', label-width='150px', v-loading='$apollo.loading', :rules='rules', :status-icon='formIcon').accountForm
      el-form-item(label='Name', prop='username')
        el-input(type='text', v-model='accountForm.username')
      el-form-item(label='Email', prop='email')
        el-input(type='text', v-model='accountForm.email')
      el-form-item
        el-button(type='primary', @click="submitForm('accountForm')", :loading='$apollo.loading', icon='el-icon-check')
          span(v-if='$apollo.loading') Speichern...
          span(v-else) Speichern
</template>

<script>
import ACCOUNT_INFO from '../graphql/AccountInfo.gql'
import ACCOUNT_EDIT from '../graphql/AccountEdit.gql'

export default {
  name: 'accountedit',
  data () {
    return {
      formIcon: null,
      accountForm: {
        username: '',
        email: '',
      },
      rules: {
        email: [
          { required: true, type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ],
        username: [
          { required: true, message: 'Username is required', trigger: ['blur', 'change'] }
        ],
        // password: [
        //   { validator: validatePass, trigger: 'blur' }
        // ],
        // checkPassword: [
        //   { validator: validatePass2, trigger: 'change' }
        // ],
      },
      // loading: true,
      error: false
    }
  },

  computed: {
    userId () {
      return localStorage.getItem('userId')
    }
  },

  apollo: {
    accountInfo: {
      query: ACCOUNT_INFO,
      variables: {
        'id': localStorage.getItem('userId')
      },
      update (data) {
        this.accountForm.username = data.User.username
        this.accountForm.email = data.User.email
        return data.User
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('valid')
          this.save()
        } else {
          this.$message({
            type: 'info',
            message: 'Form error'
          })
          return false
        }
      });
    },

    save () {
      this.$apollo
        .mutate({
          mutation: ACCOUNT_EDIT,
          variables: {
            id: this.userId,
            username: this.accountForm.username,
            email: this.accountForm.email,
            // password: this.accountForm.password
          }
        })
        .then(response => {
          console.log(response)
          this.$message({
            type: 'success',
            message: 'Changes saved'
          })
          this.formIcon = 'status-icon'
        })
        .catch((error) => {
          console.error(error)
          this.$message({
            type: 'error',
            message: error.message
          })
        })
    }
  }
}
</script>

<style lang="sass">
  .accountForm
    width: 400px
    // .el-form-item__content
    //   line-height: 1em
    //   padding: 0 12px
</style>
