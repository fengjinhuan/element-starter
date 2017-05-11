
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import $ from 'jquery'
import Vuex from 'vuex';


// import until from './until'
Vue.use(VueResource);
Vue.use(ElementUI)
Vue.use(Vuex);
Vue.prototype.id= ''
new Vue({
  el: '#app',
  router,
  render: h => h(App) 
})
