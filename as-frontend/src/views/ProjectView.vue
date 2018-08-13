<template lang="pug">
.wrapper
  .guibox
    //- competencesnav
    .columns
      .side-menu.column.is-3
        ul
          li.section-title(v-if="currentSubjectData.projects") Alle Themen
          li(v-for="project in currentSubjectData.projects") 
            router-link(:to="'/project/' + currentSubject + '/' + project.slug")
              | {{ project.name }} 
          li.section-title(v-if="myProjects") Meine Themen
          li(v-for="project in myProjects")   
            router-link(:to="currentSubject + '/' + project.slug")
              | {{ project.name }} 
          //- li.section-title(v-if="selflearnProjects") Selbstlernboxen
          //- li(v-for="project in selflearnProjects") 
            router-link(:to="currentSubject + '/' + project.slug")
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
          //- xmp {{ projectData }}
          h2.title {{ projectData.name }}
          .level {{ projectData.level }}
          p {{ projectData.info }}
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
</template>

<script>
import competencesnav from '@/components/projectview/competencesnav.vue'
import progresschart from '@/components/projectview/progresschart.vue'
import lernlevel from '@/components/projectview/lernlevel.vue'
export default {
  name: 'projectview',
  components: {
    competencesnav,
    progresschart,
    lernlevel
  },
  data () {
    return {
      db: null,
      subjects: null,
      currentSubjectData: null,
      // projects: [
      //   {
      //     slug: 'cells',
      //     name: 'Cells',
      //     info: 'Lorem ipsum 1',
      //     level: 'Aufbaukurs 1'
      //   }, 
      //   {
      //     slug: 'mamals',
      //     name: 'Mamals',
      //     info: 'Lorem ipsum 1',
      //     level: 'Aufbaukurs 1'
      //   }, 
      //   {
      //     slug: 'reptilians',
      //     name: 'Reptilians',
      //     info: 'Lorem ipsum 1',
      //     level: 'Aufbaukurs 1'
      //   },
      //   {
      //     slug: 'digestion',
      //     name: 'Digestion',
      //     info: 'Lorem ipsum 1',
      //     level: 'Aufbaukurs 1'
      //   },
      //   {
      //     slug: 'reproduction',
      //     name: 'Reproduction',
      //     info: 'Lorem ipsum 1',
      //     level: 'Aufbaukurs 1'
      //   }
      // ],
      // myProjects: [
      //   {
      //     name: 'Trees',
      //     slug: 'trees'
      //   }
      // ],
      // selflearnProjects: [
      //   {
      //     name: 'Plants', 
      //     slug: 'plants'
      //   },
      //   {
      //     name: 'Ecosystems',
      //     slug: 'ecosystems'
      //   }
      // ]
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
    projectData () {
      return this.projects.find(o => o.slug === this.project)
    }
  },
  methods: {
    getDb () {
      this.$store.dispatch('getDb')
        .then((response) => {
          this.db = response
          // console.log(response)
          this.currentSubjectData = response.subjects.find(subject => subject.slug === this.currentSubject)
          console.log('currentSobjectData');
          console.log(this.currentSubjectData)
        })
    },
    getMyData () {
      this.$store.dispatch('getUserData').then((response) => {
        this.myData = response
        this.subjects = response.studiesSubjects
        this.subjects.forEach(subject => subject.rotate = this.rotate())
        this.loading = false
        console.log('myData');
        console.log(response)
      })
    } 
  },
  mounted () {
    this.getDb()
    this.getMyData()
  }
}
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  .guibox
    text-align: left
    padding: 1.5em
    overflow-x: scroll
  .side-menu
    font-family: $A
    font-size: 1.125em
    position: relative
    overflow: scroll
    height: calc(100vh - 260px)
    ul 
      border-top: 1px solid $lightgrey
      padding-top: 1em
      li
        margin-bottom: 1.1em
        padding-bottom: 1.1em
        border-bottom: 1px solid $lightgrey
        line-height: 1
        a
          color: #fff
          &:hover
            color: $lightgrey
      .section-title
        font-family: $R
        color: $teal
        font-size: .8rem
        position: absolute
        margin-top: -2em
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
      font-size: 1rem
      font-weight: bold
      color: #fff
      margin-bottom: .75em
    .tab-content
      p
        margin-bottom: 2em
    .material
      li
        font-family: $A
        display: flex
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
