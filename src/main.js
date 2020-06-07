import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppHeader from './components/AppHeader.vue'
import ErrorBox from './components/Error.vue'

Vue.config.productionTip = false

Vue.component('AppHeader', AppHeader)
Vue.component('Error', ErrorBox)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
