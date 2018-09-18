<template lang="pug">
  //- el-button(size='mini', type='danger', icon='el-icon-delete') Löschen
  el-button(icon='el-icon-delete', type='text', @click='handleDelete(id)').smallbutt
</template>

<script>
// import PROJECT_DELETE from '@/graphql/ProjectDelete.gql'
import gql from 'graphql-tag'

export default {
  name: 'MaterialDelete',
  data () {
    return {
    }
  },
  props: [
    'id'
  ],
  methods: {
    handleDelete () {
      this.$confirm('Dadurch wird der Material endgültig gelöscht. Fortsetzen?', 'Warning', {
        confirmButtonText: 'Löschen',
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
        mutation: gql`mutation ($id: ID!) {
          deleteMaterial(id: $id) {
            id
          }
        }`,
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
        // console.log(data)
        // console.log(this.$apolloProvider)
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
