<template>
  <div class="home_wrap">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :show-indicators="false">
      <van-swipe-item v-for="(item,index) in banner" :key="index">
        <img :src="item.banner_img" style="width: 100%; height: 100%" />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图结束 -->
    <div class="home_main">

      <div v-for="(item,index) in list" :key="index">
        <p class="main_item_top">{{item.channel_info.name}} <span>更多></span></p>
        <ListItem :list="item.list" :dataType="item.channel_info.type" @goto="goto" @gotearcher="gotearcher" @gohot="gohot" />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getAppIndex,
    getAppBanners
  } from '../../netwoke/api/api'
  import ListItem from '../../components/ListItem'
  export default {
    components: {
      ListItem
    },
    data() {
      return {
        list: [],
        banner: []
      }
    },
    async mounted() {
      let res = await getAppIndex()
      console.log(res.data.data);
      this.list = res.data.data
      let banner = await getAppBanners()
      // console.log(banner.data.data);
      if (banner.data.code == 200) {
        this.banner = banner.data.data
      }
    },
    methods: {
      goto(id){
        this.$router.push({
          path:'/course',
          query:{
            id
          }
        })
      },
      gotearcher(id){
        this.$router.push({
          path:'/teacher',
          query:{
            id
          }
        })
      },
      gohot(id){
        this.$router.push({
          path:'/hotinfo',
          query:{
            id
          }
        })
      }
    },
  }
</script>

<style scoped lang='scss'>
  .home_wrap {
    width: 100%;
    background-color: #F6F7F9;
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: .2rem;
    height: 2.8rem;
    text-align: center;
  }

  .home_main {
    width: 100%;
    box-sizing: border-box;
    padding: 0rem .15rem;

    .main_item_top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: .03rem solid red;
      box-sizing: border-box;
      padding-left: .1rem;
      margin: .15rem 0rem;
    }

  }
</style>