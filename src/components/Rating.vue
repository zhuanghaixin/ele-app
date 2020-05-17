<template>
    <div class="Rating-gray">
      <i
              v-for="(item,index) in itemClass"
              :key="index"
              class="fa"
              :class="item"

      ></i>
    </div>
</template>

<script>
    //定义星星的长度
    const LENGTH=5;
    //星星对应的class
    const  CLS_ON='fa-star'
    //半星对应的class
    const  CLS_HALF='fa-star-half-empty'
    //无星对应的class
    const  CLS_OFF='fa-star-o'
    export default {
        name: "Rating",
        props:{
            rating:{
                type:Number
            }
        },
        computed:{
            itemClass(){
                //4.8 4个全星 1个半星
                let result=[]
                //对分数进行处理，向下取0.5的倍数  4.8*2=9.6 向下取整 9 9/2=4.5
                let score=Math.floor(this.rating*2)/2
                //控制半星
                let hasDecimal=score%1!=0
                //控制全星
                let integer=Math.floor(score)

                //全星放入数组中
                for(let i=0;i<integer;i++){
                    result.push(CLS_ON)
                }
                //半星
                if(hasDecimal){
                    result.push(CLS_HALF)
                }
                //补齐
                while(result.length<LENGTH){
                    result.push(CLS_OFF)  //length++

                }
                // console.log('result')
                // console.log(result)
                return result


            }
        }
    }
</script>

<style scoped>
.Rating-gray{
    margin-right: 1.066667vw;
    color:#ffbe00;
    display:inline-block
}
</style>
