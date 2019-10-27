import {RECIVE_ADDRESS,RECIVE_CATEGORY,RECIVE_SHOPS,RECIVE_USERINFO,OUT_USERINFO,RECEIVE_GOODS,RECEIVE_RATINGS,RECEIVE_INFO,INCREASE_COUNT,DECREASE_COUNT,CLEAR_SHOPCART,
  RECEIVE_SEARCH_SHOPS} from './mutation_types'
import Vue from 'vue'
export default {
  [RECIVE_ADDRESS] (state,{address}){
    state.address = address
  },
  [RECIVE_CATEGORY] (state,{category}){
    state.category = category
  },
  [RECIVE_SHOPS] (state,{shops}){
    state.shops = shops
  },
  [RECIVE_USERINFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [OUT_USERINFO](state){
    state.userInfo={}
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [RECEIVE_INFO](state,{info}){
    state.info = info
  },
  [INCREASE_COUNT](state,{food}){
    if (!food.count){

      Vue.set(food, 'count', 1)
      state.shopCart.push(food)
    }else {
      food.count++
    }
  },
  [DECREASE_COUNT](state,{food}){
    if (food.count){
      food.count--
      if(food.count===0){
        state.shopCart.splice(state.shopCart.indexOf(food),1)
      }

    }
  },
  [CLEAR_SHOPCART](state){
    state.shopCart.forEach((food,index)=>{
      food.count = 0
    })
    state.shopCart = []
  },
  [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
    state.searchShops= searchShops
  }

}
