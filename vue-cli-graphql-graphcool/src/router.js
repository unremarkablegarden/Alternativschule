import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Login from './views/Login.vue'
import Posts from './views/Posts.vue'
import Users from './views/Users.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '*', component: NotFound },
    { path: '/', component: Login },
    { path: '/posts', component: Posts },
    { path: '/users', component: Users }
  ]
})
