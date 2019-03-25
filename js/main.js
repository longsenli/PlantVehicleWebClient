
import App from './App'
import router from './router'

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})