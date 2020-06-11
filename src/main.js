import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppHeader from './components/AppHeader.vue'
import ErrorBox from './components/Error.vue'
import Result from './components/Result.vue'
import RunBtn from './components/RunBtn.vue'
import TextInput from './components/TextInput.vue'

import VuePageTitle from 'vue-page-title'

Vue.use(VuePageTitle, {
  suffix: ' | NI Prototypes'
})

Vue.config.productionTip = false

Vue.component('AppHeader', AppHeader)
Vue.component('Error', ErrorBox)
Vue.component('Result', Result)
Vue.component('RunBtn', RunBtn)
Vue.component('TextInput', TextInput)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
