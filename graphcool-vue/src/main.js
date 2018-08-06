import Vue from 'vue'
import App from './App.vue'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

const networkInterface = createNetworkInterface(
  { uri: 'https://api.graph.cool/simple/v1/cjjzt28rc13n90179vyze0inq'}
)

const apolloClient = new ApolloClient({
  networkInterface,
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// Start the app
new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App)
})
