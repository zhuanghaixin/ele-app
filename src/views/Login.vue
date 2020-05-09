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
        >
        </InputGroup>
<!--        验证码-->
        <InputGroup
                type="number"
                v-model="phone"
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
