<template lang="pug">
.wrapper
  .store
    h1 Store data
    p userId: {{ userId }}
    //- xmp.data {{ db }}
    tree-view(:data='db')
</template>

<script>
export default {
  data () {
    return {
      db: null
      // userId: null
    }
  },
  mounted () {
    this.getDb()
  },
  methods: {
    getDb () {
      this.$store.dispatch('getDb').then((res) => {
        this.db = res
      })
    }
  },
  computed: {
    userId () {
      const id = localStorage.getItem('userId')
      return id
    }
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    display: block !important
  .store
    width: 70vw
    position: relative
    left: 15vw
    background: white
    display: block
    text-align: left
    margin: 1em
    padding: 1em
  h1
    font-weight: bold
  p
    margin: 1em 0
  .data
    clear: both
    font-size: 12px
    line-height: 1em
</style>
