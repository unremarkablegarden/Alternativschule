<template lang="pug">
#areas
  .loading(v-if='!db')
    Loading
  .areas(v-else).guibox.columns.is-multiline
    router-link(v-for='(subject, index) in db.areas[currentArea]', :to='subject.area.slug + "/" + subject.slug', :key='subject.slug', :data-index='index').area.column.is-6
      .name {{ subject.name }}
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
    .name
      // bottom: 0
      // right: 0
      font-size: 0.9em
      position: absolute
      text-transform: capitalize
      font-size: 1.3rem
      color: $teal
      // background: #11111199
      transform: translate(0, 13vh)
    .planet
      width: 12vw
  .area[data-index='4']
      position: absolute
      width: 20vw
      transform: translate(33vw, 25vh)
</style>
