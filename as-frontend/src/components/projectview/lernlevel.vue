<template lang="pug">
#lernlevel
  img(src="@/assets/gfx/graphs/lernlevel.svg")
  .select-level
    button(v-for="(item, i) in [1,2,3,4,5,6,7,8,9,10]", :class="{ 'is-selected' : (level === item) }", @click='levelChange(item)', :key="item")
</template>

<script>
export default {
  name: 'lernlevel',
  data () {
    return {
      level: 0
    }
  },
  methods: {
    levelChange(level) {
      this.level = level
      console.log(level)
      // const bar = 100 - (level * 10)
      const courseLevel = 'bk'
      const payload = {
        // subject: this.currentSubject,
        subject: 'history',
        competence: this.currentCompetence,
        level: courseLevel,
        value: level
      }
      this.$store.commit('setLernLevel', payload)
    }
  },
  computed: {
    currentSubject () {
      return this.$route.params.subject
    },
    currentCompetence () {
      return this.$route.params.competence
    }
  }
}
</script>

<style lang="sass" scoped>
  #lernlevel
    position: relative
  .select-level
    position: absolute
    top: 47px
    left: -4px
    button
      height: 30px
      width: 30px
      border-radius: 15px
      border: 1px solid transparent
      background: none
      margin-right: 18.2px
      outline: none
      transition: border 200ms
      &:last-child
        margin-right: 0
      &:hover, &.is-selected
        border: 1px solid #fff
        cursor: pointer


</style>
