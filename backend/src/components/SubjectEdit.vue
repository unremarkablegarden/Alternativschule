<template lang="pug">
  #subejctadd
    //- el-button(type="primary", @click='dialogVisible = true') Add user

    el-dialog(title='Edit user', :visible.sync='dialogVisible', width='800', :close-on-click-modal='false', :close-on-press-escape='false', :show-close='false')

      el-form(:model='editUserForm', ref='editUserForm', :rules='rules', label-width='110px', v-loading='loading').editUserform

        el-form-item(label='Account type', prop='userType')
          el-select(v-model='editUserForm.userType', placeholder='Account type')
            el-option(v-for='(item, index) in userTypes', :key='index', :label="Cfirst(item)", :value='item')

        el-form-item(label='E-Mail', prop='email')
          el-input(type='email', v-model='editUserForm.email', placeholder="Your email address")

        el-form-item(label='First name', prop="firstname")
          el-input(type='text', v-model='editUserForm.firstname', placeholder="First name")
        el-form-item(label='Surname', prop="surname")
          el-input(type='text', v-model='editUserForm.surname', placeholder="Surname")

        el-form-item(label='Username', prop='username')
          el-input(type='username', v-model='editUserForm.username', placeholder="Type in username")

        //- el-form-item(label='Password', prop='password')
          el-input(type='password', v-model='editUserForm.password', placeholder='Type password')
        //- el-form-item(label='Confirm', prop='checkPassword')
          el-input(type='password', v-model='editUserForm.checkPassword', placeholder='Confirm password')

        el-form-item
          el-button(@click='hideDialog') Cancel

          el-button(type='primary', @click="submitForm('editUserForm')", :loading='loading', :disabled='submitDisabled')
            span(v-if='loading') Saving
            span(v-else) Edit user
</template>

<script>
import USER_TYPES from '../graphql/UserTypes.gql'
import USER_EDIT from '../graphql/UserEdit.gql'
// import ALL_USERS from '@/graphql/Users.gql'

export default {
  name: 'subjectedit',
  props: {
    editUserForm: {
      type: Object,
      default: function () {
        return {
          id: '',
          email: '',
          username: '',
          firstname: '',
          surname: '',
          // password: '',
          // checkPassword: '',
          userType: ''
        }
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // var validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('Please input the password'))
    //   } else {
    //     if (this.editUserForm.checkPass !== '') {
    //       this.$refs.editUserForm.validateField('checkPassword')
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('Please input the password again'))
    //   } else if (value !== this.editUserForm.password) {
    //     callback(new Error('Two inputs don\'t match!'))
    //   } else {
    //     callback();
    //   }
    // };

    return {
      // mutableDialogVisible: this.dialogVisible,
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
        // password: [
        //   { validator: validatePass, trigger: 'blur' }
        // ],
        // checkPassword: [
        //   { validator: validatePass2, trigger: 'change' }
        // ],
      },
      loading: false,
      error: false,
      // dialogVisible: false,
      submitDisabled: false
    }
  },
  apollo: {
    userTypes: {
      query: USER_TYPES,
      variables: {
        'enumName': "UserTypes"
      },
      update (data) {
        return data.__type.enumValues.map(o => o.name)
      }
    }
  },

  methods: {
    hideDialog () {
      this.$emit('update:dialogVisible', false)
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitDisabled = true
          this.editUser()
        } else {
          this.$message({
            type: 'info',
            message: 'Form error'
          })
          return false
        }
      });
    },

    editUser () {
      this.loading = true
      const newUser = this.editUserForm
      console.log(newUser)
      // this.clearObjProps(this.editUserForm) // snappy UI feel

      // const result = await
      this.$apollo.mutate({
        mutation: USER_EDIT,
        variables: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          firstname: newUser.firstname,
          surname: newUser.surname,
          // password: newUser.password,
          userType: newUser.userType
        },
        updateQueries: {
          allUsers: (prev, { mutationResult }) => {
            return {
              allUsers: [mutationResult.data.updateUser, ...prev.allUsers.filter(o => o.id !== mutationResult.data.updateUser.id)],
            }
          }
        }
      })
      .then((data) => {
        this.$message({
          type: 'success',
          message: 'Edit successful'
        })
        this.hideDialog()
      })
      .catch((error) => {
        console.error(error)
        this.$message({
          type: 'error',
          message: error.message
        })
        this.editUserForm = newUser
      }).then(() => {
        this.loading = false
        this.submitDisabled = false
      })

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
</style>
