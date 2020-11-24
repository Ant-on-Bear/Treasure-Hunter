import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import axios from 'axios'

axios.defaults.baseURL = 'https://treasure-hunter-2f614.firebaseio.com';

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
