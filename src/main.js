import Vue from 'vue'
import App from './App.vue'
import i18n from './lang' // Internationalization
import * as Cookies from 'js-cookie'

import config from './config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/main.scss'
Vue.config.productionTip = false
let isDev = process && process.env.NODE_ENV !== 'production'

// i18n实例

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'small', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
})
new Vue({
  render: h => h(App),
  i18n
}).$mount('#app')
