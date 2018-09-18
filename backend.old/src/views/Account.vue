<template lang="pug">
  #account
    el-tabs(type='border-card', v-loading='$apollo.loading', stretch)
      el-tab-pane
        span(slot='label')
          icon(icon='list', color='lightgray').icon
          | Meine Themen
        AccountSubjectsList
      el-tab-pane
        span(slot='label')
          icon(icon='user', color='lightgray').icon
          | Benutzerkonto
        AccountEdit
      el-tab-pane
        span(slot='label')
          icon(icon='login', color='lightgray').icon
          | Kennwort zurücksetzen

        AccountPasswordReset
</template>


<script>

export default {
  name: 'account',
}
</script>
