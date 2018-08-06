<template lang="pug">
.list-posts
  //- .form
    input.input(v-model='name', placeholder='Type a name')

  ApolloQuery(:query="require('../graphql/AllPosts.gql')")
    template(slot-scope='{ result: { loading, error, data } }')
      .loading.apollo(v-if='loading') Loading...
      .error.apollo(v-else-if='error') An error occured
      .result.apollo(v-else-if='data')
        .post(v-for='post of data.allPosts', :key='post.id')
          .image(:style="{ backgroundImage: 'url(' + post.imageUrl + ')' }")
          .text {{ post.description }}
      .no-result.apollo(v-else='') No result :(
  hr
  //- //- // Tchat example
  //- ApolloQuery(:query="require('../graphql/Messages.gql')")
  //-   apollosubscribetomore(:document="require('../graphql/MessageAdded.gql')", :update-query='onMessageAdded')
  //-     div(slot-scope='{ result: { data } }')
  //-       template(v-if='data')
  //-         .message(v-for='message of data.messages', :key='message.id')
  //-           | {{ message.text }}
  //-
  //- .form
  //-   input.input(v-model='newMessage', placeholder='Type a message', @keyup.enter='sendMessage')
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>


<style lang="sass" scoped>
  .form,
  .input,
  .apollo,
  .message
    padding: 12px
  .input
    font-family: inherit
    font-size: inherit
    border: solid 2px #ccc
    border-radius: 3px
  .error
    color: red
  xmp
    text-align: left
  .image
    width: 300px
    height: 200px
    background-size: cover
</style>
