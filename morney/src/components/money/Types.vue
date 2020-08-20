<template>
   <div>
  <ul class="types">
    <li :class="{[classPrefix+'-item']:classPrefix,selected:value === '-'}" @click="selectType('-')">支出</li>
    <li :class="{[classPrefix+'-item']:classPrefix,selected:value === '+'}" @click="selectType('+')">收入</li>
  </ul>
  </div>

</template>

<script lang="ts">
 import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  props:{
    propMessage:String
  }
})
export default class Types extends Vue{
  @Prop() readonly value!:string;
  @Prop() classPrefix?:string  //再增加一个class
  

 selectType(type:string){         //type只能是+或-中的一个
      if(type !== '-' && type !== '+'){  
        throw new Error('type is unknown')  
      }
      this.$emit('update:value',type) //当你更新value，就把你的值赋给type
    }
}
</script>

<style lang="scss" scoped>
.types{
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  li{
    width: 50%;
    line-height: 64px;
    height: 64px;
    position: relative;
    &.selected::after{   
       content: "";
       position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>