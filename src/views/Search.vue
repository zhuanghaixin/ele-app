<template>
    <div class="search">
        <Header :isLeft="true" title="搜索"></Header>
        <div class="search-header">
            <form class="search-wrap">
                <i class="fa fa-search"></i>
                <input type="text" v-model="key_word" placeholder="输入商家，商品信息">
                <button>搜索</button>
            </form>
        </div>


        <div class="shop" v-if="result">
            <div>
                <SearchIndex :data="result.restaurants"></SearchIndex>
                <SearchIndex :data="result.words"></SearchIndex>
            </div>
        </div>

    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import SearchIndex from '../components/SearchIndex.vue'

    export default {
        name: "Search",
        data() {
            return {
                key_word: "",
                result:null
            }
        },
        watch: {
            key_word() {
                this.keyWordChange()
            }
        },
        components: {
            Header,
            SearchIndex
        },
        methods: {

            keyWordChange() {
                console.log(this.key_word)
                this.$axios(`/api/profile/typeahead/${this.key_word}`).then(res => {
                    console.log(res.data)
                    this.result = res.data
                }).catch(err => {

                    this.result = null
                    console.log('this.result')
                    console.log(err)
                    console.log(this.result)
                })
            }
        }
    }
</script>

<style scoped>
    .search {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
    }

    .search-header {
        margin-top: 45px;
        background: #fff;
        padding: 0 4.266667vw;
    }

    .search-header .search-wrap {
        padding: 2.933333vw 2.933333vw 2.933333vw 0;
        display: flex;
        align-items: center;
        position: relative;
    }

    .search-wrap .fa-search {
        width: 2.933333vw;
        height: 2.933333vw;
        color: #888;
        position: absolute;
        top: 4.6666666vw;
        left: 2.933333vw;
    }

    .search-wrap input {
        flex-grow: 1;
        border-radius: 0.266667vw;
        background-color: #f8f8f8;
        padding: 1.733333vw 4vw 1.733333vw 8.8vw;
        color: #666;
        outline: none;
        border: none;
    }

    .search-wrap button {
        outline: none;
        border: none;
        color: #333;
        font-size: 0.426667rem;
        background: #fff;
        font-weight: 700;
        margin-left: 2.933333vw;
        font-size: 14px;
    }

    .shop {
        width: 100%;
        height: calc(100% - 95px);
        overflow: auto;
    }

    .empty-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #fff;
        display: flex;
        justify-content: center;
    }

    .empty-wrap img {
        width: 35vw;
        height: 35vw;
    }

    .empty-txt h4 {
        color: #666;
        font-size: 1rem;
        margin: 12vw 0 2vw 0;
    }

    .empty-txt span {
        color: #999;
        font-size: 0.8rem;
    }
</style>
