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
      center
        el-button(type='primary', @click='login', :loading='loading')
          span(v-if='loading') Einloggen...
          span(v-else) Einloggen
</template>

<script>
import LOGIN_MUTATION from '../graphql/Login.gql'
// import LOGGED_IN_USER from '@/graphql/LoggedInUser.gql'

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
  created () {
    // console.log(this.$route.query.error)
  },
  methods: {
    logout () {
      localStorage.removeItem('authenticate-user-token')
      localStorage.removeItem('userId')
      this.$store.dispatch('logoutAction')
      sessionStorage.clear()
      localStorage.clear()
      this.$apolloProvider.defaultClient.resetStore()
      this.$apolloProvider.defaultClient.cache.reset()
      setTimeout(function () {
        // window.location.reload(true)
      }, 1000)
      // this.$apolloProvider.defaultClient.reFetchObservableQueries()
      // console.log(this.$apolloProvider);
      // this.$apolloProvider.defaultClient.resetStoreCallbacks()
    },
    login () {
      this.loading = true
      this.error = false

    	this.$apollo
    		.mutate({
    			mutation: LOGIN_MUTATION,
    			variables: {
    				username: this.loginForm.username,
    				password: this.loginForm.password
    			},
          update: (store) => {
            // console.log(store)
            console.log(this.loginForm.username)
          }
    		})
    		.then(response => {
          console.log('-- auth success -- ')

          const token = response.data.authenticateUser.token
          console.log(token)
          console.log(response.data)

          // save user token to localstorage
    			localStorage.setItem('authenticate-user-token', token)

          this.$store.dispatch('getUserId')
            .then((res) => {
              localStorage.setItem('userId', res)
              console.log('userId: ' + res)

              this.$store.dispatch('getUserType', res)
                .then((res) => {
                  this.loading = false
                  console.log(res);
                  if (res == 'Schueler') {
                    this.logout()
                    this.error = true
                    console.log('Student account. No access.')
                  } else {
                    localStorage.setItem('userType', res)
                    this.$router.push({ name: 'users' })
                  }
                })
                .catch((error) => {
                  this.logout()
                  console.log(error)
                  this.error = true
                  this.loading = false
                })

            })
            .catch((error) => {
              this.logout()
              console.log(error)
              this.error = true
              this.loading = false
            })

    		})
        .catch((error) => {
          this.logout()
          console.error(error)
          console.log('Wrong credentials')
          this.error = true
          this.loading = false
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
