<template>
    <div class="address">
        <Header title="选择收获地址" :isLeft="true"></Header>
        <div class="city-search">
            <div class="search">
                <span class="city">
                    {{city}}
                    <i class="fa fa-angle-down"></i>
                   <div class="fa fa-search">
                       <input type="text" v-model="search_val" placeholder="小区/写字楼/学习等">
                   </div>

                </span>
            </div>
            <Location :address="address"></Location>
        </div>
        <div class="area">
            <ul class="area-list" v-for="(item,index) in areaList" :key="index">
                <li>
                    <h4>{{item.name}}</h4>
                    <p>{{item.district}}{{item.address}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import Location from '../components/Location.vue'

    export default {
        name: "Address",
        components: {
            Header,
            Location
        },
        data() {
            return {
                city: "深圳市", //当前城市
                search_val: "",
                areaList:'' //搜索的地区列表
            }
        },
        computed:{
            address(){
                return this.$store.getters.location.formattedAddress
            }
        },
        watch:{
            search_val(){
                this.searchPlace()
            }
        },
        beforeRouteEnter(to,from,next){
            console.log('to Address')
            console.log(to)
            next(vm=>{
                vm.city=to.params.city
            })
        },
        methods:{
            searchPlace(){
                console.log(this.search_val)
                const self=this

                AMap.plugin('AMap.Autocomplete', function(){
                    // 实例化Autocomplete
                    var autoOptions = {
                        //city 限定城市，默认全国
                        city:self.city
                    }
                    var autoComplete= new AMap.Autocomplete(autoOptions);
                    autoComplete.search(self.search_val, function(status, result) {
                        // 搜索成功时，result即是对应的匹配数据
                        console.log(result)
                        self.areaList=result.tips
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .address {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding-top: 45px;
    }

    .city-search {
        background-color: #fff;
        padding: 10px 20px;
        color: #333;
    }

    .search {
        background-color: #eee;
        height: 40px;
        border-radius: 10px;
        box-sizing: border-box;
        line-height: 40px;
    }

    .search .city {
        padding: 0 10px;
    }

    .city i {
        margin-right: 10px;
    }

    .search input {
        margin-left: 5px;
        background-color: #eee;
        outline: none;
        border: none;
    }

    .area {
        margin-top: 16px;
        background: #fff;
    }

    .area li {
        border-bottom: 1px solid #eee;
        padding: 8px 16px;
        color: #aaa;
    }

    .area li h4 {
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
    }
</style>
