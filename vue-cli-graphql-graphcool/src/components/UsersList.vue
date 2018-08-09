<template lang="pug">
  .userslist
    ApolloQuery(:query="require('../graphql/Users.gql')")
      template(slot-scope='{ result: { loading, error, data } }')
        .loading.apollo(v-if='loading') Loading...
        .error.apollo(v-else-if='error') An error occured
        .result.apollo(v-else-if='data')
          .user(v-for='user of data.allUsers', :key='user.id')
            .email {{ user.email }}
        .no-result.apollo.loading(v-else='', v-loading='true') Loading...
</template>

<script>
export default {
  name: 'userslist',
  data () {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
  .image
    width: 300px
    height: 200px
    background-color: #DDD
    background-size: cover
</style>
