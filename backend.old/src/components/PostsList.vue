<template lang="pug">
  .postslist
    ApolloQuery(:query="require('../graphql/Posts.gql')")
      template(slot-scope='{ result: { loading, error, data } }')
        .loading.apollo(v-if='loading') Loading...
        .error.apollo(v-else-if='error') An error occured

        .result.apollo(v-else-if='data')
          .columns.is-multiline.is-3
            .column.is-4.post(v-for='(post, index) of data.allPosts', :key='post.id')
              .inner
                .image(:style="{ backgroundImage: 'url(' + post.imageUrl + ')' }")
                .text-wrapper
                  span.text {{ post.description }}
                  .bottom.clearfix
                    el-button(size='small') Button

        .no-result.apollo.loading(v-else='', v-loading='true') Loading...
</template>

<script>
export default {
  name: 'postslist',
  data () {
    return {
      loading: true
    }
  }
}
</script>


<style lang="sass" scoped>
  .post .inner
    border: 1px #ccc solid
    border-radius: 6px
  .image
    height: 200px
    background-color: #DDD
    background-size: cover
    border-radius: 6px 6px 0 0
  .text-wrapper
    padding: 1em
  .bottom
    padding-top: 1em
  .loading
    width: 100%
    height: 400px
    background: #fdfdfd
    text-align: center
    font-size: 0.8em
</style>
