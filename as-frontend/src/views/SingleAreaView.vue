<template lang="pug">
#areas
  .loading(v-if='!db')
    h1 Loading...
  .areas(v-else).guibox.columns.is-multiline
    router-link(v-for='subject in db.areas[currentArea]', :to='subject.area.slug + "/" + subject.slug', :key='subject.slug').area.column.is-6
      h2.title {{ subject.name }}
      planet(:subject="subject.slug")
</template>

<script>
import planet from '@/components/areas/planet.vue'
export default {
  components: {
    planet
  },
  data () {
    return {
      db: null,
      subjects: null
    }
  },
  mounted () {
    this.getDb()
  },
  computed: {
    currentArea () {
      return this.$route.params.area
    }
  },
  methods: {
    getDb () {
      this.$store.dispatch('getDb').then((res) => {
        this.db = res
        console.log(res)
      })
    }
  },
}
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
</style>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  h2
    color: #AAA
  .area
    display: flex
    align-items: center
    justify-content: center
    position: relative
    transition: background-color 200ms

    &:nth-child(1)
      border-right: 1px solid $grey
      border-bottom: 1px solid $grey
    &:nth-child(4)
      margin-top: -1px
      margin-left: -1px
      border-left: 1px solid $grey
      border-top: 1px solid $grey
    &:hover
      background: #00094880
    .title
      bottom: 0
      left: 1em
      font-size: 1em
      position: absolute
      text-transform: capitalize
    .planet
      width: 12vw
</style>
