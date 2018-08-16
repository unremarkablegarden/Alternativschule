<template lang="pug">
.levelNav
  .guibox
    .loading(v-if='loadingData || loadingUser') Loading...
    div(v-else)
      levelnav
      .columns
        .side-menu.column.is-3
          ul
            li.section-title(v-if="myProjects") Meine Themen
            li(v-for="project in myProjects")
              router-link(:to="'/project/' + currentSubject + '/' + project.slug")
                | {{ project.name }}
            li.section-title(v-if="currentSubjectData.projects") Alle Themen
            li(v-for="project in currentSubjectData.projects", v-if='!projectInUserData(project)')
              router-link(:to="'/project/' + currentSubject + '/' + project.slug")
                | {{ project.name }}

        .main.column.is-8.is-offset-1
          .tabs.is-boxed
            ul
              li(:class="{ 'is-active' : (tab == 'projectview') }")
                router-link(:to='"/project/" + currentSubject + "/" + project') Info
              li(:class="{ 'is-active' : (tab == 'projectview-material') }")
                router-link(:to='"/project/" + currentSubject + "/" + project + "/material"') Material
          .tab-content.info(v-if="tab == 'projectview-home'")
            h2.title Select a project...

          .tab-content.info(v-if="tab == 'projectview'")
            //- xmp {{ currentProjectData }}
            h2.title {{ currentProjectData.name }}
            .level 
              strong Level: 
                | {{ currentProjectData.level }}
            p.description {{ currentProjectData.description }}
            .button Hinzufugen

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
      myProjects: null,
      loadingUser: true,
      loadingData: true,
      currentProjectData: null,
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
    // projectData () {
      // return this.projects.find(o => o.slug === this.project)
      // return this.currentSubjectData.find(o => o.slug === this.project)
    // }
  },
  methods: {
    projectInUserData(project) {
      let foundIt = false
      this.myProjects.forEach((p) => {
        if (p.id == project.id) {
          // console.log(project.name + ' is already added')
          foundIt = true
        }
      })
      return foundIt
    },
    getDb () {
      this.$store.dispatch('getDb')
        .then((response) => {
          this.db = response

          this.setCurrentData()

          this.loadingUser = false
        })
    },
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.myData = response
        this.myProjects = response.studiesProjects
        this.loadingData = false
        // console.log('myData')
        // console.log(response)
      })
    },
    setCurrentData () {
      this.currentSubjectData = this.db.subjects.find(subject => subject.slug === this.currentSubject)
      this.currentProjectData = this.currentSubjectData.projects.find(p => p.slug === this.project)
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
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  .guibox
    text-align: left
    padding: 1.5em
  .side-menu
    font-family: $A
    font-size: 1.125em
    position: relative
    overflow-y: scroll
    height: calc(70vh - 100px - 3rem)
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
      max-height: calc(70vh - 100px - 3rem)
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
