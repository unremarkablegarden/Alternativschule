<template lang="pug">
  #prefect
    div(v-if='loading')
      Loading
    div(v-else)
      el-card(shadow='never').prefectstudents
        div(slot="header").header
          span Meine Vertraunisschüler*innen

        el-collapse(v-model='activeStudents')
          el-collapse-item(v-for='student in prefectStudents', :key='student.username', :title='student.username', :name='student.username').student
            template(slot='title')
              icon(icon='user')
              | &nbsp;
              | {{ student.firstname }} {{ student.surname }}

            el-card(shadow='never')
              br
              el-row
                el-col(:span='9')
                  .notesWrapper
                    strong Notes
                    ul.notes
                      li.note(v-for='note in student.prefectNotes')
                        | {{ note.text }}&nbsp;
                        span.small {{ formatDate(note.createdAt) }}
                el-col(:span='14', :offset='1')
                  PrefectNotes(:studentId='student.id')

              el-collapse(v-model='activeSubjects', v-if='!loading')
                el-collapse-item(v-for='subject in student.studiesSubjects', :key='subject.name', :title='subject.name', :name='subject.name').subject
                  template(slot='title')
                    icon(icon='docs')
                    | &nbsp;&nbsp;
                    | {{ subject.name }}
                    .levels.right
                      | {{ studentSubjectLevel(student, subject.id) }}
                      | &nbsp;&nbsp;&nbsp;

                  el-row
                    el-col(:span='15', :offset='1')
                      //- STUDENT NOTE FROM TEACHER
                      el-card(shadow='never')
                        .subjectNote(v-if='studentNoteBySubject(student.studentStudentNotes, subject.id)')
                          p
                            em „{{ studentNoteBySubject(student.studentStudentNotes, subject.id).text }}“
                          p
                            |– {{ studentNoteBySubject(student.studentStudentNotes, subject.id).teacher.firstname }} {{ studentNoteBySubject(student.studentStudentNotes, subject.id).teacher.surname }}&nbsp;
                            span.small {{ formatDate(studentNoteBySubject(student.studentStudentNotes, subject.id).updatedAt) }}
                        .else(v-else)
                          p No teacher note

                      //- Kompetenzen
                      .selfEvals(v-if="subject.id !== 'cjlw89ql20imy0149cdcs3ze0'")
                        //- if not space-station
                        StudentSelfEvaluations(:subjectId='subject.id', :studentId='student.id')


                    el-col(:span='6', :offset='2')
                      strong Projekte
                      .projects
                        .project(v-for='(project, index) in projectsPerSubject(student.studiesProjects, subject.id)', :key='project.slug')
                          icon(icon='doc')
                          | {{ project.name }}

              //- CHART
              el-row
                el-col(:span='18', :offset='2')
                  Chart(:selfEvals='student.selfEvaluations', :subjects='student.studiesSubjects', :allSubjects='allSubjects2').Chart

              //- PRINT

              el-button.right Ausdrucken
              br
              br

        br
        el-button(type='primary', @click='dialogVisible = true') Vertrauensschüler*in Auswählen

      //- SELECT STUDENTS
      el-dialog(title='Vertrauensschüler*in Auswählen', :visible.sync='dialogVisible', width='40%', v-loading='dialogLoading')
        .list
          el-row.student(v-for='(student, index) in allStudents2', :key='student.username').userRow
            el-col(:span='19').student
              .name
                icon(icon='user').i
                | {{ student.firstname }} {{ student.surname }}
            el-col(:span='5').buttons
              el-button(size='mini', type='primary', v-if='isAvailable(student)', @click='addStudent(student)') Hinzufügen
              el-button(size='mini', type='danger', v-else, @click='removeStudent(student)') Löschen
</template>


<script>
import gql from 'graphql-tag'
import Chart from '@/components/Chart'

export default {
  name: 'prefect',
  components: {
    Chart
  },
  data () {
    return {
      loading: true,
      dialogLoading: false,
      dialogVisible: false,
      activeStudents: [],
      activeSubjects: [],
      prefectStudents: [],
      studentStates: [],
      activeElCollapse: []
    }
  },
  computed: {
    userId () {
      return localStorage.getItem('userId')
    },
  },
  methods: {
    formatDate(date) {
      const d = new Date(date)
      return '(' + d.toLocaleDateString("de-DE") + ')'
    },
    projectsPerSubject(projects, subjectId) {
      return projects.filter(o => o.subject.id === subjectId)
    },
    studentNoteBySubject(notes, subjectId) {
      return notes.find(o => o.subject.id === subjectId)
    },
    studentSubjectLevel(student, subjectId) {
      let level = student.studentLevels.find(o => o.subject.id === subjectId)
      if (!level) return 'BK'
      else return level.level
    },
    addStudent (student) {
      this.prefectStudents.push(student)
      this.apolloAddPrefect(student)
    },
    removeStudent (student) {
      this.prefectStudents = this.prefectStudents.filter(o => o.id !== student.id)
      this.apolloRemovePrefect(student)
    },
    isAvailable (student) {
      let toReturn = true
      this.prefectStudents.forEach(ps => {
        if (student.id === ps.id) {
          toReturn = false
        }
      })
      return toReturn
    },

    apolloAddPrefect (student) {
      this.dialogLoading = false
      this.$apollo.mutate({
        mutation: gql`mutation($id1: ID!, $id2: ID!) {
          addToPrefectLinks(
            prefectLinks1UserId: $id1
            prefectLinks2UserId: $id2
          ) {
            prefectLinks1User {
              id
              username
            }
            prefectLinks2User {
              id
              username
            }
          }
        }`,
        variables: {
          id1: student.id,
          id2: this.userId
        }
      })
      .then((data) => {
        console.log(data)
        this.$message({
          type: 'success',
          message: 'Student added'
        })
        this.dialogLoading = false
        this.$apolloProvider.defaultClient.reFetchObservableQueries()
      })
      .catch((error) => {
        console.error(error)
        this.$message({
          type: 'error',
          message: error.message
        })
        this.dialogLoading = false
      })
    },

    apolloRemovePrefect (student) {
      this.dialogLoading = false
      this.$apollo.mutate({
        mutation: gql`mutation($id1: ID!, $id2: ID!) {
          removeFromPrefectLinks(
            prefectLinks1UserId: $id1
            prefectLinks2UserId: $id2
          ) {
            prefectLinks1User {
              id
              username
            }
            prefectLinks2User {
              id
              username
            }
          }
        }`,
        variables: {
          id1: student.id,
          id2: this.userId
        }
      })
      .then((data) => {
        console.log(data)
        this.$message({
          type: 'success',
          message: 'Student removed'
        })
        this.dialogLoading = false
        this.$apolloProvider.defaultClient.reFetchObservableQueries()
      })
      .catch((error) => {
        console.error(error)
        this.$message({
          type: 'error',
          message: error.message
        })
        this.dialogLoading = false
      })
    }
  },
  apollo: {
    allSubjects2: {
      query: gql`query {
        allSubjects {
          id
          slug
          name
          levels
          competences {
            id
            name
          }
        }
      }`,
      update (result) {
        return result.allSubjects.filter(x => x.id !== 'cjlw89ql20imy0149cdcs3ze0') // space-station
      }
    },
    allStudents2: {
      query: gql`query ($userType: UserTypes!) {
      	allUsers(filter: {
      		userType: $userType
      	}) {
          id
      		username
          firstname
          surname
          prefectLinks {
            id
            username
          }
          studiesSubjects {
          	id
          	name
            slug
            competences {
              id
              name
            }
            levels
          }
          studiesProjects {
          	id
          	name
          	slug
            subject {
              id
            }
          }
          studentLevels {
            id
            subject {
              id
              slug
            }
            level
          }
          prefectNotes {
            id
            createdAt
            text
          }
          studentStudentNotes {
            id
            text
            updatedAt
            subject {
              id
              slug
            }
            teacher {
              id
              username
              firstname
              surname
            }
          }
          selfEvaluations {
            id
            value
            level
            subject {
              id
              slug
              name
            }
            student {
              id
              username
            }
          }
      	}
      }`,
      variables () {
        return {
          userType: "Schueler"
        }
      },
      update (result) {
        let prefectStudents = []
        result.allUsers.forEach(student => {
          student.prefectLinks.forEach(prefect => {
            if (prefect.id === this.userId) {
              prefectStudents.push(student)
            }
          })
        })
        this.prefectStudents = prefectStudents

        result.allUsers.forEach(s => {
          if(this.isAvailable(s)) this.studentStates[s.id] = false
          else this.studentStates[s.id] = true
        })

        this.loading = false
        return result.allUsers
      }
    }
  },
}
</script>

<style lang="sass">
#prefect
  .el-collapse-item__header
    .sli-svg
      transform: scale(0.8) translate(0px, 6px)

  .el-card__body
    padding-top: 0 !important

  .userRow:first-child
    border-top: 1px #EEE solid
  .userRow
    border-bottom: 1px #EEE solid
    .student
      padding: 10px 0
      .i
        margin-right: 8px
        width: 16px
        height: 16px
        transform: translate(0, 2px)
    .buttons
      padding-top: 6px
      button
        float: right

  .header
    font-weight: bold
    text-transform: uppercase
    font-size: 0.75em
    letter-spacing: 0.03em
  .subject
    .el-collapse-item__header
      font-size: 1em
      font-weight: normal

  .level, .levels
    font-size: 0.86em
  .small
    font-size: 0.85em
  .notesWrapper
    margin-top: -10px
  ul, li
    margin: 0
    padding: 0
  ul
    margin-left: 1.25em
  ul.notes
    margin-bottom: 2em
  .projects
    margin: 3px 0 0 3px
  .project
    padding: 3px 0
    svg
      width: 16px
      height: 16px
      transform: translate(-4px, 2.5px)
  .selfEvals
    margin-top: 1em
  .Chart
    margin-top: 2em

</style>
