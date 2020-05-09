<template>
    <div class="text-group">
<!--        组件结构-->
<!--        组件容器-->
        <div class="input-group">
            <input :type="type" :value="value" :placeholder="placeholder" :name="name" @input="$emit('input',$emit.target.value)">
            <!--        输入框后面的按钮-->
            <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
            <!--        错误提醒-->

        </div>
        <div v-if="error" class="invalid-feedback">{{error}}</div>

    </div>
</template>

<script>
    export default {
        name: "inputGroup",
        props:{
            type:{
                type:String,
                default:"text"
            },
            value:String,
            placeholder:String,
            name:String,
            btnTitle:String,
            disabled:Boolean,
            error:String
        }
    }
</script>

<style scoped>
    .input-group {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .input-group input {
        height: 100%;
        width: 60%;
        outline: none;
    }
    .input-group button {
        border: none;
        outline: none;
        background: #fff;
    }
    .input-group button[disabled] {
        color: #aaa;
    }
    .is-invalid {
        border: 1px solid red;
    }
    .invalid-feedback {
        color: red;
        padding-top: 5px;
    }
</style>
