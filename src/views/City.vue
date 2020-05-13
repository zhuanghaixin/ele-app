<template>
    <div class="city">
        <div class="search-wrap">
            <div class="search"><i class="fa fa-search"></i>
                <input type="text" placeholder="输入城市名" v-model="city_val">
            </div>

            <button @click="$router.go(-1)">取消</button>
        </div>
        <div>
            <div class="location">
                <Location :address="city"></Location>
            </div>
            <Alphabet :cityInfo="cityInfo" :keys="keys"></Alphabet>
        </div>
    </div>
</template>

<script>
    import Location from '../components/Location.vue'
    import Alphabet from '../components/Alphabet.vue'

    export default {
        name: "City",
        components: {
            Location,
            Alphabet
        },
        data() {
            return {
                city_val: '',
                cityInfo:{},//存城市的信息
                keys:[]  //存到城市列表的字母
            }
        },
        computed:{
            city(){
                return this.$store.getters.location.addressComponent.city ||
                    this.$store.getters.location.addressComponent.province
            }
        },
        created(){
            this.getCityInfo()
        },
        methods:{
           getCityInfo(){
               this.$axios("/api/posts/cities").then((res)=>{
                   console.log(res.data)
                   this.cityInfo=res.data
                   //处理key，计算key
                   console.log('typeof this.cityInfo')
                   console.log(typeof this.cityInfo)
                   this.keys=Object.keys(res.data)
                   console.log(this.keys)
                   //hotCities这个key移除掉
                   this.keys.pop()
                   //keys排序
                   this.keys.sort()
                   console.log(this.keys)
               }).catch((err)=>{
                   console.log(err)
               })
           }
        }
    }
</script>

<style scoped>
    .city {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding-top: 45px;
    }

    .search-wrap {
        position: fixed;
        top: 0;
        height: 45px;
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding: 3px 16px;
        display: flex;
        justify-content: space-between;
    }

    .search {
        background-color: #eee;
        border-radius: 10px;
        line-height: 40px;
        width: 85%;
        box-sizing: border-box;
        padding: 0 16px;
    }

    .search input {
        background: #eee;
        outline: none;
        border: none;
        margin-left: 5px;
    }

    .search-wrap button {
        outline: none;
        color: #009eef;
        margin: 0;
        padding: 0;
        border: 1px solid transparent; /*自定义边框*/
    }

    .location {
        background: #fff;
        padding: 8px 16px;
        height: 65px;
        box-sizing: border-box;
    }

    .search-list {
        background: #fff;
        padding: 5px 16px;
    }
    .search-list li {
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
</style>
