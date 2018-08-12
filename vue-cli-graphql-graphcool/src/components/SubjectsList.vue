<template lang="pug">
  #subjectslist
    el-tabs(type='border-card', v-loading='!$apollo.loading')
      el-tab-pane
        span(slot='label')
          i.el-icon-loading Loading
        | Loading
      //- el-tab-pane(v-for='type in userTypes', :key='type', v-else)
        span(slot='label') {{ type }}
        el-table(:data='usersByType[type]', style='width: 100%', :default-sort="{prop: 'surname', order: 'ascending'}")
          el-table-column(prop='firstname', label='Name', sortable)
          el-table-column(prop='surname', label='Surname', sortable)
          el-table-column(prop='username', label='Username', sortable)
          el-table-column(label='Operations', width="190")
            template(slot-scope='scope')
              el-button(size='mini', @click='handleEdit(scope.$index, scope.row)', icon='el-icon-edit') Edit
              MutationButton(mutation='deleteUser', :id='scope.row.id')

    //- UserEdit(:dialogVisible.sync='dialogVisible', :editUserForm='editUserForm')
</template>

<script>
// import USERS_BY_TYPE from '@/graphql/UsersByType.gql'
import ALL_SUBJECTS from '@/graphql/Subjects.gql'
// import USER_TYPES from '../graphql/UserTypes.gql'


export default {
  name: 'subjectslist',

  data () {
    return {
      dialogVisible: false,
    }
  },

  apollo: {
    // allUsers: {
    //   query: ALL_USERS,
    //   loadingKey: 'loading',
    //   result (data) {
    //     this.loadingUsers = false
    //   }
    // }
  },

  watch: {
  },

  methods: {
    handleEdit (index, row) {
      this.editUserForm = Object.assign({checkPassword: row.password}, row)
      this.dialogVisible = true
    },
    formatter(row, column) {
      return row.address;
    },
    Cfirst (value) {
      return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
    },
  }
}
</script>

<style lang="sass">
</style>
