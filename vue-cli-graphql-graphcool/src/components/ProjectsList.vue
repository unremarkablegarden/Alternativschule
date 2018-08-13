<template lang="pug">
  #projectslist
    //- el-card(v-loading='$apollo.loading', shadow='never')
    .projects
      el-collapse(v-for='(project, index) in projects', :key='project.slug', v-model='activeElCollapse').subject
        el-collapse-item(:title='project.name', :name='project.name')
          .description {{ project.description }}
    ProjectAdd(:subject='subject', :projects='projects')
</template>

<script>
export default {
  name: 'projectslist',
  props: ['projects', 'subject', 'user'],
  data () {
    return {
      activeElCollapse: []
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
