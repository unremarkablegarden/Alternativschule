<template lang="pug">
  #loginform
    el-card(class='card')
      .clearfix(slot='header')
        center
          span Alternativschule Berlin
      el-form(:model='loginForm', ref='loginForm', label-width='120px', @keyup.enter.native='login').loginform
        el-form-item(label='Username')
          el-input(type='text', v-model='loginForm.username', autofocus='true')
        el-form-item(label='Kennwort')
          el-input(type='password', v-model='loginForm.password')
        el-form-item(v-if='error')
          el-alert(title="Incorrect", type="error", :closable="false", show-icon, description="Please try again")
        //- el-form-item
      center
        el-button(type='primary', @click='login', :loading='loading')
          span(v-if='loading') Einloggen...
          span(v-else) Einloggen
</template>

<script>
import LOGIN_MUTATION from '../graphql/Login.gql'

export default {
  name: 'loginForm',
  data () {
    return {
      loginForm: {
        username: '',
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
    				username: this.loginForm.username,
    				password: this.loginForm.password
    			}
    		})
    		.then(response => {
          console.log('-- auth success -- ')
          const token = response.data.authenticateUser.token

          // save user token to localstorage
    			localStorage.setItem('authenticate-user-token', token)
          // console.log('token: ' + token)

          // get the user ID and save in localStorage
          this.$store.dispatch('getUserId')
            .then((res) => {
              localStorage.setItem('userId', res)
              console.log('userId: ' + res)

              this.$router.push({ name: 'home' })

              // get the db from graphcool via apollo and save in state.db
              // this.$store.dispatch('getDb').then((res) => {
              //   this.loading = false
              //   this.$router.push({ name: 'store' })
              // })
            })
    		})
        .catch((error) => {
          console.error(error)
          console.log('Wrong credentials')
          this.error = true
          this.loading = false
        })
        .then(() => {
        })
    }
  }
}
</script>

<style lang="sass">
  .card
    width: 500px
    margin: 20px auto 0
  .loginform
    width: 400px
    .el-form-item__content
      line-height: 1em
      padding: 0 12px
</style>
