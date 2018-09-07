<template lang="pug">
  #useradd
    el-button(type="primary", @click='dialogVisible = true', icon='el-icon-plus').add Benutzer hinzufügen

    el-dialog(title='Benutzer hinzufügen', :visible.sync='dialogVisible', width='800', :close-on-click-modal='false')

      el-form(:model='addUserForm', ref='addUserForm', :rules='rules', label-width='110px', v-loading='loading', status-icon, @keyup.enter.native="submitForm('addUserForm')").adduserform

        //- el-checkbox-group(label='Account type', prop='userType', v-model='addUserForm.userType', required, size="mini")
          el-radio-button(v-for='(item, index) in userTypes', :key='index', :label="Cfirst(item)", :value='item')

        el-form-item(label='Benutzertyp', prop='userType')
          el-select(v-model='addUserForm.userType', placeholder='Account type')
            el-option(v-for='(item, index) in userTypes', :key='index', :label="transLabel(item)", :value='item')

        el-form-item(label='E-Mail', prop='email')
          el-input(type='email', v-model='addUserForm.email', placeholder="Your email address")

        el-form-item(label='Vorname', prop="firstname")
          el-input(type='text', v-model='addUserForm.firstname', placeholder="First name")
        el-form-item(label='Nachname', prop="surname")
          el-input(type='text', v-model='addUserForm.surname', placeholder="Surname")

        el-form-item(label='Nutzername', prop='username')
          el-input(type='username', v-model='addUserForm.username', placeholder="Type in username")

        el-form-item(label='Password', prop='password')
          el-input(type='password', v-model='addUserForm.password', placeholder='Type password')
        el-form-item(label='Confirm', prop='checkPassword')
          el-input(type='password', v-model='addUserForm.checkPassword', placeholder='Confirm password')

        el-form-item
          el-button(type='primary', @click="submitForm('addUserForm')", :loading='loading', icon='el-icon-plus')
            span(v-if='loading') Hinzufügen...
            span(v-else) Benutzer hinzufügen
</template>

<script>
import USER_TYPES from '../graphql/UserTypes.gql'
import USER_ADD from '../graphql/UserAdd.gql'
import bcryptjs from 'bcryptjs'
// import ALL_USERS from '@/graphql/Users.gql'

export default {
  name: 'useradd',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.addUserForm.checkPass !== '') {
          this.$refs.addUserForm.validateField('checkPassword')
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.addUserForm.password) {
        callback(new Error('Two inputs don\'t match!'))
      } else {
        callback();
      }
    };

    return {
      addUserForm: {
        email: '',
        username: '',
        firstname: '',
        surname: '',
        password: '',
        checkPassword: '',
        userType: ''
      },
      rules: {
        userType: [
          { required: true, message: 'Account type is required', trigger: 'change' }
        ],
        email: [
          { required: true, type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ],
        firstname: [
          { required: true, message: 'First name is required', trigger: 'change' }
        ],
        surname: [
          { required: true, message: 'Surname is required', trigger: 'change' }
        ],
        username: [
          { required: true, message: 'Username is required', trigger: 'change' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
      },
      loading: false,
      error: false,
      dialogVisible: false,
      // submitDisabled: false
    }
  },
  apollo: {
    userTypes: {
      query: USER_TYPES,
      variables: {
        'enumName': "UserTypes"
      },
      update (data) {
        const values = data.__type.enumValues.map(o => o.name)
        return values
      }
    }
  },

  methods: {
    transLabel (label) {
      if (label == 'Admin') return 'Administration'
      if (label == 'Lehrer') return 'Lehrpersonen'
      if (label == 'Schueler') return 'Schüler*innen'
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.submitDisabled = true
          this.addUser()
        } else {
          this.$message({
            type: 'info',
            message: 'Form error'
          })
          return false
        }
      });
    },

    addUser () {
      this.loading = true
      const newUser = Object.assign({}, this.addUserForm)
      this.$refs.addUserForm.resetFields()

      // generate password
      const SALT_ROUNDS = 10
      const salt = bcryptjs.genSaltSync(SALT_ROUNDS)

      let saltyPassword
      if (newUser.password) {
        return bcryptjs.hash(newUser.password, salt)
          .then(hash => {
            saltyPassword = hash

            this.$apollo.mutate({
              mutation: USER_ADD,
              variables: {
                email: newUser.email,
                username: newUser.username,
                firstname: newUser.firstname,
                surname: newUser.surname,
                password: saltyPassword,
                userType: newUser.userType
              },
              updateQueries: {
                allUsers: (prev, { mutationResult }) => {
                  return {
                    allUsers: [mutationResult.data.createUser, ...prev.allUsers],
                  }
                }
              }
            })
            .then((data) => {
              // console.log(data)
              this.loading = false
              this.dialogVisible = false
            })
            .catch((error) => {
              console.error(error)
              this.$message({
                type: 'error',
                message: error.message
              })
              this.addUserForm = newUser
              this.loading = false
              // this.submitDisabled = false
            }) // end of apollo mutation
          }) // then hash promise
        } // if pw
    },

    Cfirst (value) {
      return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
    },

    clearObjProps (obj) {
      Object.keys(obj).forEach((k) => { obj[k] = null })
    }
  }
}
</script>

<style lang="sass" scoped>
  .add
    margin-top: 1em

</style>
