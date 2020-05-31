<template>
    <div class="shopcart">
        <div class="bottomNav-cartfooter" :class="{'bottomNav-carticon-empty':isEmpty}">
            <span class="bottomNav-carticon">
                <i class="fa fa-cart-plus"></i>
                <span v-if="totalCount">{{totalCount}}</span>
            </span>
            <div class="bottomNav-cartInfo">
                <p class="bottomNav-carttotal">
                    <span v-if="isEmpty">未选购商品</span>
                    <span v-else>¥{{totalPrice.toFixed(2)}}</span>
                </p>
                <p class="bottomNav-cartdelivery">
                    另需配送费{{shopInfo.rst.float_delivery_fee}}元
                </p>
            </div>
            <button class="submit-btn">
                <span v-if="isEmpty">¥{{shopInfo.rst.float_minimum_order_amount}}元起送</span>
                <span v-else>去结算</span>
            </button>
        </div>
        <!-- 小球容器        -->
        <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index">
                <transition
                        @before-enter="beforeDrop"
                        @enter="dropping"
                        @after-enter="afterDrop"

                >
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    const BALL_LEN=10 //小球长度
    const innerClsHook='inner-hook'
    function createBalls(){
        let balls = []
        for(let i=0;i<BALL_LEN;i++){
            balls.push({
                show:false   //小球每个都是隐藏的，所以show是false
            })
        }
        return balls
    }
    export default {
        name: "ShopCart",
        props:{
            shopInfo:Object
        },
        data(){
            return{
                totalCount:0,
                totalPrice:0,
                selectFoods:[],
                balls: createBalls()    //小球
            }
        },
        computed:{
            isEmpty(){
                let empty=true;
                //将水平
                this.totalCount=0
                this.totalPrice=0
                this.selectFoods=[]
                this.shopInfo.recommend.forEach(recommend=>{
                    recommend.items.forEach(item=>{
                        if(item.count){
                            empty=false
                            this.totalCount+=item.count
                            this.totalPrice+=item.activity.fixed_price*item.count
                            this.selectFoods.push(item)
                        }
                    })
                })
                this.shopInfo.menu.forEach(menu=>{
                    menu.foods.forEach(food=>{
                        if(food.count){
                            empty=false
                            this.totalCount+=food.count
                            this.totalPrice+=food.activity.fixed_price*food.count
                            this.selectFoods.push(food)
                        }
                    })
                })

                return empty
            }
        },
        created(){
            console.log(this.shopInfo)
            // 下落的小球
            this.dropBalls = []
        },
        methods:{
            //接受小球
            drop(el){
                console.log('小球el')
                console.log(el)
                for(let i=0;i<this.balls.length;i++){
                    const ball=this.balls[i]
                    if(!ball.show){
                        ball.show=true
                        ball.el=el
                        this.dropBalls.push(ball)
                        return
                    }
                }
            },
            beforeDrop(el){
                const ball=this.dropBalls[this.dropBalls.length-1]  //拿到最后一个下落的小球
                const rect=ball.el.getBoundingClientRect()
                const x=rect.left-32
                const y=-(window.innerHeight-rect.top-22)
                el.style.display=''
                el.style.transform=el.style.webkitTransform=`translate3d(0,${y}px,0)`
                const inner=el.getElementsByClassName(innerClsHook)[0]
                inner.transform=inner.style.webkitTransform=`translate3d(${x}px,0,0)`

            },
            dropping(el,done){
                //触发重绘
                this._reflow=document.body.offsetHeight
                el.style.transform=el.style.webkitTransform=`translate3d(0,0,0)`
                const inner=el.getElementsByClassName(innerClsHook)[0]
                inner.style.transform=inner.style.webkitTransform=`translate3d(0,0,0)`
                el.addEventListener('transitionend',done)
            },
            afterDrop(el){
                const ball=this.dropBalls.shift()
                if(ball){
                    ball.show=false
                    el.style.display='none'
                }
            }

        }

    }
</script>

<style scoped>
    .bottomNav-cartfooter {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        padding-left: 21.066667vw;
        background-color: rgba(9,17,26);
        height: 12.8vw;
        z-index: 1000;
    }

    .bottomNav-carticon {
        position: absolute;
        left: 3.2vw;
        bottom: 2vw;
        width: 13.333333vw;
        height: 13.333333vw;
        box-sizing: border-box;
        border-radius: 100%;
        background-color: #3190e8;
        border: 1.333333vw solid #444;
        box-shadow: 0 -0.8vw 0.533333vw 0 rgba(0, 0, 0, 0.1);
    }
    .bottomNav-carticon > i {
        position: absolute;
        top: 7px;
        right: 0;
        bottom: 0;
        left: 7px;
        color: #fff;
        font-size: 1.6rem;
    }
    .bottomNav-cartInfo {
        flex: 1;
    }
    .bottomNav-carttotal {
        font-size: 0.8rem;
        line-height: normal;
        color: #fff;
    }
    .bottomNav-cartdelivery {
        color: #999;
        font-size: 0.6rem;
    }
    .submit-btn {
        height: 100%;
        width: 28vw;
        background-color: #38ca73;
        color: #fff;
        text-align: center;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 600;
        line-height: 12.8vw;
        border: none;
        outline: none;
    }

    .bottomNav-carticon-empty > span {
        background-image: radial-gradient(circle, #363636 6.266667vw, #444 0);
    }
    .bottomNav-carticon-empty > span > i {
        color: #606065 !important;
    }
    .bottomNav-carticon-empty .bottomNav-carttotal > span {
        color: #999;
    }
    .bottomNav-carticon-empty .submit-btn {
        background-color: #535356 !important;
    }

    .bottomNav-carticon > span {
        position: absolute;
        right: -1.2vw;
        top: -1.333333vw;
        line-height: 1;
        background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
        color: #fff;
        border-radius: 3.2vw;
        padding: 0.833333vw 1.333333vw;
        font-size: 0.6rem;
    }

    .cartview-cartmask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 200;
    }
    .cartview-cartbody {
        position: fixed;
        left: 0;
        width: 100%;
        background-color: #fff;
        bottom: 12.8vw;
        z-index: 201;
        opacity: 1;
        font-size: 1rem;
    }
    .cartview-cartheader {
        display: flex;
        align-items: center;
        padding: 0 4vw;
        border-bottom: 0.133333vw solid #ddd;
        background-color: #eceff1;
        color: #666;
        height: 10.666667vw;
    }
    .cartview-cartheader > span {
        flex: 1;
        display: flex;
        align-items: center;
    }
    .cartview-cartheader > button {
        border: none;
        outline: none;
        flex: none;
        display: flex;
        align-items: center;
        padding-left: 4vw;
        color: #666;
        text-decoration: none;
        font-size: 0.8rem;
        line-height: 4vw;
        background: none;
    }
    .cartview-cartheader > button > span {
        margin-left: 0.8vw;
    }
    .entityList-cartbodyScroller {
        overflow: auto;
        max-height: 80vw;
    }
    .entityList-entityrow {
        border-bottom: 0.133333vw solid #eee;
        display: flex;
        align-items: center;
        padding: 2vw 3.333333vw 2vw 0;
        min-height: 12.666667vw;
        margin-left: 3.333333vw;
    }
    .entityList-entityrow > h4 {
        flex: 5.5;
        line-height: normal;
    }
    .entityList-entityrow > h4 > span {
        display: inline-block;
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        max-width: 46.666667vw;
    }
    .entityList-entitytotal {
        color: rgb(255, 83, 57);
        flex: 2.5;
        text-align: left;
        white-space: nowrap;
        font-weight: 700;
    }
    .entityList-entitytotal::before {
        content: "\A5";
        font-size: 0.6rem;
        color: currentColor;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.25s ease-out;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

/*    小球*/
    .ball-container{

    }
    .ball-container .ball{
        position:fixed;
        left:32px;
        bottom:22px;
        z-index:200;
        transition:all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
    }
    .ball-container .ball .inner{
        width: 16px;
        height: 16px;
        border-radius:50%;
        background-color:rgb(0,160,220);
        transition:all 0.4s linear;
    }
</style>
