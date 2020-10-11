<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar v-model="num" @change="add" active-color="red" router v-if="$route.meta.show==true">
      <van-tabbar-item to="/" name="/">
        <template #icon>
          <van-icon name="wap-home" :color="num=='/'?'#436AFD':'#ACB0C0'" />
        </template>
        <span class="sp">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/courses" name="/courses">
        <template #icon>
          <van-icon name="todo-list" :color="num=='/courses'?'#436AFD':'#ACB0C0'" />
        </template>
        <span class="sp">课程</span>
      </van-tabbar-item>
      <van-tabbar-item to="/message"  name="/message">
        <template #icon>
          <van-icon name="column" :color="num=='/message'?'#436AFD':'#ACB0C0'" />
        </template>
        <span class="sp">资讯</span>
      </van-tabbar-item>
      <van-tabbar-item to="/books"  name="/books">
        <template #icon>
          <van-icon name="printer" :color="num=='/books'?'#436AFD':'#ACB0C0'" />
        </template>
        <span class="sp">图书</span>
      </van-tabbar-item>
      <van-tabbar-item to="/user"  name="/user">
        <template #icon>
          <van-icon name="manager" :color="num=='/user'?'#436AFD':'#ACB0C0'" />
        </template>
        <span class="sp">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num:document.location.pathname
      };
    },
    methods: {
      add(name){
        this.num = name;
      }
    },
  }
</script>

<style lang="scss">
.sp{
  font-size: .14rem;
}
</style>