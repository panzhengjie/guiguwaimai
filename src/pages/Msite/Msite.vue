<template>
  <div class="msite">
    <!--首页头部-->
    <heardTop :title='address.name'>
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id?'/userInfo':'/login'">
            <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
           <span class="header_login_text" v-else>
             <i class="iconfont icon-person"></i>
           </span>
      </router-link>
    </heardTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categoryArr.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cs,index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food"  v-for="(c,index2) in cs" :key="index2">
              <div class="food_container">
                <img :src="imgBaseUrl+c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div >
      <img src="./images/msite_back.svg" alt="导航" v-else>
    </nav>
    <!--首页附近商家-->
    <ShopList></ShopList>
  </div>
</template>

<script>
  import heardTop from '../../components/HeardTop/HeardTop'
  import ShopList from '../../components/ShopList/ShopList'
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  export default {
    name: "Msite",
    data(){
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components:{
      heardTop,
      ShopList
    },
    computed:{
      ...mapState(['address','category','userInfo']),

      categoryArr(){
        //外面的大数组
        let Arr = []
        //里面嵌套的数组
        let arr = []
        const {category} = this
        category.forEach((c, index) => {
          if(arr.length===8){
            arr=[]
          }
          if(arr.length ===0){
            Arr.push(arr)
          }
          arr.push(c)
        })
        return Arr
      }
    },
    mounted () {
      this.$store.dispatch('getCategory')
      this.$store.dispatch('getShop')

    },
    watch:{
      category(value){
        this.$nextTick(()=>{
          new Swiper('.swiper-container',{
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
