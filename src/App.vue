<template>
  <div id="app">
    <router-view/>  <!--路径传送 -->
    <div class="code-wrapper" v-show="isCodeVisible">
      <Icon name="close" class="close" @click="closeTip"/>
      <img class="code" src="./assets/qrcode.png" alt="qrcode">
      <p class="tip">建议使用手机打开本页面，以保证浏览效果</p>
    </div>
    
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import isPC from '@/lib/isPC'
import {Component} from 'vue-property-decorator'

@Component
export default class App extends Vue{
  isCodeVisible = false
  mounted(){   
    this.isCodeVisible = isPC() ? true :false
  }
  closeTip(){
    this.isCodeVisible = false
  }
  
}
</script>

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
 #app{
    max-width: 500px;
    margin: 0 auto;
  }
 

</style>
<style lang="scss" scoped>
.code-wrapper{
  position: fixed;
  background-color: rgba(255,255,255,0.8);
  border-radius: 20px;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  .tip{
    text-align: center;
    margin-bottom: 20px;
  }
  .code{
    width: 230px;
    height: 230px;
    margin: 35px 50px 20px 50px;
  }
  .close{
    position: fixed;
    right: 5%;
    top: 5%;
    cursor: pointer;
  }
}
</style>