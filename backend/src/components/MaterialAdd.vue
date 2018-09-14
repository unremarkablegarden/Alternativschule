<template lang="pug">
  #materialadd
    el-button(type="", @click='dialogVisible = true', icon='el-icon-plus', size='mini').add Material Hinzufügen

    el-dialog(title='Material hinzufügen', :visible.sync='dialogVisible', width='800', :close-on-click-modal='false')

      el-form(:model='form', ref='form', :rules='rules', label-width='110px', v-loading='loading', status-icon, @keyup.enter.native="submitForm('form')").form

        el-form-item(label='Title', prop='name')
          el-input(type='text', v-model='form.name', placeholder="Title")

        el-form-item(label='Description', prop='description')
          el-input(type="textarea", :autosize="{ minRows: 4, maxRows: 8 }", placeholder="Project description", v-model="form.description")

        el-form-item(label='Type', prop='type')
          el-radio-group(v-model='form.type', size='small')
            el-radio-button(v-for='type in fileTypes', :key='type', :label='type') {{ type }}

        el-form-item(label='Link', prop='link', v-if='isLink()')
          el-input(type='text', v-model='form.link', placeholder="Link URL")

        el-form-item(label='File', prop='file', v-if='isFile()')
          el-upload.file(ref='file', action='/', :auto-upload='false', v-model='form.file')
            el-button(slot='trigger', size='small', type='', icon='el-icon-document') Select file

        el-form-item
          el-button(type='primary', @click="submitForm('form')", :loading='loading', icon='el-icon-plus')
            span(v-if='loading') Hinzufügen...
            span(v-else) Material Hinzufügen
</template>

<script>
// import slug from 'slug'
import gql from 'graphql-tag'
import axios from 'axios'

export default {
  name: 'materialadd',
  props: ['id'],
  data () {
    return {
      fileTypes: ['Link', 'Video', 'Bild', 'PDF'],
      loading: false,
      uploadedFile: null,
      form: {
        name: '',
        description: '',
        type: '',
        file: '',
        link: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input a title', trigger: 'change' }
        ],
        description: [
          { required: false, message: 'Please input a description', trigger: 'change' }
        ],
        type: [
          { required: true, message: 'Select a type', trigger: ['blur', 'change'] }
        ]
      },
      loading: false,
      error: false,
      dialogVisible: false,
    }
  },

  methods: {
    isLink () {
      if (this.form.type == 'Link' || this.form.type == 'Video') {
        return true
      }
    },
    isFile () {
      if (this.form.type == 'Bild' || this.form.type == 'PDF') {
        return true
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let fileOrLink = false
        if (valid && localStorage.getItem('userId') && this.id) {
          this.loading = true
          this.uploadFile()
        } else {
          this.$message({
            type: 'error',
            message: 'Form error'
          })
          return false
        }
      });
    },

    uploadFile () {
      const file = this.$refs.file.$children[0].fileList[0].raw
      this.form.file = file
      const clConf = {
        cloud_name: 'nilsolleoskar',
        secure: true,
        unsignedUploadPreset: 'jnlwa8it'
      }
      const url = 'https://api.cloudinary.com/v1_1/' + clConf.cloud_name + '/upload'

      let fd = new FormData()
      fd.append("upload_preset", clConf.unsignedUploadPreset)
      fd.append("file", file)

      const config = { headers: { "X-Requested-With": "XMLHttpRequest" } }

      axios.post(url, fd, config)
        .then((res) => {
          const response = res.data
          const url = response.secure_url
          this.uploadedFile = url
          this.addMaterialApollo()
        })
        .catch((err) => {
          this.loading = false
          this.$message({
            type: 'error',
            message: err
          })
          console.error('err', err)
        })
    },

    addMaterialApollo () {

      this.$apollo.mutate({
        // $id: ID!,
        mutation: gql`mutation ($name: String!, $description: String!, $projectId: ID!, $contentType: String, $uploadUrl: String, $linkUrl: String) {
          createMaterial(name: $name, description: $description, projectId: $projectId, contentType: $contentType, uploadUrl: $uploadUrl, linkUrl: $linkUrl) {
            id
            name
            description
            project {
              name
              id
            }
            contentType
            uploadUrl
            linkUrl
          }
        }`,
        variables: {
          name: this.form.name,
          description: this.form.description,
          projectId: this.id,
          contentType: this.form.type,
          uploadUrl: this.uploadedFile,
          linkUrl: this.form.link
        },
      })
      .then((data) => {
        console.log(data)
        this.$apolloProvider.defaultClient.reFetchObservableQueries()
        this.loading = false
        this.dialogVisible = false
        this.$refs.form.resetFields()
        this.$message({
          type: 'success',
          message: 'Material Hinzufügt: ' + this.form.name
        })
      })
      .catch((error) => {
        console.error(error)
        this.$message({
          type: 'error',
          message: error.message
        })
        this.loading = false
      })
    },

    // clearObjProps (obj) {
    //   Object.keys(obj).forEach((k) => { obj[k] = null })
    // }
  }
}
</script>

<style lang="sass" scoped>
  .add
    margin-top: 0.5em
</style>
