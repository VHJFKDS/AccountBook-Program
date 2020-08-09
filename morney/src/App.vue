<template>
  <div id="app">
    <router-view/>  <!--路径传送 -->
    
    
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body{
  -webkit-font-smoothing: antialiased;    //这两行作用于苹果
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  font-family: $font-hei;
  }



</style>
