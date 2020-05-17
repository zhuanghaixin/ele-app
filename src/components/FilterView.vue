<template>
    <div :class="{'open':isSort || isFilter }" @click.self="hideView">
        <!--        导航-->
        <div v-if="filterData" class="filter-wrap">
            <aside
                    class="filter"
            >
                <div
                        class="filter-nav"
                        v-for="(item,index) in filterData.navTab"
                        :key="index"
                        :class="{'filter-bold':currentFilter==index}"
                        @click="filterSort(index)"

                >
                    <span>{{item.name}}</span>
                    <i v-if="item.icon" :class="'fa fa-'+item.icon"></i>
                </div>
            </aside>
        </div>
        <!--        排序-->
        <section class="filter-extend" v-if="isSort">
            <ul>
                <li
                        v-for="(item,index) in filterData.sortBy"
                        :key="index"
                        @click="selectSort(item,index)"
                >
                    <span :class="{'selectName':currentSort==index}">{{item.name}}</span>
                    <i class="fa fa-check" v-show="currentSort===index"></i>
                </li>
            </ul>
        </section>
        <!--        筛选-->
        <section class="filter-extend" v-if="isFilter">
            <div class="filter-sort">
                <div class="morefilter"
                     v-for="(screen,index) in filterData.screenBy"
                     :key="index"

                >
                    <p>{{screen.title}}</p>
                    <ul>
                        <li
                                v-for="(item,i) in screen.data"
                                :key="i"
                                :class="{'selected':item.select}"
                                @click="selectScreen(item,screen)"
                        >
                            <img v-if="item.icon"
                                 :src="item.icon" alt="">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>

                </div>
            </div>
            <div class="morefilter-btn">
                <span
                        class="morefilter-clear"
                        :class="{'edit':edit}"
                        @click="clearFilter"
                >清空</span>
                <span
                        class="morefilter-ok"
                        @click="filterOk"
                >确定</span>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "FilterView",
        props: {
            filterData: {
                type: Object
            }
        },
        data() {
            return {
                currentFilter: 0, // 更改下标
                isSort: false,  //显示蒙版， 综合排序
                currentSort: 0,           //当前排序方式2
                isFilter: false,    //显示蒙版，筛选
            }
        },
        computed:{
            //当选中配送方式 清空按钮高亮
           edit(){
               let edit=false
               this.filterData.screenBy.forEach(screen=>{
                   screen.data.forEach(item=>{
                       if(item.select){
                           edit=true
                       }
                   })
               })
               return edit
           }
        },
        methods: {
            filterSort(index) {
                this.currentFilter = index
                switch (index) {
                    case 0:
                        this.isSort = true;
                        //向Home.vue触发事件
                        this.$emit("searchFixed", this.isSort)
                        break;
                    case 1:
                        this.$emit('updateData', {condition: this.filterData.navTab[1].condition})
                        this.hideView()
                        break;

                    case 2:
                        this.$emit('updateData', {condition: this.filterData.navTab[2].condition})
                        this.hideView()
                        break;
                    case 3:
                        this.isFilter = true
                        //向Home.vue触发事件
                        this.$emit("searchFixed", this.isFilter)
                        break;

                    default:
                        this.hideView()
                        break;
                }
            },
            // 隐藏蒙版
            hideView() {
                this.isSort = false
                this.isFilter = false
                this.$emit("searchFixed", this.isSort)
                this.$emit("searchFixed", this.isFilter)
            },

            // 选择排序方式
            selectSort(item, index) {
                this.currentSort = index;
                this.filterData.navTab[0].name = this.filterData.sortBy[index].name
                //点击完隐藏
                this.hideView()

                //更新数据
                this.$emit('updateData', {condition: item.code})

            },

            //筛选配送方式
            selectScreen(item,screen){
                if(screen.id!=='MPI'){
                    //单选 让单选里面的所有元素都是未选状态
                    screen.data.forEach(ele=>{
                        ele.select=false
                    })
                }
                item.select=!item.select
            },
            //清空选中的配送方式
            clearFilter(){
                this.filterData.screenBy.forEach(screen=>{
                    screen.data.forEach(item=>{
                        item.select=false
                    })
                })
            },
            //点击确定按钮  更新数据
            filterOk(){
                let screenData={
                    MPI:"",
                    offer:"",
                    per:""
                }
                let mpiStr="";
                this.filterData.screenBy.forEach(screen=>{
                    screen.data.forEach((item,index)=>{
                        if(item.select){
                            //两种清空  1.多选 2，单选
                            if(screen.id!=='MPI'){
                                //单选
                                screenData[screen.id]=item.code
                            }else{
                                console.log('item.code')
                                console.log(item.code)
                                //多选 fengniao,pinpai
                                mpiStr+=item.code+","
                                screenData[screen.id]=mpiStr
                            }
                        }
                    })
                })
                console.log(mpiStr)
                this.$emit('updateData', {condition: screenData})
                this.hideView()
            }

        }

    }
</script>

<style scoped>
    .filter-wrap {
        background: #fff;
        position: sticky;
        top: 54px;
        z-index: 10;
    }

    .filter {
        position: relative;
        border-bottom: 1px solid #ddd;
        line-height: 10.4vw;
        z-index: 101;
        height: 10.666667vw;
        display: flex;
        justify-content: space-around;
    }

    .filter-nav {
        flex: 1;
        text-align: center;
        color: #666;
        font-size: 0.8333rem;
    }

    .filter-nav i {
        width: 1.6vw;
        height: 0.8vw;
        margin-left: 1.333333vw;
        margin-bottom: 0.533333vw;
        fill: #333;
        will-change: transform;
    }

    /*字体加粗*/

    .filter-bold {
        font-weight: 600;
        color: #333;
    }

    /*显示蒙版*/
    .open {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease-in-out;
        z-index: 3;
    }

    /*显示排序列表*/
    .filter-extend {
        background-color: #fff;
        color: #333;
        padding-top: 2.133333vw;
        position: absolute;
        width: 100%;
        z-index: 4;
        left: 0;
        top: 24.533333vw;
    }

    .filter-extend li {
        position: relative;
        padding-left: 5.333333vw;
        line-height: 10.666667vw;
        overflow: hidden;
    }

    .fa-check {
        float: right;
        color: #009eef;
        margin-right: 3.733333vw;
        line-height: 10.666667vw;
    }

    /*当前的排序方式 显示为蓝色*/
    .selectName {
        color: #009eef;
    }

    /* 筛选 */
    .filter-sort {
        background: #fff;
        padding: 0 2.666667vw;
        line-height: normal;
    }

    .morefilter {
        margin: 2.666667vw 0;
        overflow: hidden;
    }

    .morefilter .title {
        margin-bottom: 2vw;
        color: #666;
        font-size: 0.5rem;
    }

    .morefilter ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: 0.8rem;
    }

    .morefilter li {
        box-sizing: border-box;
        width: 30%;
        height: 9.333333vw;
        line-height: 9.333333vw;
        margin: 0.8vw 1%;
        background: #fafafa;
    }

    .morefilter li img {
        width: 3.466667vw;
        height: 3.466667vw;
        vertical-align: middle;
        margin-right: 0.8vw;
    }

    .morefilter li span {
        margin-left: 2%;
        vertical-align: middle;
    }

    /*筛选按钮*/
    .morefilter-btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fafafa;
        box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
        line-height: 11.466667vw;
        box-sizing: border-box;
    }

    .morefilter-btn span {
        font-size: 0.826667rem;
        text-align: center;
        text-decoration: none;
        flex: 1;
    }

    .morefilter-clear {
        color: #ddd;
        background: #fff;
    }

    .morefilter-ok {
        color: #fff;
        background: #00d762;
        border: 0.133333vw solid #00d762;
    }

    /*选中状态 */
    .selected {
        color: #3190e8 !important;
        background-color: #edf5ff !important;
    }

    /*当选中之后，清空按钮颜色加深*/
    .edit {
        color: #333 !important;
    }


</style>
