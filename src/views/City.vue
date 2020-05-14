<template>
    <div class="city">
        <div class="search-wrap">
            <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="输入城市名" v-model="city_val">
            </div>
            <button @click="$router.push({name:'Address',params:{city:city}})">取消</button>
        </div>
        <div style="height:100%" v-if="searchList.length==0">
            <div class="location">
                <Location :address="city" @click="selectCity({name:city})"></Location>
            </div>
            <Alphabet
                    @selectCity="selectCity"
                    :cityInfo="cityInfo"
                    :keys="keys"
                    ref="allcity"
            ></Alphabet>
        </div>
        <div class="search-list" v-else>
            <ul>
                <li v-for="(item,index) in searchList" :key="index" @click="selectCity(item)">
                    {{item.name}}
                </li>
            </ul>
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
                cityInfo: {},//存城市的信息
                keys: [],  //存到城市列表的字母
                allCities:[],  //鞍山,安庆
                searchList:[]  //上海 上绕
            }
        },
        computed: {
            city() {
                return this.$store.getters.location.addressComponent.city ||
                    this.$store.getters.location.addressComponent.province
            }
        },
        created() {
            this.getCityInfo()
        },
        watch:{
            city_val(){
                console.log(this.city_val)
                this.searchCity()
            }
        },
        methods: {
            getCityInfo() {
                this.$axios("/api/posts/cities").then((res) => {
                    console.log(res.data)
                    this.cityInfo = res.data
                    //处理key，计算key
                    console.log('typeof this.cityInfo')
                    console.log(typeof this.cityInfo)
                    this.keys = Object.keys(res.data)
                    console.log(this.keys)
                    //hotCities这个key移除掉
                    this.keys.pop()
                    //keys排序
                    this.keys.sort()
                    console.log(this.keys)
                    //获取到Alphabet中到DOM对象
                    // this.$nextTick(()=>{
                    //     this.$refs.allcity.initScroll()
                    // })
                    //存储所有城市，用来搜索过滤
                    this.keys.forEach(key=>{
                        console.log(key)
                        //遍历cityInfo
                        this.cityInfo[key].forEach(city=>{
                            console.log(city)  //安庆，鞍山，澳门... ｜北京，包头...
                            //将所有城市存到 allCities
                            this.allCities.push(city)
                        })
                    })
                    console.log('this.allCities')
                    console.log(this.allCities)
                }).catch((err) => {
                    console.log(err)
                })
            },

            //选择城市
            selectCity(city){
                console.log(city)
                this.$router.push({name:'Address',params:{city:city.name}})
            },
            //搜索城市
            searchCity(){
                if(!this.city_val){
                    //如果搜索框为空，数组置为空
                    this.searchList=[]
                }else{
                    //根据输入框的关键字检索城市，并存入到searchList数组中
                    this.searchList=this.allCities.filter((item)=>{
                        return item.name.indexOf(this.city_val)!=-1
                    })
                }
                console.log('this.searchList')
                console.log(this.searchList)
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
        background:#fff;
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
