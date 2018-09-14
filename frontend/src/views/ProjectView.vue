<template lang="pug">
.levelNav
  .guibox
    .loading(v-if='loadingData || loadingUser') Loading...
    div(v-else)
      levelnav(v-if='!isSpacestation')
      .spacestationspacer(v-else)
      .columns.under-level-nav
        .side-menu.column.is-3
          ul
            div(v-if='myProjects.length').my-projects
              li.section-title(v-if="myProjects") Meine Projekte
              li(v-for="project in myProjects")
                router-link(:to="'/project/' + currentSubject + '/' + project.slug")
                  | {{ project.name }}
                  | ({{ project.level }})

            li.section-title(v-if="availableProjects.length") Verfügbare Projekte
            li(v-for="project in availableProjects", v-if="availableProjects.length")
              router-link(:to="'/project/' + currentSubject + '/' + project.slug")
                | {{ project.name }}
                | ({{ project.level }})

            li.section-title(v-if="availableSelfLearnProjects.length") Selbslernbox
            li(v-for="project in availableSelfLearnProjects", v-if='availableSelfLearnProjects.length')
              router-link(:to="'/project/' + currentSubject + '/' + project.slug")
                | {{ project.name }}
                | ({{ project.level }})

        .main.column.is-8.is-offset-1
          //- xmp {{ availableProjects }}
          .tabs.is-boxed(v-if="tab !== 'projectview-home'")
            ul
              li(:class="{ 'is-active' : (tab == 'projectview') }")
                router-link(:to='"/project/" + currentSubject + "/" + project') Info
              li(:class="{ 'is-active' : (tab == 'projectview-material') }")
                router-link(:to='"/project/" + currentSubject + "/" + project + "/material"') Material
          .tab-content.info(v-if="tab == 'projectview-home'")
            h2.title Wählen Sie ein Projekt aus...

          .tab-content.info(v-if="tab == 'projectview'")
            //- xmp {{ currentProjectData }}
            .columns.is-gapless.no-mb
              .column.is-9
                h2.title Projekt: {{ currentProjectData.name }}
              .column.is-3(v-if='studentCanAdd(currentProjectData)')
                el-button(v-if='projectAvailable === true', type='danger', icon='el-icon-plus', @click='addProject(currentProjectData.id)', :loading='submitting') Hinzufugen
                el-button(v-if='projectAvailable === false', type='danger', icon='el-icon-delete', @click='removeProject(currentProjectData.id)', :loading='submitting') Löschen

            .level
              strong Level:&nbsp;
                | {{ currentProjectData.level }}
            p.description {{ currentProjectData.description }}

          .tab-content.material(v-if="tab == 'projectview-material'")
            ul
              li(data-type = 'pdf')
                .text
                  .title Arbeitsbogen
                  p Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur.
              li(data-type = 'video')
                .text
                  .title Video
                  p Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Nam porttitor blandit accumsan.
              li(data-type = 'pdf')
                .text
                  .title Arbeitsbogen
                  p Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur.
              li(data-type = 'video')
                .text
                  .title Video
                  p Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Nam porttitor blandit accumsan.
              li(data-type = 'pdf')
                .text
                  .title Arbeitsbogen
                  p Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur.
              li(data-type = 'video')
                .text
                  .title Video
                  p Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Nam porttitor blandit accumsan.
              li(data-type = 'pdf')
                .text
                  .title Arbeitsbogen
                  p Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur.
              li(data-type = 'video')
                .text
                  .title Video
                  p Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id commodo mi consectetur. Nam porttitor blandit accumsan.
</template>

<script>
import gql from 'graphql-tag'
import levelnav from '@/components/projectview/levelNav.vue'
import progresschart from '@/components/projectview/progresschart.vue'
import lernlevel from '@/components/projectview/lernlevel.vue'

export default {
  name: 'projectview',
  components: {
    levelnav,
    progresschart,
    lernlevel
  },
  data () {
    return {
      db: null,
      subjects: null,
      currentSubjectData: null,
      // myProjects: null,
      loadingUser: true,
      loadingData: true,
      currentProjectData: null,
      projectAvailable: null,
      submitting: false,
      selfLearnProjects: null
    }
  },
  computed: {
    tab () {
      return this.$route.name
    },
    currentSubject () {
      return this.$route.params.subject
    },
    project () {
      return this.$route.params.project
    },
    myProjects () {
      if (this.myData) {
        return this.myData.studiesProjects.filter(o => o.subject.slug === this.currentSubject)
      }
    },
    availableProjects () {
      if (this.currentSubjectData) {
        let availableProjects = []
        this.currentSubjectData.projects.forEach(p => {
          if (! this.myProjects.find(mp => mp.id === p.id) && p.selfLearn === false) {
            // this isn't in myProjects
            availableProjects.push(p)
          }
        })
        return availableProjects
      }
    },
    availableSelfLearnProjects () {
      if (this.currentSubjectData) {
        let availableProjects = []
        this.currentSubjectData.projects.forEach(p => {
          if (! this.myProjects.find(mp => mp.id === p.id) && p.selfLearn === true) {
            // this isn't in myProjects
            availableProjects.push(p)
          }
        })
        return availableProjects
      }
    },
    isSpacestation () {
      const spacestationId = 'cjlw89ql20imy0149cdcs3ze0'
      if (this.currentSubjectData.id == spacestationId) {
        return true
      } else {
        return false
      }
    },

  },
  methods: {
    studentCanAdd(currentProjectData) {
      let studentSubjectLevel
      const studentSubjectLevelObj = this.myData.studentLevels.find(o => o.subject.id === this.currentSubjectData.id)
      if (studentSubjectLevelObj) {
        studentSubjectLevel = studentSubjectLevelObj.level
      } else {
        studentSubjectLevel = 'BK'
      }
      if (this.levelValue(studentSubjectLevel) >= this.levelValue(currentProjectData.level) || this.isSpacestation) {
        return true
      } else {
        return false
      }
    },
    levelValue (level) {
      if (level == 'BK') return 1
      if (level == 'GK') return 2
      if (level == 'AK') return 3
      if (level == 'AK1') return 3
      if (level == 'AK2') return 4
    },
    addProject (projectId) {
      const id = localStorage.getItem('userId')
      this.submitting = true
      if (id) {
        this.$apollo.mutate({
          mutation: gql`mutation ($id: ID!, $projectId: ID!) {
            addToStudentProject(studentsUserId: $id, studiesProjectsProjectId: $projectId) {
              studentsUser {
                id
                username
                studiesProjects {
                  slug
                }
              }
              studiesProjectsProject {
                id
                name
                slug
              }
            }
          }`,
          variables: {
            id: id,
            projectId: projectId
          },
          update: (store, { data }) => {
            const addedProject = data.addToStudentProject.studiesProjectsProject
            this.myProjects.push(addedProject)
            // this.myData.studiesProjects.push(addedProject)
          }
        }).then((data) => {
          this.$message({
             type: 'success',
             message: 'Planet hinzugefügt'
          })
          this.projectAvailable = false
          // this.$apolloProvider.defaultClient.reFetchObservableQueries()
          this.submitting = false

          // update the state in store
          this.updateStateMyData()

        }).catch((error) => {
          console.error(error)
          this.$message({
            type: 'error',
            message: error
          })
          this.submitting = false
        })
      } // if id
    },

    removeProject (projectId) {
      const id = localStorage.getItem('userId')
      this.submitting = true
      if (id) {
        this.$apollo.mutate({
          mutation: gql`mutation ($id: ID!, $projectId: ID!) {
            removeFromStudentProject(studentsUserId: $id, studiesProjectsProjectId: $projectId) {
              studentsUser {
                id
                username
                studiesProjects {
                  slug
                }
              }
              studiesProjectsProject {
                id
                name
                slug
              }
            }
          }`,
          variables: {
            id: id,
            projectId: projectId
          },
          update: (store, { data }) => {
            // remove from (also adds to)
            this.myProjects = this.myProjects.filter(o => o.id !== data.removeFromStudentProject.studiesProjectsProject.id)
            // this.myData.studiesProjects = this.myData.studiesProjects.filter(o => o.id !== data.removeFromStudentProject.studiesProjectsProject.id)
          }
        }).then((data) => {
          this.$message({
             type: 'success',
             message: 'Planet entfernt'
          })
          this.projectAvailable = true
          // this.$apolloProvider.defaultClient.reFetchObservableQueries()
          this.submitting = false

          // update the state in store
          this.updateStateMyData()

        }).catch((error) => {
          console.error(error)
          this.$message({
            type: 'error',
            message: error
          })
          this.submitting = false
        })
      } // if id
    },

    updateStateMyData () {
      console.log('projectview: update the store somehow?')
      // dirty hack to get it to show up when you nav back to moons or solarsystem
      location.reload()
      // console.log('myprojects');
      // console.log(this.myProjects);
      // console.log('mydata');
      // console.log(this.myData.studiesProjects)

      // this.$store.dispatch('updateMyDataStudiesProjects', this.myData.studiesProjects)

      //   .then((response) => {
      //     console.log('--projectview dispatch response--')
      //     console.log(response)
      //   })
      // console.log(this.$store.state)
    },

    projectInUserData(project) {
      let foundIt = false
      this.myProjects.forEach((p) => {
        if (p.id == project.id) {
          foundIt = true
        }
      })
      return foundIt
    },
    // hasProjectsNotInUserData () {
      // let foundIt = false
      // this.currentSubjectData.projects.forEach(o => {
      //   if (! this.projectInUserData(o)) {
      //     foundIt = true
      //   }
      // })
      // return foundIt
      // return true
    // },
    getDb () {
      this.$store.dispatch('getDb')
        .then((response) => {
          this.db = JSON.parse(JSON.stringify(response))
          this.setCurrentData()
          this.loadingUser = false
        })
    },
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.myData = JSON.parse(JSON.stringify(response))
        // this.myProjects = response.studiesProjects.filter(o => o.subject.slug === this.currentSubject)
        // console.log(response)
        this.isProjectAvailable()
        this.loadingData = false
      })
    },
    setCurrentData () {
      this.currentSubjectData = this.db.subjects.find(subject => subject.slug === this.currentSubject)
      this.currentProjectData = this.currentSubjectData.projects.find(p => p.slug === this.project)
    },

    isProjectAvailable() {
      // console.log('avail?')
      if (this.currentProjectData) {
        if (this.myProjects.find(o => o.id === this.currentProjectData.id)) {
          this.projectAvailable = false
        } else {
          this.projectAvailable = true
        }
      }
    }
  },
  mounted () {
    this.getDb()
    this.getMyData()
  },
  watch: {
    '$route' (to, from) {
      console.log('route change')
      this.setCurrentData()
      this.isProjectAvailable()
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  .guibox
    text-align: left
    padding: 1.5em
    overflow-x: hidden
    overflow-y: auto
    // div
      border: 1px red solid

  .spacestationspacer
    height: 20px

  .under-level-nav
    // background: blue
    height: calc(77vh - 100px)

  .no-mb
    margin-bottom: 0 !important

  .side-menu
    font-family: $A
    font-size: 1.125em
    position: relative
    overflow-y: scroll
    // height: calc(70vh - 100px - 3rem)
    ul
      border-top: 1px solid $lightgrey
      padding-top: 1em
      li
        margin-bottom: 1.2em
        padding-bottom: 1.2em
        border-bottom: 1px solid $lightgrey
        line-height: 1
        a
          color: #fff
          &:hover, &.router-link-active
            color: $lightgrey
      .section-title
        font-family: $R
        color: $teal
        font-size: .8rem
        line-height: 1
        position: absolute
        margin-top: -2.1em
        background: $darkgrey
        font-weight: bold
        padding: 0 .5em 0 0
        border: none
  .main
    .tabs
      a
        color: #fff
      ul
        border-color: $teal
        li.is-active a, li a:hover
          background: #0a0f26
          border-color: $teal
    h2
      font-size: 1.3rem
      font-weight: bold
      color: #fff
      margin-bottom: .75em
    .tab-content
      overflow-x: scroll
      max-height: calc(70vh - 100px - 2rem)
      &.info
        padding-right: 2em
      p.description
        margin-bottom: 2em
      strong
        color: #fff
    .material
      li
        font-family: $A
        display: flex
        margin-bottom: 2em
        .title
          font-size: 1.2rem
          color: #fff
          text-transform: uppercase
        p
          font-size: .8rem
          color: #666
        &::before
          content: ''
          width: 120px
          height: auto
          display: block
          margin-right: 1em
      li[data-type='pdf']::before
        background: url('../assets/gfx/icons/pdf_icon.svg')
        background-repeat: no-repeat
      li[data-type='video']::before
        background: url('../assets/gfx/icons/video_icon.svg')
        background-repeat: no-repeat
</style>
