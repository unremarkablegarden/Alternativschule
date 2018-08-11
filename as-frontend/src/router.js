import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import SolarSystem from './views/SolarSystem.vue'
import SubjectView from './views/SubjectView.vue'
import Areas from './views/Areas.vue'
import SingleAreaView from './views/SingleAreaView.vue'
import SubjectAreaSingle from './views/SubjectAreaSingle.vue' 
import ProjectView from './views/ProjectView.vue'
import CompetenceView from './views/CompetenceView.vue'
import SettingsView from './views/SettingsView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: SolarSystem
    },
    {
      path: '/subject/:subject',
      name: 'subjectView',
      component: SubjectView
    },
    {
      path: '/areas',
      name: 'areas',
      component: Areas
    },
    {
      path: '/area/:area',
      name: 'area',
      component: SingleAreaView
    },
    {
      path: '/area/:area/:subject',
      name: 'subjectareasingle',
      component: SubjectAreaSingle
    },
    {
      path: '/project/:subject',
      name: 'projectview-home',
      component: ProjectView
    },
    {
      path: '/project/:subject/:project',
      name: 'projectview',
      component: ProjectView
    },
    {
      path: '/project/:subject/:project/material',
      name: 'projectview-material',
      component: ProjectView
    },
    {
      path: '/competence/:subject/:competence',
      name: 'competenceview',
      component: CompetenceView
    },
    {
      path: '/settings',
      name: 'settingsview',
      component: SettingsView
    }
  ]
})
