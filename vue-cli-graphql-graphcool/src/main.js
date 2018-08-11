import Vue from 'vue'
import App from './App.vue'
import VueAsyncOperations from 'vue-async-operations'
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
import UserAdd from '@/components/UserAdd.vue'
import UserEdit from '@/components/UserEdit.vue'
Vue.component('UsersList', UsersList)
Vue.component('UserAdd', UserAdd)
Vue.component('UserEdit', UserEdit)

import SubjectsList from '@/components/SubjectsList.vue'
import SubjectAdd from '@/components/SubjectAdd.vue'
import SubjectEdit from '@/components/SubjectEdit.vue'
Vue.component('SubjectsList', SubjectsList)
Vue.component('SubjectAdd', SubjectAdd)
Vue.component('SubjectEdit', SubjectEdit)

// import SubjectEdit from '@/components/SubjectEdit.vue'
// Vue.component('SubjectsList', SubjectsList)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  provide: createProvider().provide(),
  render: h => h(App)
}).$mount('#app')
