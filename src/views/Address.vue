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
                search_val: ""
            }
        },
        computed:{
            address(){
                return this.$store.getters.location.formattedAddress
            }
        }
        ,
        beforeRouteEnter(to,from,next){
            console.log('to Address')
            console.log(to)
            next(vm=>{
                vm.city=to.params.city
            })
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
