<template lang="pug">
  .root
    el-form(:model='loginForm', ref='loginForm', label-width='120px').loginform
      el-form-item(label='E-Mail')
        el-input(type='email', v-model='loginForm.email', autofocus='true')
      el-form-item(label='Password')
        el-input(type='password', v-model='loginForm.password')
      el-form-item(v-if='error')
        el-alert(title="Incorrect E-mail or Password", type="error", :closable="false", show-icon, description="Please try again")
      el-form-item
        el-button(type='primary', @click='login', :loading='loading')
          span(v-if='loading') Logging in
          span(v-else) Log in
</template>

<script>
import LOGIN_MUTATION from '../graphql/Login.gql'

export default {
  name: 'loginForm',
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loading: false,
      error: false
    }
  },
  methods: {
    login () {
      this.loading = true
      this.error = false

    	this.$apollo
    		.mutate({
    			mutation: LOGIN_MUTATION,
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
    			// redirect user
    			this.$router.replace('/posts')
    		})
        .catch((error) => {
          // console.error(error)
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
  .loginform
    width: 500px
    .el-form-item__content
      line-height: 1em
      padding: 0 12px
</style>
