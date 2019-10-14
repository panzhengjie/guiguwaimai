import Vue from 'vue'
import VueRouter from 'vue-router'

/*import msite from '../pages/Msite/Msite.vue'
import order from '../pages/Order/Order.vue'
import profile from '../pages/Profile/Profile.vue'
import search from '../pages/Search/Search.vue'
import login from '../pages/Login/Login.vue'*/
const msite = () => import ('../pages/Msite/Msite.vue')
const order = () => import ('../pages/Order/Order.vue')
const profile = () => import ('../pages/Profile/Profile.vue')
const search = () => import ('../pages/Search/Search.vue')
const login = () => import ('../pages/Login/Login.vue')
import shop from '../pages/Shop/Shop'
import goods from '../pages/Shop/ShopGoods/ShopGoods'
import ratings from '../pages/Shop/ShopRatings/ShopRatings'
import shopinfo from '../pages/Shop/ShopInfo/ShopInfo'
Vue.use(VueRouter)
export default new VueRouter({
  routes:[
    {
      path:'/msite',
      component:msite,
      meta:{
        toShow : true
      }
    },
    {
      path:'/order',
      component:order,
      meta:{
        toShow : true
      }
    },
    {
      path:'/profile',
      component:profile,
      meta:{
        toShow : true
      }
    },
    {
      path:'/search',
      component:search,
      meta:{
        toShow : true
      }
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/shop',
      component:shop,
      children:[
        {
          path:'/shop/goods',
          component:goods
        },
        {
          path:'/shop/ratings',
          component:ratings
        },
        {
          path:'/shop/shopinfo',
          component:shopinfo
        },
        {
          path:'',
          redirect: '/shop/goods'
        }
      ]
    },
    {
      path:'/',
      redirect:'/msite'
    }
  ]
})
