<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {mapActions} from 'vuex'
  export default {
    name: "app",
    mounted(){
      this.$store.dispatch('getAddress')
      this.getInfo()
    },
    methods:{
      ...mapActions(['getInfo'])
    }
    ,
    components:{
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width  100%
    height 100%
    background #f5f5f5
    position relative
</style>
