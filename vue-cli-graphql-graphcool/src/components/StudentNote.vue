<template lang="pug">
  .studentNote
    el-form(:model='form', ref='form')
      el-input(type='textarea', v-model='form.text', placeholder='New note about the student...').note
      el-button(@click='submit()', size='mini', type='primary', icon='el-icon-check', disabled).submit Speichern
    //- xmp {{ note }}
</template>

<script>
export default {
  name: 'studentnote',
  props: ['note', 'subjectId'],
  data () {
    return {
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
      let action
      if (this.note.id) {
        action = 'UPDATE'
      } else {
        action = 'CREATE'
      }
      const text = this.form.text
      const subject = this.note.subject.id
      const student = this.note.student.id
      console.log(text)
      console.log(subject)
      console.log(student)
    }
  }
}
</script>

<style lang="sass" scoped>
  .note
    margin-bottom: 1em
</style>
