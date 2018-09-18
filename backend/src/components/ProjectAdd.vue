<template lang="pug">
  #projectadd
    el-button(type="primary", @click='dialogVisible = true', icon='el-icon-plus', size='mini').add Projekt Hinzufügen

    el-dialog(title='Projekt hinzufügen', :visible.sync='dialogVisible', width='800', :close-on-click-modal='false')

      el-form(:model='form', ref='form', :rules='rules', label-width='110px', v-loading='loading', status-icon, @submit.native.prevent).form

        el-form-item(label='Title', prop='name')
          el-input(type='text', v-model='form.name', placeholder="Project title")

        el-form-item(label='Description', prop='description')
          el-input(type="textarea", :autosize="{ minRows: 4, maxRows: 8 }", placeholder="Project description", v-model="form.description")

        el-row
          el-col(:span='8')
            el-form-item(label='Selbstlernbox', prop='selfLearn')
              el-switch(v-model='form.selfLearn')
          el-col(:span='10')
            el-form-item(label='Published', prop='published')
              el-switch(v-model='form.isPublished')

        el-form-item(label='Levels', prop='levels')
          el-checkbox-group(v-model='form.levels', size='small')
            el-checkbox(v-for='level in subjectLevels', :key='level', :label='level', border) {{ level }}

        el-form-item
          el-button(type='primary', @click="submitForm('form')", :loading='loading', icon='el-icon-plus')
            span(v-if='loading') Hinzufügen...
            span(v-else) Projekt Hinzufügen
</template>

<script>
import gql from 'graphql-tag'
import slug from 'slug'
import PROJECT_ADD from '../graphql/ProjectAdd.gql'

export default {
  name: 'projectadd',
  props: ['subject'],
  data () {
    return {
      // levelsOptions: ['BK', 'GK', 'AK', 'AK1', 'AK2'],
      form: {
        name: '',
        description: '',
        selfLearn: false,
        isPublished: true,
        levels: []
      },
      rules: {
        name: [
          { required: true, message: 'Please input a title', trigger: 'change' }
        ],
        description: [
          { required: true, message: 'Please input a description', trigger: 'change' }
        ],
        levels: [
          { required: true, message: 'Select a level', trigger: ['blur', 'change'] }
        ]
      },
      loading: false,
      error: false,
      dialogVisible: false,
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && localStorage.getItem('userId') && this.subject) {
          this.apolloMutation()
        } else {
          this.$message({
            type: 'error',
            message: 'Form error'
          })
          return false
        }
      });
    },

    apolloMutation () {
      this.loading = true
      const formCopy = Object.assign({}, this.form)
      this.$refs.form.resetFields()

      this.$apollo.mutate({
        mutation: PROJECT_ADD,
        variables: {
          name: formCopy.name,
          slug: slug(formCopy.name, {lower: true}),
          description: formCopy.description,
          selfLearn: formCopy.selfLearn,
          isPublished: formCopy.isPublished,
          levels: formCopy.levels,
          teacher: localStorage.getItem('userId'),
          subject: this.subject
        },
      })
      .then((data) => {
        console.log('--projectAdd then()--')
        console.log(data)

        this.$apolloProvider.defaultClient.reFetchObservableQueries()

        this.$refs.form.resetFields()
        this.loading = false
        this.dialogVisible = false
      })
      .catch((error) => {
        console.error(error)
        this.$message({
          type: 'error',
          message: error.message
        })
        this.form = formCopy
        this.loading = false
      })
    },

    clearObjProps (obj) {
      Object.keys(obj).forEach((k) => { obj[k] = null })
    },

  },
  apollo: {
    subjectLevels: {
      query: gql`query ($subjectId: ID!) {
        Subject(id: $subjectId) {
          levels
        }
      }`,
      variables () {
        return {
          subjectId: this.subject,
        }
      },
      update (result) {
        // console.log(result);
        return this.$sortLevels(result.Subject.levels)
      },
    }
  }
}
</script>

<style lang="sass">
  .subjects
    .el-card__body
      padding-top: 0 !important
  .subject
    &:first-child
      .el-collapse
        // border-top: 0 !important
    &:last-child
      .el-collapse
        // border-bottom: 0 !important
</style>

<style lang="sass" scoped>
  .add
    margin-top: 1em

</style>
