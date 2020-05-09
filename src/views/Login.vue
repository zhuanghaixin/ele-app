<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/logo.jpg" alt="my login image">
        </div>
<!--        手机号-->
        <InputGroup
                type="number"
                v-model="phone"
                placeholder="手机号"
                :btnTitle="btnTitle"
                :disabled="disabled"
                :error="errors.phone"
                @btnClick="getVerifyCode"
        >
        </InputGroup>
<!--        验证码-->
        <InputGroup
                type="number"
                v-model="verifyCode"
                placeholder="验证码"
                :error="errors.code"
        >
        </InputGroup>
        <!-- 用户服务协议 -->
        <div class="login-des">
            <p>
                新用户登录即自动注册，表示已同意
                <span>《用户服务协议》</span>
            </p>
        </div>
        <!-- 登录按钮 -->
        <div class="login-btn">
            <button>登录</button>
        </div>
    </div>

</template>

<script>
    import InputGroup from "../components/InputGroup.vue"
    export default {
        name: "Login",
        data(){
            return {
                phone: "",
                verifyCode: "",
                errors: {},
                btnTitle: "获取验证码",
                disabled: false
            };
        },
        components:{
            InputGroup
        },
        methods:{
            //获取验证码
            getVerifyCode(){
                //判断当前手机号是否合法

                if(this.validatePhone()){
                    //发送网路请求

                    this.validateBtn()

                }
            },
            // 验证手机号是否合法
            validatePhone(){
                if(!this.phone){
                    console.log(11233)
                    console.log(this.phone)
                    this.errors={
                        phone:'手机号码不能为空'
                    }
                    return false;
                }else if(!/^1[345678]\d{9}$/.test(this.phone)){
                    console.log(this.phone)
                    this.errors = {
                        phone: "请填写正确的手机号码"
                    };
                    return false;
                }else{
                    this.errors = {}
                    return true
                }
            },
            //实现 验证码 倒计时

            validateBtn() {
                let time = 120;
                let timer = setInterval(() => {
                    if (time == 0) {
                        clearInterval(timer)
                        this.btnTitle = "获取验证码"
                        this.disabled = false
                    } else {
                        //倒计时
                        this.btnTitle = time + "秒后重试"
                        this.disabled = true
                        time--
                    }
                }, 1000)
            }
        }





    }
</script>

<style scoped>
    .login {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        background: #fff;
        text-align: center;

    }

    .logo {
        text-align: center;
    }
    .logo img{
        width:150px;
    }

    .text-group,
    .login-des,
    .login-btn {
        margin-top: 20px;
    }
    .login-des {
        color: #aaa;
        line-height: 22px;
    }
    .login-des span {
        color: #4d90fe;
    }
    .login-btn button {
        width: 100%;
        height: 40px;
        background-color: #48ca38;
        border-radius: 4px;
        color: white;
        font-size: 14px;
        border: none;
        outline: none;
    }
    .login-btn button[disabled] {
        background-color: #8bda81;
    }
</style>
