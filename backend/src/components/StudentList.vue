<template lang="pug">
  #userslist(v-if='studentsMutable')
    el-collapse(v-model='active', v-for='student in studentsMutable', :key='student.username').students
      el-collapse-item(:title=" student.firstname + ' ' + student.surname ", :name='student.username')
        template(slot='title')
          icon(icon='user')
          | {{ student.firstname + ' ' + student.surname }}
        el-row
          el-col(:span='16')
            .meta(v-if='student.prefectLinks.length')
              | Vertrauenslehrer:&nbsp;
              | {{ student.prefectLinks[0].firstname }}

            StudentNote(:note='studentNoteByTeacherInSubject(student)', v-if='studentNoteByTeacherInSubject(student)')
            StudentNote(:note='newNote(student)', v-else)

            .studentlevels.horizontal
              .label
                strong Lernlevel
              el-button(v-for='level in subjectLevels', :key='level', size='mini', :type='buttonType(level, studentLevel(student.studentLevels))', @click='changeLevel(student, level)', plain) {{ level }}

            .selfEvals(v-if="subjectId !== 'cjlw89ql20imy0149cdcs3ze0'")
              //- if not space-station
              StudentSelfEvaluations(:subjectId='subjectId', :studentId='student.id')

          el-col(:span='6', :offset='2')
            StudentProjectsList(:subjectId='subjectId', :studentId='student.id')
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'studentlist',
  props: ['students', 'subjectId'],
  data () {
    return {
      active: [],
      loading: false,
      studentsMutable: null
    }
  },
  created () {
    this.studentsMutable = JSON.parse(JSON.stringify(this.students))
  },
  apollo: {
    subjectLevels: {
      query: gql`query ($subjectId: ID!) {
        Subject(id: $subjectId) {
          levels
        }
      }`,
      variables () {
        return {
          subjectId: this.subjectId,
        }
      },
      update (result) {
        // console.log('apollo sub levels')
        // console.log(result);
        return this.$sortLevels(result.Subject.levels)
      },
    }
  },
  methods: {
    buttonType (i, is) {
      if (i === is) return 'primary'
    },
    changeLevel (student, level) {
      this.loading = true
      const levelObj = student.studentLevels.find(o => o.subject.id === this.subjectId)
      if (levelObj) {
        console.log('update');
        levelObj.level = level
        this.updateStudentLevel(levelObj)
      } else {
        console.log('create')
        const newLevelObj = {
          level: level,
          student: {
            id: student.id
          },
          subject: {
            id: this.subjectId
          },
          new: true
        }
        student.studentLevels.push(newLevelObj)
        this.createStudentLevel(newLevelObj)
      }
    },

    updateStudentLevel (levelObj) {
      // console.log(levelObj)
      const studs = this.students
      this.$apollo.mutate({
        mutation: gql`mutation ($id: ID!, $level: Levels!) {
          updateStudentLevels(id: $id, level: $level) {
            id
            level
          }
        }`,
        variables: {
          id: levelObj.id,
          level: levelObj.level
        },
        update (data, response) {
          // const stud = studs.find(o => o.id === levelObj.student.id)
          // const newLevel = stud.studentLevels.find(o => o.new === true)
          // newLevel.id = response.data.updateStudentLevels.level
          // console.log('...');
          // console.log(stud)
        }
      }).then((data) => {
        // console.log(data)
        this.msg('success', 'Level saved')
      }).catch((error) => {
        console.error(error)
        this.msg('error', error)
      }).then(() => {
        this.loading = false
      })
    },

    createStudentLevel (levelObj) {
      // console.log(levelObj)
      const studs = this.students
      this.$apollo.mutate({
        mutation: gql`mutation ($level: Levels!, $subjectId: ID!, $studentId: ID!) {
          createStudentLevels(level: $level, studentId: $studentId, subjectId: $subjectId) {
            id
            level
          }
        }`,
        variables: {
          level: levelObj.level,
          subjectId: levelObj.subject.id,
          studentId: levelObj.student.id,
        },
        update (data, response) {
          const stud = studs.find(o => o.id === levelObj.student.id)
          const newLevel = stud.studentLevels.find(o => o.new === true)
          newLevel.new = false
          newLevel.id = response.data.createStudentLevels.id
        }
      }).then((data) => {
        this.msg('success', 'Level saved')
      }).catch((error) => {
        console.error(error)
        this.msg('error', error)
      }).then(() => {
        this.loading = false
      })
    },

    studentNoteByTeacherInSubject (student) {
      const notes = student.studentStudentNotes
      const teacher = localStorage.getItem('userId')
      const note = notes.find((s) => {
        if (s.subject.id === this.subjectId && s.teacher.id === teacher) {
          return s
        }
      })
      return note
      // return true
    },
    studentLevel (studentLevels) {
      const levelObj = studentLevels.find(o => o.subject.id === this.subjectId)
      let level
      if (levelObj) level = levelObj.level
      else level = 'BK'
      return level
    },

    msg (type, message) {
      this.$message({
         type: type,
         message: message
      })
    },

    studentNote (studentNotes) {
      return studentNotes.find(o => o.teacher.id === localStorage.getItem('userId'))
    },
    newNote (student) {
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

<style lang="sass" scoped>
  .meta
    opacity: 0.5
    margin: 0 0 1em 0
  .note
    margin: 1em 0
  .studentlevels
    // margin-bottom: 1em
    margin-top: 1em
    padding-bottom: 1em
  .studentlevels
    button
      margin: 0 0.5em 0 0
  .label
    margin-top: 2px
  .el-icon-loading
    margin-left: 1em
</style>

<style lang="sass">
  #userslist .el-collapse-item__header
    .sli-svg
      transform: scale(0.7) translate(-8px, 8px) !important
  #userslist .el-collapse-item__header
    padding-left: 6px

  #userslist .el-collapse:first-child
    border-top: 0 !important
  #userslist .el-collapse-item__header:last-child
    border-bottom: 0 !important

  .subject.is-active .el-collapse-item__content .el-card__body
    // padding-bottom: 0.3em !important
    padding-bottom: 0.0em !important

  #userslist .el-collapse-item__wrap
    border-bottom: 0 !important
</style>
