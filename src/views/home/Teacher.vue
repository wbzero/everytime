<template>
    <div class="teacher_wrap">
        <div class="teacher_top">
            <div class="teacher_top_left">
                <img :src="num.avatar" width="100%" height="100%" style="border-radius:1rem;">
            </div>
            <div class="teacher_top_right">
                {{num.real_name}}
            </div>
        </div>
        <div class="teacher_main">
            <van-tabs v-model="active" @change="add" border line-height="4px" line-width="25px">
                <van-tab name="0">
                    <template #title>
                        <div style="font-size:.15rem;">
                            讲师介绍
                        </div>
                    </template>
                    <div>
                        <p style="font-size:.12rem;color:#ccc;margin:.15rem 0rem;">老师简介</p>
                        <p style="font-size:.14rem;">{{num.introduction}}</p>
                    </div>
                </van-tab>
                <van-tab name="1">
                    <template #title>
                        <div style="font-size:.15rem;">
                            主讲课程
                        </div>
                    </template>
                    <div>
                        <div class="main_item" v-for="(item,index) in list" :key="index" @click="goto(item.id)">
                            <div class="item_left">
                                <img :src="item.cover_img" style="border-radius:10px;" width="100%" height="100%">
                            </div>
                            <div class="item_right">
                                <div style="font-size:.14rem;">{{item.title}}</div>
                                <div style="display:flex;justify-content:space-between;">
                                    <span style="font-size:14px;color:#999;">{{item.sales_num}}人已报名</span><span
                                        :class="item.price>0?'right_sps':'right_sp'">{{item.price | price}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import {
        getTeacher,
        getTeacherCourse
    } from '../../netwoke/api/api.js'
    export default {
        data() {
            return {
                num: {},
                active: 0,
                id: 0,
                list: [],
            }
        },
        async mounted() {
            let id = this.$route.query.id;
            this.id = id;
            let res = await getTeacher(id)
            // console.log(res.data.data.teacher);
            this.num = res.data.data.teacher
        },
        methods: {
            add(name) {
                if (name == 1) {
                    getTeacherCourse({
                        limit: 10,
                        page: 1,
                        teacher_id: this.id
                    }).then(res => {
                        // console.log(res.data.data.list);
                        this.list = res.data.data.list
                    })
                }
            }
        },
        filters: {
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
    .teacher_wrap {
        width: 100%;
        height: 100vh;

        .teacher_top {
            width: 100%;
            height: 1.32rem;
            display: inline-flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0rem .3rem;

            .teacher_top_left {
                width: .82rem;
                height: .82rem;
            }

            .teacher_top_right {
                flex: 1;
                height: .82rem;
                box-sizing: border-box;
                padding: .05rem .1rem;
            }
        }

        .teacher_main {
            width: 100%;
            box-sizing: border-box;
            padding: 0rem .12rem;
        }

        .main_item {
            width: 100%;
            height: .8rem;
            background-color: #fff;
            border-radius: .1rem;
            margin-bottom: .1rem;
            box-sizing: border-box;
            padding: 0rem .1rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: .2rem 0rem;

            .item_left {
                width: 35%;
                height: .7rem;
            }

            .item_right {
                width: 65%;
                height: .7rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;
                padding-left: .1rem;

                .right_sp {
                    color: #0daf0d;
                }

                .right_sps {
                    color: red;
                }

                .right_hot {
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