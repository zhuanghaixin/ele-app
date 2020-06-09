<template>
    <div class="settlement">去结算
        <Header :isLeft="true" title="确认订单"></Header>
    </div>
</template>

<script>
    import Header from '../../components/Header'
    export default {
        name: "Settlement",
        components:{
            Header
        }
    }
</script>

<style scoped>
    .settlement {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 44px;
    }

    .view-body {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        font-size: 0.9rem;
        color: #333;
        padding-bottom: 14.133333vw;
        padding-left: 1.6vw;
        padding-right: 1.6vw;
        background-image: linear-gradient(
                0deg,
                #f5f5f5,
                #f5f5f5 65%,
                hsla(0, 0%, 96%, 0.3) 75%,
                hsla(0, 0%, 96%, 0)
        ),
        linear-gradient(270deg, #009eef, #009eef);
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .cart-address {
        background-color: transparent;
        padding: 4.266667vw 2.133333vw 2.933333vw 2.133333vw;
        min-height: 22.133333vw;
        color: #fff;
        overflow: hidden;
    }
    .cart-address .title {
        font-size: 0.9rem;
        line-height: 1.21;
        color: hsla(0, 0%, 100%, 0.8);
    }
    .cart-address .address-detail {
        font-size: 1.3rem;
        font-weight: 600;
        line-height: 1.88;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .address-detail > span {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: calc(100% - 4vw);
    }
    .address-detail > i {
        margin-left: 2.133333vw;
    }

    /* 显示送货地址 */
    .address-name {
        font-size: 0.86rem;
        line-height: 1.21;
        margin-bottom: 1.333333vw;
    }
    .address-name .phone {
        margin-left: 2.133333vw;
    }
    .address-tag {
        border: 0.133334vw solid hsla(0, 0%, 100%, 0.8);
        margin-left: 1.6vw;
        display: inline-block;
        padding: 0.533333vw;
        white-space: nowrap;
        border-radius: 0.133333vw;
        font-size: 0.6rem !important;
        line-height: 2.666667vw;
    }

    .checkout-section {
        margin-bottom: 2.133333vw;
        padding: 0 5.333333vw;
        background: #fff;
        box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
    }

    /* 底部支付样式 */
    .action-bar {
        height: 11.733333vw;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #3c3c3c;
        z-index: 2;
    }
    .action-bar > span {
        color: #fff;
        font-size: 1.2rem;
        line-height: 11.733333vw;
        padding-left: 2.666667vw;
        vertical-align: middle;
    }
    .action-bar > button {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background: #00e067;
        min-width: 28vw;
        padding: 0 1.333333vw;
        border: none;
        color: #fff;
        font-size: 1.2rem;
    }

</style>
