import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import Add from '../components/Add.vue'
import Index from '../views/Index.vue'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component:Index,
      // children:[
      //   {path:'/login',component:Login,name:'aa'},
      //   {path:'/register',component:Register}
      // ]
    },
    {
      path: '/login',
      name: '',
      component:Login,
    },
    {
      path: '/register',
      name: '',
      component:Register,
    }
  ]
})