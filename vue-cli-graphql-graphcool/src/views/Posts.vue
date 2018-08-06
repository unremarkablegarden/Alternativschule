<template lang="pug">
  .posts.view
    PostsList
</template>


<script>
import PostsList from '@/components/PostsList.vue'

export default {
  name: 'posts',
  components: {
    PostsList
  }
}
</script>
