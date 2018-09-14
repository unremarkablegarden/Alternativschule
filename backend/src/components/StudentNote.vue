<template lang="pug">
  .studentNote
    el-form(:model='form', ref='form')
      el-input(type='textarea', v-model='form.text', placeholder='New note about the student...').note
      el-button(@click='submit()', size='mini', type='', icon='el-icon-document', :loading='loading').submit Note Speichern
    .clearfix
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'studentnote',
  props: ['note', 'subjectId'],
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
  created () {
    if (this.note) {
      this.form.text = this.note.text
    }
  },
  methods: {
    submit() {
      this.loading = true

      if (this.note.id) {
        this.updateNote()
      } else {
        this.createNote()
      }
    },

    updateNote () {
      this.$apollo.mutate({
        mutation: gql`mutation ($id: ID!, $text: String!) {
          updateStudentNote(id: $id, text: $text) {
            id
            text
          }
        }`,
        variables: {
          id: this.note.id,
          text: this.form.text
        },
      }).then((data) => {
        console.log(data)
        this.msg('success', 'Note saved')
      }).catch((error) => {
        console.error(error)
        this.msg('error', error)
      }).then(() => {
        this.loading = false
      })
    },

    createNote () {
      this.$apollo.mutate({
        mutation: gql`mutation ($text: String!, $subjectId: ID!, $studentId: ID!, $teacherId: ID!) {
          createStudentNote(text: $text, subjectId: $subjectId, studentId: $studentId, teacherId: $teacherId) {
            id
            text
          }
        }`,
        variables: {
          text: this.form.text,
          subjectId: this.note.subject.id,
          studentId: this.note.student.id,
          teacherId: localStorage.getItem('userId')
        },
      }).then((data) => {
        console.log(data)
        this.msg('success', 'Note saved')
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
  .note
    margin-bottom: 1em
  .submit
    // float: right
  .clearfix
    clear: both
</style>
