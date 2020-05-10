<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default{
    name:'app',
    created(){
      this.getLocation()
    },
    methods:{
      getLocation(){
        AMap.plugin('AMap.Geolocation', function() {
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            // buttonOffset: new AMap.Pixel(10, 20),
            // //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            // zoomToAccuracy: true,
            // //  定位按钮的排放位置,  RB表示右下
            // buttonPosition: 'RB'
          })

          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)

          function onComplete (data) {
            // data是具体的定位信息
            //精准定位
            console.log(data)
          }

          function onError (data) {
            // 定位出错
            console.log(data)
          }
        })
      }

    }
  }
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  font-size:14px;
  background:#f1f1f1;
}

</style>
