<template>
    <div class="addAddress">
        <Header :isLeft="true" :title="title"></Header>
<!--        添加地址-->
        <div class="viewbody">
            <div class ="content">
                <FormBlock
                        label="联系人"
                        placeholder="姓名"
                        :tags="sexs"
                        @checkSex="checkSex"
                        :sex="addressInfo.sex"
                        v-model="addressInfo.name"
                ></FormBlock>
                <FormBlock label="电话" placeholder="手机号码"  v-model="addressInfo.phone"></FormBlock>
                <FormBlock
                        @click="showSearch=true"
                        label="地址"
                        v-model="addressInfo.address"
                        placeholder="小区/写字楼/学校等"
                        icon="angle-right"></FormBlock>
                <FormBlock label="门牌号" placeholder="3号楼六单元303" icon="edit" textarea="textarea"  v-model="addressInfo.bottom"></FormBlock>
                <div class="formblock">
                    <div class="label-wrap">标签</div>
                    <TabTag
                            :tags="tags" @checkTag="checkTag":selectTag="addressInfo.tag"  ></TabTag>
                </div>
            </div>
            <!--        确定按钮-->
            <div class="form-button-wrap">
                <button class="form-button" @click="handleSave">
                    确定
                </button>
            </div>
        </div>

<!--        搜索地址-->
        <AddressSearch
                @close="showSearch=false"
                :showSearch="showSearch"
                :addressInfo="addressInfo"
        ></AddressSearch>
    </div>
</template>

<script>
    import Header from '../../components/Header'
    import FormBlock from '../../components/Orders/FormBlock'
    import TabTag from '../../components/Orders/TabTag'
    import AddressSearch from '../../components/Orders/AddressSearch'
    export default {
        name: "AddAddress",
        components:{
            Header,
            FormBlock,
            TabTag,
            AddressSearch
        },
        data(){
            return{
                title:'添加地址',
                tags:["家","学校","公司"],
                sexs:["先生","女士"],
                addressInfo:{
                    tag:"",
                    sex:"",
                    address:'',
                    name:"",
                    phone:"",
                    bottom:""
                },
                showSearch:false,

            }
        },
        methods:{
            addAddress(){
                this.$router.push("/addAddress")
            },
            //选择标签
            checkTag(item){
                console.log(item)
                this.addressInfo.tag=item
            },
            checkSex(item){
                console.log(item)
                this.addressInfo.sex=item
            },
            handleSave(){
                console.log(this.addressInfo)
            }
        }


    }
</script>

<style scoped>
    .addAddress {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 45px;
    }
    .viewbody {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        background-color: #f5f5f5;
    }

    .content {
        padding-left: 4vw;
        background: #fff;
        font-size: 0.94rem;
    }

    .formblock {
        background-color: #fff;
        border-bottom: 1px solid #eee;
        display: flex;
    }
    .formblock .label-wrap {
        flex-basis: 17.333333vw;
        padding: 3.733333vw 0;
        line-height: 4.8vw;
        color: #333;
        font-weight: 700;
    }

    /* 确定按钮 */
    .form-button-wrap {
        padding: 5.333333vw 4vw;
        display: flex;
    }
    .form-button-wrap .form-button {
        background: #00d762;
        text-align: center;
        border-radius: 0.533333vw;
        flex: 1;
        font-size: 1.1rem;
        line-height: 5.066667vw;
        color: #fff;
        padding: 3.333333vw 0;
        border: none;
        font-weight: 500;
    }


</style>
