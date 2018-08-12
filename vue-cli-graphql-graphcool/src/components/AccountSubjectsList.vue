<template lang="pug">
  #subjectslist
    div(v-if='loadingSubjects') Loading...
    .allSubjects(v-else)
      el-row(v-for='(subject, index) in allSubjects', :key='subject.name')
        el-col(:span='2').toggle
          el-switch(v-model='subject.toggle', @change='toggleSubject(subject)')
        el-col(:span='22').name
          el-collapse(v-model='activeSubjects')
            //- @change='handleChange'
            el-collapse-item(:title='subject.name', :name='subject.name')
              | {{ subject.description }}
              //- el-checkbox-group(v-model='levels', size='medium')
                el-checkbox-button(v-for='city in cities', :label='city', :key='city') {{city}}
</template>

<script>
import ALL_SUBJECTS from '@/graphql/Subjects.gql'
import SUBJECT_TEACHER_REMOVE from '@/graphql/SubjectTeacherRemove.gql'
import SUBJECT_TEACHER_ADD from '@/graphql/SubjectTeacherAdd.gql'

export default {
  name: 'subjectslist',

  data () {
    return {
      activeSubjects: [],
      dialogVisible: false,
      loadingSubjects: true
    }
  },

  computed: {
    userId () {
      return localStorage.getItem('userId')
    }
  },

  mounted () {
    console.log(this.userId)
  },

  apollo: {
    allSubjects: {
      query: ALL_SUBJECTS,
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
          // dirty hack to avoid nested query?
          // add the levels from the 'tutorLevel' object with the same userId as the current user to a new array on the 'subject' object called 'userLevels'
          // subject.tutorLevel.forEach((tutorLevel)) => {
          //   if (tutorLevel.teacher.id == userId) {
          //     subject.userLevels = tutorLevel.levels
          //   }
          // })
        })

        console.log(subjects)
        // console.log(this.activeSubjects)
        return subjects
      },
      result (data) {
        this.loadingSubjects = false
      }
    }
  },

  methods: {
    toggleSubject (subject) {
      console.log(subject)

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
    // handleChange (val) {
    //   console.log(val)
    // },
    formatter(row, column) {
      return row.address;
    }
  }
}
</script>

<style lang="sass">
  .el-collapse-item__content
    padding-bottom: 1em
</style>



<style lang="sass" scoped>
  .toggle
    height: 2em
    padding-top: 0.7em

  .subject
    .name
      font-weight: bold
    .description
      margin: 0.5em 0
      font-size: 0.86em
      overflow: hidden
    .border
      border-bottom: 1px #ECECEC solid
      margin-bottom: 1em
      padding-bottom: 1em
    &:last-child .border
      border-bottom: 0
</style>
