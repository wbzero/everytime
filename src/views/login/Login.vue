<template>
    <div>
        <div class="login_img">
            <img src="http://120.53.31.103:84/uploads/image/2020-05-27/sDSSCsWo1oSMRqHp7QqUSDzTeqn2f76nDH4SgAk1.jpeg"
                alt="">
        </div>
        <div class="login_box">
            <p class="post">
                <span><input type="text" v-model="tel" placeholder="请输入手机号"></span>
            </p>
            <p class="post">
                <input type="password" v-model="code" placeholder="请输入密码">
            </p>
            <p class="post" style="border:none;">
                <span style="font-size:.12rem;color:#aaa" @click="getback">找回密码</span>
                <span style="font-size:.12rem;color:#999" @click="goto">注册/验证码登录</span>
            </p>
            <div style="margin-top:.4rem;">
                <p>
                    <button class="btn" @click="gologin">登录</button>
                </p>
                <p class="post" style="border:none;font-size:.12rem;justify-content:flex-start;">
                    <van-checkbox v-model="checked" checked-color="#E50212" icon-size="15px" />
                    我同意<span class="sp" @click="userdeal">用户注册协议</span>和<span class="sp"
                        @click="guarddeal">隐私保护协议</span>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        postSmsCode,
        postLogin
    } from '../../netwoke/api/api'
    export default {
        data() {
            return {
                tel: '',
                code: '',
                checked: true,
            }
        },
        methods: {
            gologin() {
                if (this.code.trim() != '') {
                    let data = {
                        client: 1,
                        type: 1,
                        mobile: this.tel,
                        password: this.code
                    };
                    postLogin(data).then(res => {
                        console.log(res);
                        let red = res.data
                        if (red.code === 200) {
                            localStorage.token = red.data.remember_token;
                            this.$router.push({
                                path: '/user'
                            })
                        } else {
                            this.$toast('手机号码格式不正确或密码错误');
                        }
                    })
                } else {
                    if (this.tel.trim() == '') {
                        this.$toast('手机号不能为空');
                    } else {
                        this.$toast('验证码错误');
                    }
                }
            },
            goto() {
                this.$router.go(-1)
            },
            getback() {
                this.$router.push('/getback')
            },
            userdeal() {
                this.$router.push('/userdeal')
            },
            guarddeal() {
                this.$router.push('/guarddeal')
            }

        },
    }
</script>

<style scoped lang='scss'>
    .login_img {
        width: 100%;

        img {
            width: 100%;
        }
    }

    .login_box {
        width: 100%;
        box-sizing: border-box;
        padding: 0rem .4rem;
        margin-top: .6rem;

        .post {
            width: 100%;
            height: .5rem;
            border-bottom: .01rem solid #eee;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
        }

        .post:hover {
            border-bottom: .01rem solid #E50212;
        }

        input {
            border: none;
        }

        input::-webkit-input-placeholder {
            color: #bbb;
        }

        .btn {
            width: 95%;
            height: .5rem;
            margin-left: .07rem;
            border: none;
            border-radius: .03rem;
            font-size: .15rem;
            color: #fff;
            background: linear-gradient(to right, #E46570, #E50212);
        }

        .sp {
            color: #E50212;
            font-size: .12rem;
        }
    }
</style>