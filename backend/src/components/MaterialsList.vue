<template lang="pug">
  .materialslist(v-if='!loading')
    el-card(shadow='never').box
      .materials(v-if='sortedMaterials.length')
        el-row.material(v-for='(material, index) in sortedMaterials', :key='material.id')
          el-col(:span='3')
            .typ
              i(v-if="material.contentType == 'Bild'").el-icon-picture
              i(v-if="material.contentType == 'PDF'").el-icon-document
              | &nbsp;
          el-col(:span='16')
            .name {{ material.name }}
          el-col(:span='2').view
            el-button(icon='el-icon-view', type='text', @click='viewMaterial(material)').smallbutt
          el-col(:span='2').delete
            MaterialDelete(:id='material.id')

          //- a(:href='material.linkUrl', target='_blank') {{ material.name }}

      MaterialAdd(:id='id')
      //- br
      //- el-button(size='mini', icon='el-icon-upload2') Material hochladen
</template>

<script>
import gql from 'graphql-tag'

export default {
	name: 'materialslist',
	props: ['id', 'materials'],
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    sortedMaterials () {
      return this.materials.sort(function(a,b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) } )
    }
  },
  methods: {
    viewMaterial (m) {
      let toOpen
      if (m.linkUrl) {
        toOpen = m.linkUrl
      }
      if (m.uploadUrl) {
        toOpen = m.uploadUrl
      }
      window.open(toOpen, '_newtab');
    },
    deleteMaterial (id) {
      console.log('delete: ' + id)
    }
  }

  // apollo: {
  //   materials: {
  //     query: gql`query ($projectId: ID!) {
  //       allMaterials(filter: {
  //         project: {
  //           id: $projectId
  //         }
  //       }) {
  //         id
  //         name
  //         description
  //         contentType
  //         uploadUrl
  //         linkUrl
  //       }
  //     }`,
  //     variables () {
  //       return {
  //         projectId: this.projectId
  //       }
  //     },
  //     update (result) {
  //       console.log(result)
  //       return result
  //     },
  //     result (result) {
  //       this.loading = false
  //     }
  //   }
  // }
}
</script>

<style lang="sass">
  .smallbutt
    padding: 0 !important
</style>

<style lang="sass" scoped>
  .materialslist
    // border-top: 1px #eee solid
    padding-top: 1em
    margin-top: 1em
    // margin-bottom: 2em
  .title
    padding-bottom: 1em
    font-weight: bold
  .box
    padding: 1em 0
  .materials
    margin-bottom: 1em
  .typ
    padding-left: 3px
    padding-top: 1px
    i
      font-size: 18px

</style>
