<template>
  <div class="index">
    主页
  </div>
</template>
<script>
  export default{
    name:'index',
    data(){
      return{
        name:'zhx'
      }
    },
    beforeRouteLeave(to,from,next){
      if(confirm('你确定离开吗')==true){
        next()
  }else{
        next(false)
      }
    }
  }
</script>
<style>
  #app {

  }

</style>
