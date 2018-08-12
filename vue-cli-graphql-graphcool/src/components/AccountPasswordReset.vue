<template lang="pug">
  #accountedit
    el-form(:model='accountForm', ref='accountForm', label-width='120px', v-loading='$apollo.loading', :rules='rules', :status-icon='formIcon').accountForm
      //- el-form-item(label='Betnutzername', prop='username')
        el-input(type='text', v-model='accountForm.username')
      //- el-form-item(label='Email', prop='email')
        el-input(type='text', v-model='accountForm.email')
      el-form-item(label='Kennwort', prop='password')
        el-input(type='password', v-model='accountForm.password', placeholder='Type password')
      el-form-item(label='Bestätigen', prop='checkPassword')
        el-input(type='password', v-model='accountForm.checkPassword', placeholder='Confirm password')
      el-form-item
        el-button(type='primary', @click="submitForm('accountForm')", :loading='$apollo.loading', icon='el-icon-check')
          span(v-if='$apollo.loading') Speichern...
          span(v-else) Speichern
</template>

<script>
import ACCOUNT_PASSWORD_RESET from '../graphql/AccountPasswordReset.gql'
import bcryptjs from 'bcryptjs'

export default {
  name: 'accountedit',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.accountForm.checkPass !== '') {
          this.$refs.accountForm.validateField('checkPassword')
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.accountForm.password) {
        callback(new Error('Two inputs don\'t match!'))
      } else {
        callback();
      }
    };

    return {
      formIcon: null,
      accountForm: {
        password: '',
        checkPassword: ''
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ]
      }
    }
  },

  computed: {
    userId () {
      return localStorage.getItem('userId')
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
            type: 'error',
            message: 'Form error'
          })
          return false
        }
      });
    },

    save () {
      // const newPass = Object.assign({}, this.accountForm)
      const newPass = this.accountForm.password
      this.$refs.accountForm.resetFields()

      const salt = bcryptjs.genSaltSync(10)
      let saltyPassword
      if (newPass) {
        return bcryptjs.hash(newPass, salt)
          .then(hash => {
            this.$apollo
              .mutate({
                mutation: ACCOUNT_PASSWORD_RESET,
                variables: {
                  id: this.userId,
                  password: hash
                }
              })
              .then(response => {
                console.log(response)
                this.$message({
                  type: 'success',
                  showClose: true,
                  message: 'Password updated'
                })
                // this.formIcon = 'status-icon'
              })
              .catch((error) => {
                console.error(error)
                this.$message({
                  type: 'error',
                  message: error.message
                })
              })
          }) // bcrypt then...

      } else {
        this.$message({
          type: 'error',
          message: 'Form error #2'
        })
      }// if newPass
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
