<template lang="pug">
  #userslist
    el-tabs(type='border-card', v-loading='!usersByType')
      el-tab-pane(v-if='!usersByType')
        span(slot='label')
          i.el-icon-loading Loading
        | Loading
      el-tab-pane(v-for='type in userTypes', :key='type', v-else)
        span(slot='label') {{ type }}
        el-table(:data='usersByType[type]', style='width: 100%', :default-sort="{prop: 'surname', order: 'ascending'}")
          el-table-column(prop='firstname', label='Vorname', sortable)
          el-table-column(prop='surname', label='Nachname', sortable)
          el-table-column(prop='username', label='Nutzername', sortable)
          el-table-column(label='Operationen', width="200")
            template(slot-scope='scope')
              el-button(size='mini', @click='handleEdit(scope.$index, scope.row)', icon='el-icon-edit') Edit
              MutationButton(mutation='deleteUser', :id='scope.row.id')

      UserAdd
    //- useredit is in the same component as list because they talk to each other. button->handleEdit() fills the child component editor
    UserEdit(:dialogVisible.sync='dialogVisible', :editUserForm='editUserForm')
</template>

<script>
// import USERS_BY_TYPE from '@/graphql/UsersByType.gql'
import ALL_USERS from '@/graphql/Users.gql'
import USER_TYPES from '../graphql/UserTypes.gql'

//-- subscription not needed if you do an updateQueries callback
// import USER_ADDED from '@/graphql/UserAdded.gql'
//-- error: "The provided query doesn't include any known model name. Please check for the latest subscriptions API."

export default {
  name: 'userslist',

  data () {
    return {
      dialogVisible: false,
      editUserForm: {
        id: '', email: '', username: '', firstname: '', surname: '', password: '', checkPassword: '', userType: ''
      },
      loadingUsers: true,
      loadingUserTypes: true,
      loadingBoth: true,
      usersByType: null
    }
  },

  apollo: {
    allUsers: {
      query: ALL_USERS,
      loadingKey: 'loading',
      result (data) {
        this.loadingUsers = false
      }
    },
    userTypes: {
      query: USER_TYPES,
      variables: {
        'enumName': "UserTypes"
      },
      update (data) {
        this.loadingUserTypes = false
        return data.__type.enumValues.map(o => o.name)
      }
    }
  },

  watch: {
    loadingUserTypes: function (e) {
      this.checkBoth()
    },
    loadingUsers: function (e) {
      this.checkBoth()
    },
    allUsers: function(e) {
      this.checkBoth()
    }
  },

  methods: {
    checkBoth () {
      if (this.loadingUserTypes == false && this.loadingUsers == false) {
        this.loadingBoth = false
        this.setUsersByType(this.allUsers)
      }
    },
    setUsersByType (w) {
      // make an array with a bucket of each userType then set that to the component data usersByType
      let users = []
      this.userTypes.forEach((e) => {
        users[e] = w.filter(o => o.userType === e)
      })
      this.usersByType = users
      // console.log(this.usersByType)
    },
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
