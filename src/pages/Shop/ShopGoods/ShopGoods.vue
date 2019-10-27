<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good,index) in goods" :key="index"
          :class="{current:index === currentIndex}" @click="changeList(index)">
            <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon">{{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list-hook"  v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index"
              @click="toshow(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>

            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food ref="foods" :food="food"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  export default {
    name: 'ShopGoods',
    components:{
      CartControl,
      Food,
      ShopCart
    },
    data(){
      return {

        tops:[], //存着good的clientHight值的数组
        scrollY:0 ,//实时的位移Y
        food:{}
      }
    },
    mounted () {
      this.$store.dispatch('getGoods',()=>{
        this.$nextTick(()=>{
          this._initBScroll()
          this._initTops ()
        })
      })

    },
    computed:{
      ...mapState(['goods']),
      currentIndex(){
        const {tops,scrollY} = this
        const index = tops.findIndex((top,index)=>{
          return scrollY>=top && scrollY<tops[index+1]
        })
        if(this.scrollLeft){
          if(index>(tops.length-4)){
            this.scrollLeft.scrollTo(0,-59,300)
          } else if(index<=(tops.length-4)){
            this.scrollLeft.scrollTo(0,0,300)
          }
        }

        return index
      }
    },
    methods:{
      _initBScroll(){//滚动效果
        this.scrollLeft = new BScroll('.menu-wrapper',{
          scrollY: true,
          click: true
        })
        this.scrollRight = new BScroll('.foods-wrapper',{
          scrollY: true,
          click: true,
          probeType:3 //滚动滚性也可以计算滚动值
        })
        this.scrollRight.on('scroll', ({x,y})=>{
          /*console.log(x,y)*/
          this.scrollY = Math.abs(y)
        })
        this.scrollRight.on('scrollEnd', ({x,y})=>{
          /*console.log(x,y,'ScrollEnd')*/
          this.scrollY = Math.abs(y)
        })
        this.scrollLeft.on('scrollEnd', ({x,y})=>{
          console.log(x,y,'ScrollEnd')

        })
      },
      _initTops (){//返回tops数组
        let tops = []
        let top = 0
        tops.push(top)
        const list = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(list).forEach((li,index)=>{
          top += li.clientHeight
          tops.push(top)

        })
        this.tops = tops
      },
      changeList(index){
        const y = this.tops[index]
        this.scrollY = y
        this.scrollRight.scrollTo(0,-y,300)
      },
      toshow(food){
        this.food = food
        this.$refs.foods.toChangeIsShow()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
