<template>
    <div>
        <div class="setpwd_top">
            设置密码
        </div>
        <div class="setpwd_main">
            <p class="post">
                <input type="password" v-model="pwd" placeholder="请设置登录密码">
            </p>
            <p class="post">
                <input type="password" v-model="pwds" placeholder="请再次输入密码">
            </p>
        </div>
        <div class="setpwd_btm">
            <button class="btn" @click="add">确定</button>
        </div>
    </div>
</template>

<script>
import {setPassword} from '../../../netwoke/api/api'
    export default {
        data(){
            return {
                pwd:'',
                pwds:'',
                item:{}
            }
        },
        mounted(){
            if(sessionStorage.all){
                this.item = JSON.parse(sessionStorage.all)
            }
        },
        methods: {
            add(){
                if(this.pwd === this.pwds){
                    let data = {
                        password:this.pwd,
                        ...this.item
                    }
                    setPassword(data).then(res=>{
                        if(res.data.code == 200){
                            this.$router.push('/user')
                        }
                    })
                }
            }
        },
    }
</script>

<style scoped lang='scss'>
    .setpwd_top {
        width: 100%;
        height: .85rem;
        color: #666;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

    .setpwd_main {
        width: 100%;
        box-sizing: border-box;
        padding: 0rem .2rem;

        .post {
            width: 100%;
            height: .5rem;
            border-bottom: .01rem solid #eee;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;

            input {
                border: none;
            }

            input::-webkit-input-placeholder {
                color: #bbb;
            }
        }
    }

    .setpwd_btm {
        width: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-top: .5rem;

        .btn {
            width: 78%;
            height: .5rem;
            border: none;
            border-radius: .03rem;
            font-size: .15rem;
            color: #fff;
            background: linear-gradient(to right, #E46570, #E50212);
        }
    }
</style>