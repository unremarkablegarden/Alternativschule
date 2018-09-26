<template lang="pug">
  i.el-icon-loading.loading.large
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="sass">
  .loading.large
    font-size: 60px !important
    display: inline-block
    position: fixed
    top: 45vh
    left: 50vw
    transform: translate(-50%, -50%)
    color: #FFF !important
    padding: 0
    margin: 0
    text-align: center
</style>
