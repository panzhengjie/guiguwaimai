import {reqAddress, reqCategorys, reqShops,reqUser,reqLogout,reqShopGoods,reqShopRatings,reqShopInfo,reqSearchGoods} from '../api'
import {
  RECIVE_ADDRESS,
  RECIVE_CATEGORY,
  RECIVE_SHOPS,
  RECIVE_USERINFO,
  OUT_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  DECREASE_COUNT,
  INCREASE_COUNT,
  CLEAR_SHOPCART,
  RECEIVE_SEARCH_SHOPS
} from './mutation_types'
export default {
  async getAddress({commit,state}){
    const geohash = state.latitude + ',' + state.longitude
     const result =  await reqAddress(geohash)
    commit(RECIVE_ADDRESS,{address:result.data})
  },
  async getCategory({commit,state}){
    const result =  await reqCategorys()
    commit(RECIVE_CATEGORY,{category:result.data})
  },
  async getShop({commit,state}){
    let {latitude, longitude} = state
    const result =  await reqShops({latitude, longitude})
    commit(RECIVE_SHOPS,{shops:result.data})
  },
  getUserInfo({commit},userInfo){
    commit(RECIVE_USERINFO,{userInfo})
  },
  async getInfo({commit}){
    const result =  await reqUser()
    if(result.code===0){
      let userInfo = result.data
      commit(RECIVE_USERINFO,{userInfo})
    }

  },
  async loyout({commit}){
    const result =  await reqLogout()
    if(result.code===0){
      commit(OUT_USERINFO)
    }
  },
  async getGoods({commit},callback){
    const result =  await reqShopGoods()
    if(result.code===0){
      let goods = result.data
      commit(RECEIVE_GOODS,{goods})
      callback && callback()
    }

  },
  async getRatings({commit},callback){
    const result =  await reqShopRatings()
    if(result.code===0){
      let ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      callback && callback()
    }

  },
  async getInfos({commit}){
    const result =  await reqShopInfo()
    if(result.code===0){
      let info = result.data
      commit(RECEIVE_INFO,{info})
    }

  },
  upDateFoodCount({commit},{food,add}){
      if(add){
        commit(INCREASE_COUNT,{food})
      } else {
        commit(DECREASE_COUNT,{food})
      }
  },
  clearCartList({commit}){
    commit(CLEAR_SHOPCART)
  },
  async searchShop({commit, state}, keyword) {
    const geohash = state.latitude +','+ state.longitude
    const result = await reqSearchGoods(geohash, keyword)

      const searchShops =result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})


  }
}
