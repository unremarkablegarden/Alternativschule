<template lang="pug">
  #useredit
    //- el-button(type="primary", @click='dialogVisible = true') Add user

    el-dialog(title='Benutzer Bearbeiten', :visible.sync='dialogVisible', width='780', :close-on-click-modal='false', :close-on-press-escape='false', :show-close='false')

      el-form(:model='editUserForm', ref='editUserForm', :rules='rules', label-width='140px', v-loading='loading', @keyup.enter.native="submitForm('editUserForm')").editUserform

        el-form-item(label='Benutzertyp', prop='userType')
          el-select(v-model='editUserForm.userType', placeholder='Account type')
            el-option(v-for='(item, index) in userTypes', :key='index', :label="Cfirst(item)", :value='item')

        el-form-item(label='E-Mail', prop='email')
          el-input(type='email', v-model='editUserForm.email', placeholder="Your email address")

        el-form-item(label='Vorname', prop="firstname")
          el-input(type='text', v-model='editUserForm.firstname', placeholder="First name")
        el-form-item(label='Nachname', prop="surname")
          el-input(type='text', v-model='editUserForm.surname', placeholder="Surname")

        el-form-item(label='Nutzername', prop='username')
          el-input(type='username', v-model='editUserForm.username', placeholder="Type in username")

        el-form-item(label='Vertrauensschüler', prop='prefect', v-if='editUserForm.userType == "Lehrer"')
          el-switch(v-model='editUserForm.prefect')

        el-form-item
          el-button(@click='hideDialog', icon='el-icon-close') Stornieren

          el-button(type='primary', @click="submitForm('editUserForm')", :loading='loading', :disabled='submitDisabled', icon='el-icon-check')
            span(v-if='loading') Speichern...
            span(v-else) Speichern
</template>

<script>
import USER_TYPES from '../graphql/UserTypes.gql'
import USER_EDIT from '../graphql/UserEdit.gql'
// import ALL_USERS from '@/graphql/Users.gql'

export default {
  name: 'useredit',
  // watch: {
  //   editUserForm (e) {
  //     console.log(e)
  //   }
  // },
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
          userType: '',
          prefect: false
        }
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
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

      },
      loading: false,
      error: false,
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
          userType: newUser.userType,
          prefect: newUser.prefect
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
