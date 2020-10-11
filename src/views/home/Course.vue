<template>
    <div class="classify_wrap">
        <div class="classify_wrap_main">
            <div class="classify_top">
                <img :src="info.cover_img" height="100%">
            </div>
            <div class="classify_main">
                <div class="classify_main_sum">
                    <p>{{info.title}}</p>
                    <p class="p1">
                        <span class="p1">共{{info.total_periods}}课时</span> |
                        <span class="p1">{{info.sales_num}}人已报名 </span>
                    </p>
                    <p class="p1">
                        开课时间：{{info.start_play_date | time}} -
                        {{info.end_play_date | time}}
                    </p>
                    <p style="color:red">{{info.sale_type | sale}}</p>
                </div>
                <div class="classify_main_team">
                    <p style="font-size: .15rem;">教学团队</p>
                    <div class="main_team_staff">
                        <div style="width:.4rem;text-align:center;" v-for="(item,index) in teachers" :key="index">
                            <p style="width:.4rem;height:.4rem;margin-bottom:.05rem;">
                                <img :src="item.teacher_avatar" width="100%" height="100%"
                                    style="border-radius:.3rem;">
                            </p>
                            <span style="font-size:.12rem;">{{item.teacher_name}}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <van-tabs v-model="active" scrollspy sticky title-active-color="red" :line-height="0">
                        <van-tab title="课程介绍">
                            <div class="main_course_sug">
                                <p style="margin-bottom:.1rem;">课程介绍</p>
                                <div class="course__sug_main" v-html="info.course_details">
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="课程大纲">
                            <div class="main_course_outline">
                                <p style="margin-bottom:.1rem;">课程大纲</p>
                                <div v-for="(item,index) in outline" :key="index" class="course_outline_main">
                                    <p>
                                        <span class="sp" style="font-size:.15rem;font-weight:900;color:red;">·</span>
                                        <span class="sp">
                                            <van-tag type="warning">回放</van-tag>
                                        </span>
                                        <span class="sp">{{item.periods_title}}</span>
                                    </p>
                                    <p style="box-sizing:border-box;padding-left:.25rem;">
                                        <span class="sp">{{item.teachers[0].teacher_name}}</span>
                                        <span class="sp">{{item.start_play}} - {{item.end_play}}</span>
                                    </p>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="课程评价">
                            <div class="main_course_assess">
                                <p style="margin-bottom:.1rem;">课程评价</p>
                                <div class="course_assess_main">
                                    <div v-for="(item,index) in assess" :key="index" style="width:100%;height:.8rem;margin:.05rem 0rem;">
                                        <div style="width:100%;display:flex;justify-content:space-between;align-items:center;">
                                            <p style="width:60%;display:flex;align-items:center;">
                                                <span style="margin-right:.1rem;"><img :src="item.avatar" style="width:.25rem;height:.25rem;border-radius:.5rem;"></span>
                                                <span style="margin-right:.1rem;font-size:.14rem;">{{item.nickname}}</span>
                                                <span>
                                                    <van-rate v-model="item.grade" :size="14" color="#ffd21e"
                                                        void-icon="star" void-color="#eee" /></span>
                                            </p>
                                            <p style="font-size:.14rem;">{{item.created_at | time}}</p>
                                        </div>
                                        <p style="box-sizing:border-box;padding-left:.3rem;margin-top:.1rem;font-size:.14rem;">{{item.content}}</p>
                                    </div>
                                    <van-empty description="描述文字" v-if="assess.length==0" />
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </div>
        <div class="classify_footer">
            <van-button type="danger" round><span style="font-size: .13rem;">立即报名</span></van-button>
        </div>
    </div>
</template>

<script>
    import {
        getClassify,
        postCourseOutline,
        postCourseAssess
    } from '../../netwoke/api/api.js'
    export default {
        data() {
            return {
                info: {},
                active: 0,
                outline: [],
                assess:[],
                teachers:[]
            }
        },
        filters: {
            sale(type) {
                let str = '';
                if (type == 1) {
                    str = '1.00'
                } else if (type == 0) {
                    str = '免费'
                }
                return str
            },
            time(ms) {
                let date = new Date(ms * 1000)
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hour = date.getHours();
                let min = date.getMinutes()
                let str = `${year}/${month}/${day} ${hour<10?'0'+hour:hour}:${min<10?'0'+min:min}`;
                return str
            }
        },
        async mounted() {
            let id = this.$route.query.id;
            let res = await getClassify(id)
            // console.log(res.data.data);
            this.info = res.data.data.info;
            this.teachers = res.data.data.teachers
            let ret = await postCourseOutline({
                id: id
            })
            // console.log(ret.data.data);
            this.outline = ret.data.data
            let red = await postCourseAssess({
                id
            })
            // console.log(red.data.data.list);
            this.assess = red.data.data.list
        }
    }
</script>

<style scoped lang='scss'>
    .classify_wrap {
        width: 100%;
        height: 100vh;
        background-color: #EFF1F4;
        display: inline-flex;
        flex-direction: column;

        .classify_wrap_main {
            width: 100%;
            flex: 1;
            overflow: scroll;

            .classify_top {
                width: 100%;
                height: 2.2rem;
                flex: 1;
            }

            .classify_main {
                width: 100%;
                flex: 2;

                .classify_main_sum {
                    width: 100%;
                    height: 1.43rem;
                    background-color: #fff;
                    box-sizing: border-box;
                    padding: .2rem .15rem;

                    .p1 {
                        width: 100%;
                        margin: .09rem 0rem;
                        font-size: .15rem;
                        color: #999;
                    }
                }

                .classify_main_team {
                    width: 100%;
                    margin-top: .1rem;
                    margin-bottom: .1rem;
                    background-color: #fff;
                    box-sizing: border-box;
                    padding: .12rem .1rem;

                    .main_team_staff {
                        width: 100%;
                        height: 1rem;
                        display: inline-flex;
                        justify-content: flex-start;
                        align-items: center;
                        box-sizing: border-box;
                        padding-left: .2rem;
                    }
                }

                .main_course_sug {
                    width: 100%;
                    background-color: #fff;
                    border-top: .01rem solid #eee;
                    box-sizing: border-box;
                    padding: .1rem .1rem;

                    .course__sug_main {
                        width: 100%;
                        font-size: .12rem;
                    }
                }

                .main_course_outline {
                    width: 100%;
                    margin-top: .1rem;
                    background-color: #fff;
                    box-sizing: border-box;
                    padding: .1rem .1rem;

                    .course_outline_main {
                        width: 100%;
                        box-sizing: border-box;
                        padding-left: .1rem;
                        margin-bottom: .1rem;

                        .sp {
                            margin: 0rem .07rem;
                            font-size: .14rem;
                        }
                    }
                }

                .main_course_assess {
                    width: 100%;
                    margin-top: .1rem;
                    background-color: #fff;
                    box-sizing: border-box;
                    padding: .1rem .1rem;

                    .course_assess_main {
                        width: 100%;
                        box-sizing: border-box;
                        padding: 0rem .1rem;
                    }
                }
            }
        }

        .classify_footer {
            width: 100%;
            flex: 0 0 .5rem;
            background-color: #fff;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 0rem .15rem;

            .van-button {
                width: 100%;
                height: .38rem;
            }
        }
    }
</style>