<template lang="pug">
#areas
  Loading(v-if='loading')
  .areas.guibox.columns.is-multiline(v-else)
    router-link(v-for='area in areas', :class='area', :to='"/area/" + area', :key='area').area.column.is-6
      h2.title {{ areaname(area) }}
      planet(v-for='subject in db.areas[area]', :subject="subject.slug", :key="subject.slug")
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
      areas: [],
      areanames: [],
      loading: true
    }
  },
  mounted () {
    this.getDb()
  },
  methods: {
    areaname (slug) {
      return this.areanames.find(o => o.slug === slug).name
    },
    getDb () {
      this.$store.dispatch('getDb').then((res) => {
        this.db = res
        for (let area in res.areas) {
          this.areas.push(area)

          const a = {
            slug: area,
            name: res.areas[area][0].area.name
          }
          this.areanames.push(a)
        }
        this.loading = false
        // console.log(this.db);
      })
    }
  },
}
</script>

<style lang="sass">
@import "@/assets/styles/variables.sass"
.guibox
  width: calc(100vw - 200px)
  height: calc(100vh - 100px)
  margin-left: 100px
  background: #11111199
  color: #fff
  border: 3px solid $teal
  border-radius: .8rem
  box-shadow: 0px 0px 15px $teal
  transition: all 500ms
  z-index: 2
  &:hover
    box-shadow: 0px 0px 30px $teal
</style>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
.area
  position: relative
  transition: all 300ms
  &:nth-child(1)
    border-right: 1px solid $grey
    border-bottom: 1px solid $grey
  &:nth-child(2)
    border-bottom: 1px solid $grey
  &:nth-child(3)
    border-right: 1px solid $grey
  &:hover
    background: #00094880
  .title
    bottom: 0
    left: 1.5em
    font-size: 1em
    line-height: 1
    position: absolute
    text-transform: capitalize
    color: #999
  .planet
    width: 30px
    height: 30px
    position: absolute

//Planet Positions

.area
  &:nth-child(1)
    .planet
      &:nth-child(2)
        top: 10vh
        left: 18vw
      &:nth-child(3)
        top: 5vh
        left: 31vw
      &:nth-child(4)
        top: 30vh
        left: 30vw
      &:nth-child(5)
        top: 23vh
        left: 5vw
      &:nth-child(6)
        top: 27vh
        left: 15vw
  &:nth-child(2)
    .planet
      &:nth-child(2)
        top: 5vh
        left: 20vw
      &:nth-child(3)
        top: 23vh
        left: 33vw
      &:nth-child(4)
        top: 16vh
        left: 7vw
      &:nth-child(5)
        top: 31vh
        left: 15vw
  &:nth-child(3)
    .planet
      &:nth-child(2)
        top: 18vh
        left: 4vw
      &:nth-child(3)
        top: 9vh
        left: 24vw
      &:nth-child(4)
        top: 20vh
        left: 33vw
      &:nth-child(5)
        top: 31vh
        left: 21vw
  &:nth-child(4)
    .planet
      &:nth-child(2)
        top: 6vh
        left: 6vw
      &:nth-child(3)
        top: 16vh
        left: 29vw
      &:nth-child(4)
        top: 28vh
        left: 11vw
      &:nth-child(5)
        top: 16vh
        left: 19vw
</style>
