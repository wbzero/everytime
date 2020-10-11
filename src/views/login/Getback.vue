<template>
    <div>
        <div class="login_box">
            <p class="post">
                <span><input type="text" v-model="tel" placeholder="请输入手机号"></span>
                <span @click="getcode" ref="timetxt" style="font-size:.12rem;color:red;">{{timetext}}</span>
            </p>
            <p class="post">
                <input type="text" v-model="code" placeholder="请输入短信验证码">
            </p>
            <p class="post">
                <input type="password" v-model="pwd" placeholder="请输入密码">
            </p>
            <div style="margin-top:.4rem;">
                <p>
                    <button class="btn" @click="gologin">登录</button>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        postSmsCode,
        postLogin,
        setPassword
    } from '../../netwoke/api/api'
    export default {
        data() {
            return {
                tel: '',
                code: '',
                pwd:'',
                checked: true,
                timetext: '获取验证码',
                times: 60
            }
        },
        methods: {
            time() {
                this.timetext = this.times + 's后重新获取';
                this.$refs.timetxt.style.color = '#999';
                let times = setInterval(() => {
                    this.times--;
                    this.timetext = this.times + 's后重新获取';
                    if (this.times <= 0) {
                        this.timetext = '获取验证码';
                        window.clearInterval(times);
                        this.$refs.timetxt.style.color = 'red';
                    }
                }, 1000);
            },
            getcode() {
                if (this.tel.trim() != '') {
                    let reg = /^1[3|5|7|8|9]\d{9}$/;
                    if (reg.test(this.tel)) {
                        let data = {
                            mobile: this.tel,
                            sms_type: 'login'
                        };
                        this.time()
                        postSmsCode(data).then(res => {
                            console.log(res);
                        })
                    } else {
                        this.$toast('手机号码格式不正确');
                    }
                } else {
                    this.$toast('手机号不能为空');
                }
            },
            gologin() {
                if (this.code.trim() != '') {
                    let data = {
                        mobile: this.tel,
                        sms_code: this.code,
                        password:this.pwd
                    };
                    setPassword(data).then(res => {
                        console.log(res);
                        let red = res.data
                        if (red.code === 200) {
                            localStorage.token = red.data.remember_token;
                            if (red.data.is_new == 1) {
                                let all = {
                                    mobile: this.tel,
                                    sms_code: this.code
                                }
                                sessionStorage.all = JSON.stringify(all)
                                this.$router.push({
                                    path: '/setpwd',
                                    // params:{
                                    //     mobile: this.tel,
                                    //     sms_code: this.code
                                    // }
                                })
                            } else {
                                this.$router.push({
                                    path: '/user'
                                })
                            }
                        } else {
                            this.$toast('手机号码格式不正确或验证码错误');
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
                this.$router.push('/login')
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
        padding: 0rem .2rem;

        .post {
            width: 100%;
            height: .55rem;
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