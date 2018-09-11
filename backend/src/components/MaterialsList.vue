<template lang="pug">
  .materialslist(v-if='!loading')
    .title Material
    el-row.legend(v-if='sortedMaterials.length')
      el-col(:span='2')
        span &nbsp;
      el-col(:span='6')
        strong Typ
      el-col(:span='14')
        strong Name
      //- el-col(:span='4')
        strong Bearbeiten
    el-row.material(v-for='(material, index) in sortedMaterials', :key='material.id')
      el-col(:span='2')
        el-button(icon='el-icon-edit', type='text').smallbutt
      el-col(:span='6')
        .type {{ material.contentType }}
      el-col(:span='14')
        .name {{ material.name }}
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
    border-top: 1px #eee solid
    padding-top: 1em
    margin-top: 2em
    margin-bottom: 2em
  .title
    padding-bottom: 1em
    font-weight: bold
</style>
