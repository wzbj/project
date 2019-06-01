import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import { directive } from './utils/directive'

import '@/styles/index.scss' // global css

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video

Vue.use(ElementUI, { locale })
directive()
let options = {
  fullscreenEl: false //关闭全屏显示按钮
};
Vue.use(preview, options)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
