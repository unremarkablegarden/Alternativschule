<template lang="pug">
  #projectslist
    .projects
      el-collapse(v-for='(project, index) in projects', :key='project.slug', v-model='activeElCollapse', v-if='project.subject.id == subjectId').subject
        el-collapse-item(:title='!project.selfLearn ? project.name : project.name + " (Selbstlernbox)"', :name='project.name')
          .description {{ project.description }}
          .level.meta
            i.el-icon-d-caret
            | Level
            .level-box {{ project.level }}
          .isPublished.meta(v-if='project.isPublished')
            i.el-icon-check
            | Ist veröffentlicht
          .isPublished.meta(v-else)
            i.el-icon-close
            | Nicht veröffentlicht
          br
          el-row
            el-col(:span='12')
              ProjectEdit(:projectData='{ id: project.id, name: project.name, description: project.description, level: project.level, selfLearn: project.selfLearn, isPublished: project.isPublished }')
            el-col(:span='12')
              DeleteProjectButton(:id='project.id')

    ProjectAdd(:subject='subjectId', :projects='projects')
</template>

<script>
export default {
  name: 'projectslist',
  props: ['projects', 'subjectId', 'user'],
  data () {
    return {
      activeElCollapse: []
    }
  }
}
</script>

<style lang="sass" scoped>
  .meta
    margin-top: 1em
    font-size: 0.9em
    font-weight: bold
    opacity: 0.8
    letter-spacing: 0.01em
  i
    margin-right: 5px
  .level-box
    margin-left: 10px
    padding: 0 5px
    border: 1px #CCC solid
    border-radius: 3px
    display: inline-block
</style>
