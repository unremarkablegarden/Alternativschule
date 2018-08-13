import Vue from 'vue'
import App from './App.vue'
// import VueAsyncOperations from 'vue-async-operations'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'

// Vue.use(VueAsyncOperations)

// import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import locale from 'element-ui/lib/locale/lang/de'
import Element from 'element-ui'
Vue.use(Element, { locale })

// import 'vue-awesome/icons'
// import Icon from 'vue-awesome/components/Icon'
// Vue.component('icon', Icon)

// import AlertIcon from 'vue-ionicons/dist/ios-alert.vue'
// Vue.component('alert-icon', AlertIcon)

import SimpleLineIcons from 'vue-simple-line'
Vue.component('icon', SimpleLineIcons)

import MutationButton from '@/components/MutationButton'
Vue.component('MutationButton', MutationButton)

import UsersList from '@/components/UsersList.vue'
Vue.component('UsersList', UsersList)
import UserAdd from '@/components/UserAdd.vue'
Vue.component('UserAdd', UserAdd)
import UserEdit from '@/components/UserEdit.vue'
Vue.component('UserEdit', UserEdit)

import AccountEdit from '@/components/AccountEdit.vue'
Vue.component('AccountEdit', AccountEdit)
import AccountPasswordReset from '@/components/AccountPasswordReset.vue'
Vue.component('AccountPasswordReset', AccountPasswordReset)
import AccountSubjectsList from '@/components/AccountSubjectsList.vue'
Vue.component('AccountSubjectsList', AccountSubjectsList)

import SubjectsList from '@/components/SubjectsList.vue'
Vue.component('SubjectsList', SubjectsList)
import SubjectAdd from '@/components/SubjectAdd.vue'
Vue.component('SubjectAdd', SubjectAdd)
import SubjectEdit from '@/components/SubjectEdit.vue'
Vue.component('SubjectEdit', SubjectEdit)

import ProjectsList from '@/components/ProjectsList.vue'
Vue.component('ProjectsList', ProjectsList)
import ProjectAdd from '@/components/ProjectAdd.vue'
Vue.component('ProjectAdd', ProjectAdd)
// import ProjectEdit from '@/components/ProjectEdit.vue'
// Vue.component('ProjectEdit', ProjectEdit)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  provide: createProvider().provide(),
  render: h => h(App)
}).$mount('#app')
