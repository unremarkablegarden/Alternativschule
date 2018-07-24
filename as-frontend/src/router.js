import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import SolarSystem from './views/SolarSystem.vue'
import Planet from './views/Planet.vue'
import AreaMap from './views/AreaMap.vue'
import SubjectMap from './views/SubjectMap.vue'
import SubjectSingle from './views/SubjectSingle.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: SolarSystem
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/solarsystem',
      name: 'solarsystem',
      component: SolarSystem
    },
    {
      path: '/planet',
      name: 'planet',
      component: Planet
    },
    {
      path: '/areamap',
      name: 'areamap',
      component: AreaMap
    },
    {
      path: '/areamap/subjects',
      name: 'subjectmap',
      component: SubjectMap
    },
    {
      path: '/areamap/subjects/single',
      name: 'subjectsingle',
      component: SubjectSingle
    }
  ]
})
