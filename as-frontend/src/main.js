import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'

import '../theme/index.css'
import locale from 'element-ui/lib/locale/lang/de'
import Element from 'element-ui'
Vue.use(Element, { locale })

import TreeView from "vue-json-tree-view"
Vue.use(TreeView)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  provide: createProvider().provide(),
  render: h => h(App)
}).$mount('#app')
