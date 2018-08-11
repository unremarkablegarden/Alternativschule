<template lang="pug">
  #accountedit
    el-form(:model='accountForm', ref='accountForm', label-width='120px').accountForm
      el-form-item(label='Betnutzername')
        el-input(type='text', v-model='accountForm.username')
      el-form-item(label='Email')
        el-input(type='text', v-model='accountForm.email')
      el-form-item(label='Kennwort')
        el-input(type='password', v-model='accountForm.password')
      el-form-item
        el-button(type='primary', @click='save', :loading='loading', icon='el-icon-check')
          span(v-if='loading') Speichern...
          span(v-else) Speichern
</template>

<script>
// import LOGGED_IN_USER from '@/graphql/LoggedInUser.gql'
import ACCOUNT_INFO from '../graphql/AccountInfo.gql'

export default {
  name: 'accountedit',
  data () {
    return {
      accountForm: {
        username: '',
        email: '',
        password: ''
      },
      loading: false,
      error: false
    }
  },

  mounted () {
    console.log(this.userId)
  },

  computed: {
    userId () {
      return localStorage.getItem('userId')
    }
  },

  // apollo: {
  //   allSubjects: {
  //     query: ACCOUNT_INFO,
  //     variables: {
  //       'id': this.userId
  //     },
  //     // loadingKey: 'loading',
  //     update (data) {
  //
  //     },
  //     result (data) {
  //       // this.loadingUsers = false
  //       console.log(data)
  //     }
  //   }
  // },

  methods: {
    save () {
      this.loading = true
      this.error = false

    	this.$apollo
    		.query({
    			mutation: ACCOUNT_INFO,
    			variables: {
    				email: this.loginForm.email,
    				password: this.loginForm.password
    			}
    		})
    		.then(response => {
          console.log('-- auth success -- ')
          const token = response.data.authenticateUser.token
    			// save user token to localstorage
    			localStorage.setItem('authenticate-user-token', token)
          // change App.vue token variable
          // this.$emit('token', token)
          this.$store.commit('setLoggedIn', true)
          // this.$parent.token = token
          this.$router.push({ name: 'users' })
    		})
        .catch((error) => {
          console.error(error)
          console.log('Wrong credentials')
          this.error = true
        })
        .then(() => {
          this.loading = false
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
