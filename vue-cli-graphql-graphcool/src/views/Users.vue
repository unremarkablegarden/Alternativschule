<template lang="pug">
  .users.view
    UsersList
</template>


<script>
import UsersList from '@/components/UsersList.vue'

export default {
  name: 'users',
  components: {
    UsersList
  }
}
</script>
