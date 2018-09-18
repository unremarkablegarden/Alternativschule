<template lang="pug">
  #projectslist
    .projects
      el-collapse(v-for='(project, index) in projects', :key='project.slug', v-model='activeElCollapse', v-if='project.subject.id == subjectId').subject
        el-collapse-item(:name='project.name')
          template(slot='title')
            //- .title(v-if='project.selfLearn')
            //- {{ !project.selfLearn ? project.name + " (" + project.level + ")" : project.name + " (" + project.level + ", Selbstlernbox)" }}
            icon(icon='doc', v-if='project.isPublished')
            icon(icon='ghost', v-else)
            | {{ project.name }}

            .levels.right
              | {{ project.levels.join('/') }}
              | &nbsp;&nbsp;&nbsp;
            //- el-icon-news
          .description {{ project.description }}
          .horizontal
            .level.meta
              i.el-icon-d-caret
              | Levels
              .level-box(v-for='level in project.levels') {{ level }}
            .isPublished.meta(v-if='project.isPublished')
              i.el-icon-check
              | Ist veröffentlicht
            .isPublished.not.meta(v-else)
              i.el-icon-close
              | Nicht veröffentlicht
          br
          //- el-row
            el-col(:span='14')
            //- el-col(:span='10')
          .horizontal
            ProjectEdit(:projectData='{ id: project.id, name: project.name, description: project.description, levels: project.levels, selfLearn: project.selfLearn, isPublished: project.isPublished, subject: subjectId }')

            DeleteProjectButton(:id='project.id')

          MaterialsList(:id='project.id', :materials='project.materials')

          el-card(shadow='never', v-if='project.students.length').box.students
            strong Eingeschriebene Schüler*innen
            ul.student(v-for='student in project.students')
              li {{ student.firstname }} {{ student.surname }}

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

<style lang="sass">
  .el-collapse-item .el-collapse-item .el-collapse-item__header.is-active
    font-weight: bold !important
  .horizontal
    display: flex
  .horizontal > *
    margin-right: 1em

  #projectslist .el-collapse-item__header
     .sli-svg
       transform: scale(0.66) translate(-3px, 9px) !important
</style>

<style lang="sass" scoped>
  .description
    border-top: 1px #eee solid
    padding-top: 1em
  .meta
    margin-top: 1em
    font-size: 0.9em
    font-weight: bold
    opacity: 0.8
    letter-spacing: 0.01em
  i
    margin-right: 5px
  .level-box
    margin-left: 5px
    padding: 0 5px
    border: 1px #CCC solid
    border-radius: 4px
    display: inline-block
  .box
    padding: 1em 0
    margin: 1em 0
  .level, .levels
    font-size: 0.86em
  ul, li
    padding: 0
    margin: 0
  ul
    margin-top: 0.5em
    padding-left: 1.25em
  .isPublished.not
    color: #e53c3c
</style>
