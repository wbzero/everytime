<template>
  <div class="course_wrap">
    <div class="course_top">
      <div class="course_search" @click="gosearch">
        <van-icon name="search" color="#aaa" />
        <span style="font-size:.12rem;color:#aaa;margin-left:.08rem">搜索课程</span>
      </div>
      <van-dropdown-menu>
        <van-dropdown-item title="分类" ref="class">
          <div style="width:100%;height:.7rem;display:flex;justify-content:space-around;align-items:center;">
            <div class="item_btn" @click="reset">重置</div>
            <div class="item_btn" style="color:#fff;background:#E50212;" @click="affirm">确认</div>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="排序" ref="item">
          <div class="item_item" :class="{active:val==index}" v-for="(item,index) in sort" :key="index"
            @click="sorts(index)">
            {{item}}
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" ref="sizer">
          <div class="item_shai">
            <span class="item_shai_span" v-for="(item,index) in sizer" :key="index" :class="{colors:sel==index}"
              @click="sizers(index)">{{item}}</span>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="course_main">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="main_item_jing" v-for="(item,index) in list" :key="index" @click="goto(item.id)">
            <div class="item_jing_left">
              <img :src="item.cover_img" style="border-radius:10px;" width="100%" height="100%">
            </div>
            <div class="item_jing_right">
              <div>{{item.title}}</div>
              <div style="display:flex;justify-content:space-between;">
                <span style="font-size:14px;color:#999;">{{item.sales_num | title}}人已报名</span><span
                  :class="item.price>0?'jing_right_sps':'jing_right_sp'">{{item.price | price}}</span>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
  import {
    getCourse
  } from '../../netwoke/api/api'
  export default {
    data() {
      return {
        val: 0,
        sel: 0,
        page: 1,
        sort: ['综合排序', '最新', '最热', '价格从低到高', '价格从高到低'],
        sizer: ['全部', '大班课', '公开课', '面授课'],
        loading: false,
        finished: false,
        refreshing: false,
        list: [],
        shows: false
      };
    },
    async mounted() {
      let data = {
        limit: 10,
        page: 1
      }
      let res = await getCourse(data)
      console.log(res);
      this.list = res.data.data.list;
    },
    methods: {
      sorts(i) {
        this.val = i;
        this.$refs.item.toggle();
        let data = {
          limit: 10,
          page: 1,
          course_type: 0,
          order_by: i,
          is_vip: 0
        }
        getCourse(data).then(res => {
          let red = res.data.data.list;
          this.list = red;
        })
      },
      sizers(i) {
        this.sel = i;
        this.$refs.sizer.toggle();
        let data = {};
        if (i == 0) {
          data = {
            limit: 10,
            page: 1,
            course_type: 0,
            order_by: 0,
            is_vip: 0
          }
        } else if (i == 1) {
          data = {
            limit: 10,
            page: 1,
            course_type: 2,
            order_by: 0,
            is_vip: 0
          }
        } else if (i == 2) {
          data = {
            limit: 10,
            page: 1,
            course_type: 4,
            order_by: 0,
            is_vip: 0
          }
        } else if (i == 3) {
          data = {
            limit: 10,
            page: 1,
            course_type: 7,
            order_by: 0,
            is_vip: 0
          }
        }
        getCourse(data).then(res => {
          let red = res.data.data.list;
          this.list = red;
        })
      },
      reset() {
        this.$refs.class.toggle();
        this.list = [];
        let data = {
          limit: 10,
          page: 1
        }
        getCourse(data).then(res => {
          let red = res.data.data.list;
          this.list = red
        })
      },
      affirm() {
        this.$refs.class.toggle();
      },
      gosearch() {
        this.$router.push('/coursearch')
      },
      onLoad() {
        setTimeout(() => {
          if (this.refreshing) { //下拉刷新
            this.list = [];
            let data = {
              limit: 10,
              page: 1
            }
            getCourse(data).then(res => {
              let red = res.data.data.list;
              this.list = red
            })
            this.refreshing = false;
          }
          // 上拉加载更多
          this.page++
          let data = {
            limit: 10,
            page: this.page
          }
          getCourse(data).then(res => {
            let red = res.data.data.list;
            if (red.length > 0) {
              this.list = [...this.list, ...red]
            } else {
              this.finished = true;
            }
          })
          this.loading = false;
        }, 2000);
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },
      goto(id) {
        this.$router.push({
          path: '/course',
          query: {
            id
          }
        })
      }
    },
    filters: {
      title(val) {
        let str = '';
        if (val >= 10000) {
          str = '1万+'
        } else {
          str = val
        }
        return str
      },
      price(num) {
        let str = '';
        if (num > 0) {
          str = '1'
        } else {
          str = '免费'
        }
        return str
      },
    }
  }
</script>

<style scoped lang='scss'>
  .course_wrap {
    width: 100%;
    height: 92.5vh;
    background-color: #F6F7F9;

    .course_top {
      width: 100%;
      height: 15vh;
      background: #fff;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .course_search {
        width: 90%;
        height: .35rem;
        border: .01rem solid #ddd;
        border-radius: .5rem;
        margin: .05rem auto;
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }

      .van-dropdown-menu {
        width: 100%;

        .item_btn {
          width: 43%;
          height: .3rem;
          font-size: .13rem;
          color: #555;
          border-radius: .05rem;
          border: .01rem solid #ddd;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .item_item {
          width: 100%;
          height: .55rem;
          font-size: .14rem;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-top: .01rem solid #eee;
        }

        .item_shai {
          width: 100%;
          height: .8rem;
          display: inline-flex;
          justify-content: space-around;
          align-items: center;

          .item_shai_span {
            width: .7rem;
            height: .35rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #F4F4F4;
            font-size: .14rem;
            border-radius: .05rem;
          }
        }
      }
    }

    .course_main {
      width: 100%;
      height: 77.5vh;
      box-sizing: border-box;
      padding: 0rem .15rem;
      overflow: scroll;

      .main_item_jing {
        width: 100%;
        height: 1rem;
        background-color: #fff;
        border-radius: .1rem;
        margin-top: .1rem;
        box-sizing: border-box;
        padding: 0rem .1rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .item_jing_left {
          width: 40%;
          height: .8rem;
        }

        .item_jing_right {
          width: 60%;
          height: .8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          padding-left: .1rem;

          .jing_right_sp {
            color: #0daf0d;
          }

          .jing_right_sps {
            color: red;
          }

          .jing_right_hot {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: .14rem;
            color: #999;
          }
        }
      }
    }
  }

  .active {
    color: red;
  }

  .colors {
    color: red;
    background-color: #EAEDFD;
  }
</style>