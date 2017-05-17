import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import Add from '../components/Add.vue'
import Index from '../views/Index.vue'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import Home from '../views/Home.vue'
import Admin from '../views/home/Admin.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component:Index,
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
    },
    {
      path: '/home',
      name: 'home',
      component:Home,
      children:[
        {path:'/home/admin',name:'HomeAdmin',component:Admin}
      ]
    }
  ]
})