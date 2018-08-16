<template lang="pug">
  el-button(size='mini', type='danger', @click='handleDelete(id)', icon='el-icon-delete') Löschen
</template>

<script>
import PROJECT_DELETE from '@/graphql/ProjectDelete.gql'

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
      this.$confirm('Dadurch wird der Projekt endgültig gelöscht. Fortsetzen?', 'Warning', {
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
        mutation: PROJECT_DELETE,
        variables: {
          id: this.id
        },
        // updateQueries: {
          // mySubjects: (prev, { mutationResult }) => {
          //   console.log(prev)
          //   console.log(mutationResult)
          //   // return {
          //   //   mySubjects: prev.mySubjects.filter(o => o.id !== mutationResult.data.deleteProject.id)
          //   // }
          // }
        // }
      })
      .then((data) => {
        console.log(data)
        console.log(this.$apolloProvider)
        // re fetch hack?
        this.$apolloProvider.defaultClient.reFetchObservableQueries()

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
