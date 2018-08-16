<template lang="pug">
  #subjectslist
    el-row
      el-col(:span='22', :offset='2')
        h1 Meine Themen
    //- div(v-if='loadingSubjects') Loading...
    .allSubjects(v-loading='$apollo.loading')
      el-row(v-for='(subject, index) in allSubjects', :key='subject.name').subject
        el-col(:span='2').toggle
          el-switch(v-model='subject.toggle', @change='toggleSubject(subject)')
        el-col(:span='22').name
          el-collapse(v-model='activeSubjects')
            el-collapse-item(:title='subject.name', :name='subject.name')
              .description {{ subject.description }}
              el-checkbox-group(v-model='subject.tutorLevels[0].levels', size='small', v-if='subject.toggle', @change='changeLevels(subject, subject.tutorLevels[0].levels)')
                el-checkbox(v-for='level in levelsOptions', :key='level', :label='level', border) {{ level }}
</template>

<script>
import ALL_SUBJECTS_TEACHER from '@/graphql/SubjectsTeacher.gql'
import SUBJECT_TEACHER_REMOVE from '@/graphql/SubjectTeacherRemove.gql'
import SUBJECT_TEACHER_ADD from '@/graphql/SubjectTeacherAdd.gql'
import TUTOR_LEVEL_ADD from '@/graphql/TutorLevelsAdd.gql'
import TUTOR_LEVEL_EDIT from '@/graphql/TutorLevelsEdit.gql'

export default {
  name: 'subjectslist',

  data () {
    return {
      activeSubjects: [],
      dialogVisible: false,
      loadingSubjects: true,
      levelsOptions: ['GK', 'BK', 'AK1', 'AK2'],
      userId: null
    }
  },


  methods: {
    userId () {
      console.log('method: ' + localStorage.getItem('userId'))
      return localStorage.getItem('userId')
    }
  },

  apollo: {
    allSubjects: {
      query: ALL_SUBJECTS_TEACHER,
      variables () {
        return {
          id: localStorage.getItem('userId')
        }
      },
      update (data) {
        let subjects = JSON.parse(JSON.stringify(data.allSubjects))
        const userId = localStorage.getItem('userId')

        // loop through subjects
        subjects.forEach((subject) => {
          // add toggle to subjects the user is a teacher of
          subject.teachers.forEach((teacher) => {
            if (teacher.id == userId) {
              subject.toggle = true // new property
              this.activeSubjects.push(subject.name) // el-collapse array
            }
          })

          // add a blank array of selected tutor levels if no tutorLevel exists
          if (!subject.tutorLevels.length) {
            subject.tutorLevels = [{
              levels: [],
              mustCreate: true
            }]
          }
        })

        // console.log(this.activeSubjects)
        console.log(subjects)
        return subjects
      },
      result (data) {
        this.loadingSubjects = false
      }
    }
  },

  methods: {
    changeLevels (subject, newLevels) {
      let action
      let vars
      if (subject.tutorLevels[0].mustCreate) {
        console.log('add');
        action = TUTOR_LEVEL_ADD
        vars = {
          teacherId: localStorage.getItem('userId'),
          subjectId: subject.id,
          levels: newLevels
        }
      } else {
        if (subject.tutorLevels[0].id) {
          console.log('edit');
          action = TUTOR_LEVEL_EDIT
          vars = {
            tutorLevelsId: subject.tutorLevels[0].id,
            levels: newLevels
          }
        } else {
          console.error('MISSING new tutorLevels object Id')
        }
      }
      console.log(vars)

      this.$apollo
        .mutate({
          mutation: action, // add or edit
          variables: vars
        })
        .then((data) => {
          const d = data.data
          const tutorLevelID = d[Object.keys(d)[0]].id
          console.log(tutorLevelID)

          if (subject.tutorLevels[0].mustCreate) {
            subject.tutorLevels[0].mustCreate = false
            subject.tutorLevels[0].id = tutorLevelID
          }
          if(data.data.createTutorLevels) {
            console.log(data.data.createTutorLevels)
          }

          this.$message({
            type: 'success',
            message: 'Updated'
          })
        })
        .catch((error) => {
          console.error(error)
          this.$message({
            type: 'error',
            message: error.message
          })
        })
    },

    toggleSubject (subject) {
      let action
      let actionName
      if (subject.toggle === true) {
        action = SUBJECT_TEACHER_ADD
        actionName = 'added'
      } else if (subject.toggle === false) {
        action = SUBJECT_TEACHER_REMOVE
        actionName = 'removed'
      }

      if (action) {
        this.$apollo
          .mutate({
            mutation: action, // add or remove
            variables: {
              subjectId: subject.id,
              teacherId: localStorage.getItem('userId')
            }
          })
          .then((data) => {
            let subjectName
            if (subject.toggle === true) {
              subjectName = data.data.addToTeacherSubject.teachesSubjectsSubject.name
              this.activeSubjects.push(subjectName)
            } else {
              subjectName = data.data.removeFromTeacherSubject.teachesSubjectsSubject.name
              this.activeSubjects = this.activeSubjects.filter(e => e !== subjectName)
            }
            this.$message({
              type: 'success',
              message: 'Subject ' + subjectName + ' ' + actionName
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
    },

    formatter(row, column) {
      return row.address;
    }
  }
}
</script>

<style lang="sass">
  #subjectslist .el-collapse-item__content
    padding-bottom: 1em
</style>

<style lang="sass" scoped>
  .toggle
    height: 2em
    padding-top: 0.7em
  .subject
    .description
      padding: 0 0 1.5em 0
      font-size: 0.9em
    .border
      border-bottom: 1px #ECECEC solid
      margin-bottom: 1em
      padding-bottom: 1em
    &:last-child .border
      border-bottom: 0
</style>
