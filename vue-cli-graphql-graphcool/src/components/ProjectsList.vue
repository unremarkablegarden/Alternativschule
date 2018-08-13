<template lang="pug">
  #projectslist
    //- el-card(v-loading='$apollo.loading', shadow='never')
    .projects
      //- xmp {{ projects }}
      el-collapse(v-for='(project, index) in projects', :key='project.slug', v-model='activeElCollapse', v-if='project.subject.id == subjectId').subject
        el-collapse-item(:title='project.name', :name='project.name')
          .description {{ project.description }}
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
</style>
