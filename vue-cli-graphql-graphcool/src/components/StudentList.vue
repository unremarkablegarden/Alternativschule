<template lang="pug">
  #userslist(v-if='students')
    el-collapse(v-model='active', v-for='student in students', :key='student.username').students
      el-collapse-item(:title='student.fullName', :name='student.username')
        .meta
          | Vertrauenslehrer:&nbsp;
          | {{ student.prefectLinks[0].firstname }}
          //- | {{ student.prefectLinks[0].surname }}
</template>

<script>

export default {
  name: 'studentlist',
  props: ['students'],
  data () {
    return {
      active: [],
    }
  },
  computed: {
    userId () {
      return localStorage.getItem('userId')
    }
  }
}
</script>

<style lang='sass' scoped>
  .meta
    opacity: 0.5
</style>
