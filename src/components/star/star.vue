<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item" v-for="(sc,index) in starClasses" :key="index"
    :class="sc"></span>

  </div>
</template>

<script>
  export default {
    name: 'star',
    props:{
      size:Number,//星星的大小
      score:Number //评分
    },
    data(){
      return {

      }
    },
    computed:{
      //储存星星型号的数组
      starClasses(){
        let arr = []
        const {score,size} = this
        //有N个'on'，
        let num = Math.floor(score)
        for (var i = 0; i < num; i++) {
          arr.push('on')
        }
        //有1个或0个‘half’
        if((score*10-Math.floor(score)*10)>=5){
          arr.push('half')
        }
        //有N个 'off'
        while(arr.length<5){
          arr.push('off')
        }
        return arr
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
