<template>
    <div>
        <!-- 当dataType为3时显示导师样式 -->
        <div v-if="dataType===3">
            <div class="main_item_star" v-for="(item,index) in list" :key="index" @click="gotearcher(item.teacher_id)">
                <div>
                    <img :src="item.teacher_avatar" style="border-radius:.5rem;" width="40px" height="40px">
                </div>
                <div class="item_main_right">
                    <div>{{item.teacher_name}}</div>
                    <div style="font-size:14px;color:#666;">{{item.introduction}}</div>
                </div>
            </div>
        </div>
        <!-- 当dataType为1时显示课程样式 -->
        <div v-if="dataType===1">
            <div class="main_item_jing" v-for="(item,index) in list" :key="index" @click="goto(item.id)">
                <div class="item_jing_left">
                    <img :src="item.cover_img" style="border-radius:10px;" width="100%" height="100%">
                </div>
                <div class="item_jing_right">
                    <div>{{item.title}}</div>
                    <div style="display:flex;justify-content:space-between;">
                        <span style="font-size:14px;color:#999;">{{item.sales_num}}人已报名</span><span
                            :class="item.price>0?'jing_right_sps':'jing_right_sp'">{{item.price | price}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 当dataType为6时显示热门资讯 -->
        <div v-if="dataType===6">
            <div class="main_item_jing" v-for="(item,index) in list" :key="index" @click="gohot(item.id)">
                <div class="item_jing_left">
                    <img :src="item.thumb_img" style="border-radius:10px;" width="100%" height="100%">
                </div>
                <div class="item_jing_right">
                    <div>{{item.title}}</div>
                    <div class="jing_right_hot">{{item.description}}</div>
                    <div style="display:flex;justify-content:space-between;">
                        <span style="font-size:14px;color:#999;"><i class="iconfont icon-yanjing"></i>
                            {{item.click_rate}}</span>
                        <span style="font-size:14px;color:#999;"><i class="iconfont icon-biao"></i>
                            {{item.created_at | time}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array,
            },
            dataType: {
                type: Number
            }
        },
        methods: {
            goto(id){
                this.$emit('goto',id)
            },
            gotearcher(id){
                this.$emit('gotearcher',id)
            },
            gohot(id){
                this.$emit('gohot',id)
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
            time(ms){
                let date = new Date(ms*1000)
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate();
                let hour = date.getHours();
                let min = date.getMinutes()
                let str = `${year}/${month}/${day} ${hour<10?'0'+hour:hour}:${min<10?'0'+min:min}`;
                return str
            }
        }
    }
</script>

<style scoped lang='scss'>
    .main_item_star {
        width: 100%;
        height: .81rem;
        border-radius: .1rem;
        margin-bottom: .1rem;
        background-color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding: 0rem .1rem;

        .item_main_right {
            height: .5rem;
            box-sizing: border-box;
            padding-left: .1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
    }

    .main_item_jing {
        width: 100%;
        height: 1rem;
        background-color: #fff;
        border-radius: .1rem;
        margin-bottom: .1rem;
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
</style>