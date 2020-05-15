<template>
    <div class="alphabet" ref="area_scroll">
        <div class="scroll-wrap">
<!--            热门城市-->
            <div class="hot-wrap citylist">
                <div class="title">热门城市</div>
                <ul class="hot-city ">
                    <!-- 注册事件selectKey,同时将item传过去-->
                    <li

                            @click="$emit('selectCity',item)"
                            v-for="(item,index) in cityInfo.hotCities"
                            :key="index">
                        {{item.name}}
                    </li>
                </ul>
            </div>
<!--            所有城市-->
            <div class="city-wrap">
<!--                    循环按字母排序的key-->
                <div class="city-content citylist" v-for="(item,index) in keys" :keys="index">
                    <div class="title">{{item}}</div>
<!--                    根据字母展示对应的城市名-->
                    <ul>
                        <!-- 注册事件selectKey,同时将city传过去-->
                        <li
                                @click="$emit('selectCity',city)"
                                v-for="(city,index) in cityInfo[item]"
                        >{{city.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="area-keys">
            <ul>
                <li @click="selectKey(0)">#</li>
                <li
                        @click="selectKey(index+1)"
                        v-for="(item,index) in keys "
                        :keys=index>{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Alphabet",
        props:{
            cityInfo:{
                type:Object,
                default:{},

            },
            keys:{
                type:Array,
                default:[]
            }
        },
        dataO(){
            return {
                scroll:null
            }
        },
        methods:{
            initScroll(){

                this.$nextTick(() => {
                    this.scroll=new BScroll(this.$refs.area_scroll,{
                        click:true,

                    })
                })
            },
            selectKey(index){
                console.log(index)
                console.log(this.$refs.area_scroll.getElementsByClassName('citylist'))
                const citylist=this.$refs.area_scroll.getElementsByClassName('citylist')
                // 根据下标,滚动到相对应的元素上

                let el = citylist[index]
                // console.log('el')
                // console.log(el)

                this.scroll.scrollToElement(el,250)
            }
        },
        mounted(){
            this.initScroll()
        }

    }
</script>

<style scoped>
    .alphabet {
        margin-top: 10px;
        box-sizing: border-box;
        padding: 0 16px;
        background: #fff;
        height: calc(100% - 65px);
        overflow: hidden;
    }
    .scroll-wrap {
        background: #fff;
        overflow: auto;
    }
    .title {
        color: #aaa;
        padding: 15px 0;
    }
    .hot-city {
        padding: 0 16px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .hot-city li {
        width: 30%;
        background: #f1f1f1;
        margin: 0 10px 10px 0;
        text-align: center;
        padding: 10px;
        box-sizing: border-box;
    }
    .city-content li {
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    .area-keys {
        position: fixed;
        right: 0;
        top: 25%;
        color: #aaa;
        font-size: 12px;
        line-height: 1.4;
        text-align: center;
        padding: 0 5px;
    }
    .area-keys li{
        margin:5px 0;
    }
</style>
