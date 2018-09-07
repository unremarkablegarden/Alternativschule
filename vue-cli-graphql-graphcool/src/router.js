import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Login from './views/Login.vue'
// import Posts from './views/Posts.vue'
import Account from './views/Account.vue'
import Users from './views/Users.vue'
import Subjects from './views/Subjects.vue'
import Students from './views/Students.vue'
import Prefect from './views/Prefect.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '*', component: NotFound },
    { path: '/', component: Login, name: 'login' },
    { path: '/logout', component: Login, name: 'logout' },
    // { path: '/posts', component: Posts },
    { path: '/benutzerkonto', component: Account, name: 'account' },
    { path: '/benutzer', component: Users, name: 'users' },
    { path: '/faecher', component: Subjects, name: 'subjects' },
    { path: '/schueler', component: Students, name: 'students' },
    { path: '/vertrauensschueler', component: Prefect, name: 'prefect' }
  ]
})
