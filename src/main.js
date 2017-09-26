import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
import store from './store'
import Veevalidate from 'vee-validate'
import './assets/style.css'

const networkInterface = createNetworkInterface({
  uri: 'https://timothybom-vue-apollo.appspot.com/graphql'
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem('jwtToken')
    req.options.headers.authorization = token ? token : ''
    next()
  }
}])

const apolloClient = new ApolloClient({
  networkInterface
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)
Vue.use(Veevalidate)

new Vue({
  el: '#app',
  apolloProvider,
  router,
  store,
  render: h => h(App)
})