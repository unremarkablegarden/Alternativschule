<template lang="pug">
  #userslist(v-if='students')
    el-collapse(v-model='active', v-for='student in students', :key='student.username').students
      el-collapse-item(:title='student.fullName', :name='student.username')
        //- xmp {{ student }}
        .meta
          | Vertrauenslehrer:&nbsp;
          | {{ student.prefectLinks[0].firstname }}
          //- | {{ student.prefectLinks[0].surname }}
        //- .note(v-if='studentNoteByTeacherInSubject(student)')
        StudentNote(:note='studentNoteByTeacherInSubject(student)', v-if='studentNoteByTeacherInSubject(student)')
        StudentNote(:note='newNote(student)', v-else)
</template>

<script>

export default {
  name: 'studentlist',
  props: ['students', 'subjectId'],
  data () {
    return {
      active: [],
    }
  },
  methods: {
    studentNoteByTeacherInSubject(student) {
      const notes = student.studentStudentNotes
      const teacher = localStorage.getItem('userId')
      const note = notes.find((s) => {
        if (s.subject.id === this.subjectId && s.teacher.id === teacher) {
          return s
        }
      })
      return note

      return true
    },
    studentNote(studentNotes) {
      return studentNotes.find(o => o.teacher.id === localStorage.getItem('userId'))
    },
    newNote(student) {
      return {
        subject: {
          id: this.subjectId
        },
        student: {
          id: student.id
        }
      }
    }
  }
}
</script>

<style lang='sass' scoped>
  .meta
    opacity: 0.5
    margin: 0 0 1em 0
  .note
    margin: 1em 0
</style>
