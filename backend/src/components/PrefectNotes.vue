<template lang="pug">
  .prefectNotes
    el-form(:model='form', ref='form').form
      el-input(type='textarea', v-model='form.text', placeholder='New note about the student...', :rows='5').note
      el-button(@click='submit()', size='mini', type='', icon='el-icon-document', :loading='loading').submit Note Speichern
    .clearfix
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'prefectNotes',
  props: ['studentId'],
  data () {
    return {
      loading: false,
      form: {
        text: ''
      }
    }
  },
  computed: {
    userId() {
      return localStorage.getItem('userId')
    }
  },
  methods: {
    submit() {
      this.loading = true
      this.createNote()
    },

    createNote () {
      this.$apollo.mutate({
        mutation: gql`mutation ($text: String!, $studentId: ID!) {
          createPrefectNote(text: $text, studentId: $studentId) {
            id
            text
          }
        }`,
        variables: {
          text: this.form.text,
          studentId: this.studentId,
        },
      }).then((data) => {
        console.log(data)
        this.msg('success', 'Note saved')
        this.$refs.form.resetFields()
        this.$apolloProvider.defaultClient.reFetchObservableQueries()
      }).catch((error) => {
        console.error(error)
        this.msg('error', error)
      }).then(() => {
        this.loading = false
      })
    },

    msg (type, message) {
      this.$message({
         type: type,
         message: message
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .prefectNotes
    margin-bottom: 1em
  .note
    margin-bottom: 1em
  .submit
    // float: right
  .clearfix
    clear: both
</style>
