<template>
<div class="home">
<!--    头部-->
   <div class="header">
       <div class="address-map" @click="$router.push({name:'Address',params:{city:city}})">
           <i class="fa fa-map-marker"></i>
           <span>{{address}}</span>
           <i class="fa fa-sort-desc"></i>
       </div>

   </div>
<!--    搜索框-->
    <div
            class="search-wrap"
            :class="{'fixedview':showFilter}"
           >
        <div class="shop-search">
            <i class="fa fa-search"></i>
            搜索商家 商家名称
        </div>
    </div>
    <div id="container">
<!--        轮播-->
        <mt-swipe :auto="4000" class="swiper">
            <mt-swipe-item v-for="(img,index) in swipeImgs" :key="index">
                <img :src="img" alt="">
            </mt-swipe-item>
        </mt-swipe>
<!--        分类-->
        <mt-swipe :auto="0" class="entries">
            <mt-swipe-item v-for="(entry,i) in entries" :key="i" class="entry-wrap">
                <div class="foodentry" v-for="(item,index) in entry" :key="index">
                    <div class="img-wrap">
                        <img :src="item.image" alt="">
                    </div>
                    <span>{{item.name}}</span>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
<!--    推荐商家-->
    <div class="shoplist-title">推荐商家</div>
<!--    导航-->
<FilterView
        :filterData="filterData"
        @searchFixed="showFilterView"
></FilterView>

</div>
</template>
<script>
    import {Swipe,SwipeItem} from 'mint-ui'
    import FilterView from '../components/FilterView.vue'
    export default {
        name: "Home",
        components:{
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            FilterView
        },
        data(){
            return{
                swipeImgs:[],
                entries:[],
                filterData:null,
                showFilter:false
            }
        },
        computed:{
            address(){
                return this.$store.getters.address
            },
            city(){
                return this.$store.getters.location.addressComponent.city ||
                        this.$store.getters.location.addressComponent.province
            }

        },
        created(){
            this.getData()
        },
        methods:{
            //获取数据
            getData(){

                this.$axios("/api/profile/shopping").then(res=>{
                    console.log(res.data)
                    this.swipeImgs=res.data.swipeImgs
                    this.entries=res.data.entries
                    console.log(this.entries)
                })
                this.$axios('/api/profile/filter').then(res=>{
                    console.log(res.data)
                    this.filterData=res.data


                })
            },
            //让搜索框置顶
            showFilterView(isShow){
                console.log('isShow')
                console.log(isShow)
                this.showFilter=isShow
            }
        }
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
    }
    /*头部*/
    .header,.search-wrap{
        background-color: #009eef;
        padding: 10px 16px;
    }
    .header .address-map {
        color: #fff;
        font-weight: bold;
    }
    .address-map i {
        margin: 0 3px;
        font-size: 18px;
    }
    .address-map span {
        display: inline-block;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    /*搜索框*/
    .search-wrap .shop-search {
        /*margin-top: 10px;*/
        background-color: #fff;
        padding: 10px 0;
        border-radius: 4px;
        text-align: center;
        color: #aaa;
    }
    .search-wrap {
        position: sticky;
        top: 0px;
        z-index: 999;
        box-sizing: border-box;
    }

    .swiper{
        height: 100px;
    }
    .swiper img{
        width: 100%;
        height: 100%;
    }

/*    手动轮播*/

    .entries {
        background: #fff;
        height: 47.2vw;
        text-align: center;
        overflow: hidden;
    }
    .foodentry {
        width: 20%;
        float: left;
        position: relative;
        margin-top: 2.933333vw;
    }
    .foodentry .img-wrap {
        position: relative;
        display: inline-block;
        width: 12vw;
        height: 12vw;
    }
    .img-wrap img {
        width: 100%;
        height: 100%;
    }
    .foodentry span {
        display: block;
        color: #666;
        font-size: 0.32rem;
    }
    /* 推荐商家 */
    .shoplist-title {
        display: flex;
        justify-content: center;
        height: 9.6vw;
        line-height: 9.6vw;
        font-size: 16px;
        color: #333;
        background: #fff;
    }
    .shoplist-title:after,
    .shoplist-title:before {
        display: block;
        content: "一";
        width: 5.333333vw;
        height: 0.266667vw;
        color: #999;
    }
    .shoplist-title:before {
        margin-right: 3.466667vw;
    }
    .shoplist-title:after {
        margin-left: 3.466667vw;
    }


    /*当点击综合排序的时候，搜索框黏贴置顶*/
    .fixedview {
        width: 100%;
        position: fixed;
        top: 0px;
        z-index: 999;
    }

    .mint-loadmore {
        height: calc(100% - 95px);
        overflow: auto;
    }
</style>

