<template>
    <div>
        <van-search v-model="value" show-action shape="round" placeholder="请输入内容" @search="onSearch" @input="ongoing">
            <template #action>
                <div @click="onCancel">
                    {{val}}
                </div>
            </template>
        </van-search>
        <div v-if="!show" class="history">
            <p class="history_top">
                <span>历史搜索</span>
                <span>
                    <van-icon name="delete" color="#bbb" @click="dels" /></span>
            </p>
            <div class="history_main">
                <div class="history_item" v-for="(item,index) in historys" :key="index" @click.prevent="gosearch(item)">
                    {{item}}
                    <div class="item_item" @click="del(index)">
                        X
                    </div>
                </div>
            </div>
        </div>
        <div v-if="show" class="search">
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
        </div>
    </div>
</template>

<script>
    import {
        getCourse
    } from '../../netwoke/api/api';
    import listItem from '../../components/ListItem'
    export default {
        components: {
            listItem
        },
        data() {
            return {
                value: '',
                val: '取消',
                list: [],
                show: false,
                historys: [],
            }
        },
        mounted() {
            if (localStorage.historys) {
                this.historys = JSON.parse(localStorage.historys)
            }
        },
        methods: {
            onSearch(val) {
                // this.value = val;
                // this.$toast(val);
                let data = {
                    limit: 10,
                    page: 1,
                    course_type: 0,
                    keywords: val
                }
                getCourse(data).then(res => {
                    let red = res.data.data.list;
                    console.log(red);
                    this.list = red;
                })
                if (this.historys.includes(val)) {
                    return
                } else {
                    this.historys.unshift(val);
                    localStorage.historys = JSON.stringify(this.historys)
                }
            },
            ongoing(val) {
                // console.log(val);
                // if (val.length > 0) {
                //     this.show = true;
                //     this.val = '搜索';
                // } else {
                //     this.show = false;
                //     this.val = '取消';
                // }
            },
            onCancel() {
                // console.log(this.val);
                if (this.val == '取消') {
                    this.$router.go(-1);
                } else if (this.val == '搜索') {
                    this.onSearch();
                }
            },
            gosearch(val){
                this.value = val;
                this.onSearch(val);
            },
            dels() {
                this.$dialog.confirm({
                        title: '提示',
                        message: '确认删除历史记录吗？',
                    })
                    .then(() => {
                        this.historys = [];
                        localStorage.historys = JSON.stringify(this.historys);
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            del(i) {
                this.$dialog.confirm({
                        title: '提示',
                        message: '确认删除历史记录吗？',
                    })
                    .then(() => {
                        this.historys.splice(i,1);
                        localStorage.historys = JSON.stringify(this.historys);
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
        },
        watch: {
            value(nval){
                if (nval.length > 0) {
                    this.show = true;
                    this.val = '搜索';
                } else {
                    this.show = false;
                    this.val = '取消';
                    this.list = [];
                }
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
    .history {
        width: 100%;
        height: 92vh;
        border-top: .01rem solid #ddd;
        box-sizing: border-box;
        padding: .15rem .2rem;

        .history_top {
            width: 100%;
            height: .4rem;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
        }

        .history_main {
            width: 100%;
            margin-top: .2rem;
            display: inline-flex;
            flex-wrap: wrap;

            .history_item {
                padding: .08rem .16rem;
                font-size: .12rem;
                border-radius: .5rem;
                background-color: #F6F6F6;
                position: relative;
                margin-right: .1rem;
                margin-top: .1rem;

                .item_item {
                    width: .15rem;
                    height: .15rem;
                    color: #eee;
                    font-size: .12rem;
                    border-radius: .2rem;
                    background-color: #B6B6B6;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: -.02rem;
                    right: -.02rem;
                }
            }
        }
    }

    .search {
        width: 100%;
        height: 92vh;
        border-top: .01rem solid #ddd;
        box-sizing: border-box;
        padding: 0rem .2rem;

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
</style>