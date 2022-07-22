import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/myelement.css'
import router from './router/index'
import store from './store/index'
import { request } from "./network/request"
import './assets/iconfont/iconfont.css';

Vue.use(ElementUI)

Vue.prototype.$request = request;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
