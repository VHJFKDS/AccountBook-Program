<template>
   <div>
  <ul class="types">
    <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
    <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
  </ul>
  </div>

</template>

<script lang="ts">
 import Vue from "vue"
// import Types from '@/components/money/Types.vue';
import { Component, Prop } from "vue-property-decorator";

@Component({
  props:{
    propMessage:String
  }
})
export default class Types extends Vue{
 type = '-'   //'-'代表支出，'+'代表收入

 @Prop(Number)xxx:number | undefined;
// @Prop是装饰器，告诉vue这个类xxx，后面的number | undefined;属性不是data，而是装饰器
// (Number) 是告诉vue，xxx是number  （运行时）
// xxx是属性名
// number | undefined 就是告诉ts xxx的类型  （编译时类型）

 selectType(type:string){         //type只能是+或-中的一个
      if(type !== '-' && type !== '+'){  
        throw new Error('type is unknown')  
      }
      this.type = type
    }

 






  // name: 'Types',
  // props:['xxx'],
  // data(){
  //   return{
  //     type:'-'   //'-'代表支出，'+'代表收入
  //   }
  // },
  // mounted(){
  //   console.log(this.xxx)
  // },
  // methods:{
  //   selectType(type){         //type只能是+或-中的一个
  //     if(type !== '-' && type !== '+'){  
  //       throw new Error('type is unknown')  
  //     }
  //     this.type = type
  //   }
  // }   //以上是js语法写的选择器
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