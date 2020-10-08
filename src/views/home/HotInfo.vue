<template>
    <div>
        <div>
            <img :src="item.thumb_img" width="100%">
        </div>
        <p class="h1">{{item.title}}</p>
        <div class="hotinfo_title">
            <p style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:.14rem;">{{item.click_rate}}次预览</span>
                <span style="font-size:.14rem;">{{item.created_at | time}}</span>
            </p>
            <p class="title_main">{{item.description}}</p>
        </div>
        <div class="hotinfo_main" v-html="item.content"></div>
    </div>
</template>

<script>
    import {
        postHot
    } from '../../netwoke/api/api'
    export default {
        data() {
            return {
                item: {}
            }
        },
        async mounted() {
            let id = this.$route.query.id;
            let res = await postHot({
                information_id: id
            })
            console.log(res.data.data);
            this.item = res.data.data
        },
        filters: {
            time(ms) {
                let date = new Date(ms * 1000)
                let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                let str = `${month}-${day}`;
                return str
            }
        },
    }
</script>

<style scoped lang='scss'>
    .h1 {
        width: 100%;
        font-size: .25rem;
        box-sizing: border-box;
        padding: .1rem .2rem;
    }

    .hotinfo_title {
        width: 100%;
        box-sizing: border-box;
        padding: .2rem;
        color: #999;

        .title_main {
            width: 100%;
            box-sizing: border-box;
            padding: .2rem;

        }
    }

    .hotinfo_main {
        width: 100%;
        box-sizing: border-box;
        padding: .2rem;

    }
</style>