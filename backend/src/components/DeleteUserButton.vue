<template lang="pug">
  el-button(size='mini', type='danger', @click='handleDelete(id)', icon='el-icon-delete') Löschen
</template>

<script>
import USER_DELETE from '@/graphql/UserDelete.gql'

export default {
  name: 'DeleteProjectButton',
  data () {
    return {
    }
  },
  props: [
    'id'
  ],
  methods: {
    handleDelete () {
      this.$confirm('Dadurch wird der Benutzer endgültig gelöscht. Fortsetzen?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Stornieren',
        type: 'warning'
      }).then(() => {
        this.apolloDelete()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Löschung abgebrochen'
        })
      })
    },

    apolloDelete () {
      this.$apollo.mutate({
        mutation: USER_DELETE,
        variables: {
          id: this.id
        },
        updateQueries: {
          allUsers: (prev, { mutationResult }) => {
            // prev.allUsers == an array of objects
            // mutationResult.data.deleteUser.id == id to delete
            return {
              allUsers: prev.allUsers.filter(o => o.id !== mutationResult.data.deleteUser.id)
            }
          }
        }
      })
      .then((data) => {
        console.log(data)
        this.$message({
          type: 'success',
          message: 'Löschung erfolgreich'
        })
      })
      .catch((error) => {
        console.error(error)
        this.$message({
          type: 'error',
          message: error.message
        })
      })
    }
  }
}
</script>
