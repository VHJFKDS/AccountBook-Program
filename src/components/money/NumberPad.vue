<template>
  <div class="numberPad">
  <div class="output">{{output}}</div>
  <div class="buttons">
    <button @click="inputContent">1</button>
    <button @click="inputContent">2</button>
    <button @click="inputContent">3</button>
    <button @click="remove">删除</button>
    <button @click="inputContent">4</button>
    <button @click="inputContent">5</button>
    <button @click="inputContent">6</button>
    <button @click="clear">清空</button>
    <button @click="inputContent">7</button>
    <button @click="inputContent">8</button>
    <button @click="inputContent">9</button>
    <button @click="ok" class="ok">Ok</button>
    <button @click="inputContent" class="zero">0</button>
    <button @click="inputContent">.</button>

  </div>
</div>
</template>

<script lang="ts">
 import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";

@Component

export default class NumberPad extends Vue{
  @Prop(Number) readonly value!: number;
  output = this.value.toString()  //初始值在Money

  @Watch('value')
    onValueChange(value: number){
      this.output = value.toString()
    }
  

  inputContent(event: MouseEvent){   //这是一个鼠标事件
  const button = (event.target as HTMLButtonElement)  //target可能是空，强制指定类型event.target是按钮
  const input = button.textContent as string;  //输入的内容(!表示这个不为空，相当于as string)
  if(this.output.length === 10){return}   //数字输入长度不得大于10位
  if(this.output === '0'){  //当本身output是0
  // if(input === '0'){return} //再输入0，则无效
  if('0123456789'.indexOf(input)>=0){  //如果你输入的字符在1-9范围里，这里的>0指length0，非字符
      this.output = input   //在初始值为0的情况下，再输入数字则是替换0，否则就在后面加数
    }else{
      this.output+=input
    }
    return
  }
  if(this.output.indexOf('.')>=0 && input === '.'){return} 
  //如果输出的内容里已有一个点，又再输入点则无效
  this.output+=input
  }
  remove(){
    if(this.output.length === 1){
      this.output ='0'
    }else{
    this.output = this.output.slice(0,-1)
    }
  }
  clear(){
      this.output ='0'
  }
  ok(){
   const number = parseFloat(this.output)
   this.$emit('update:value',number)
   this.$emit('submit',number)
  //  this.output = '0'
  }
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad{
  .output{
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas,monospace;
    padding: 9px 16px;
    text-align: right;
    min-height: 72px;
  }
  .buttons{
   @extend %clearFix;
    button{
      width: 25%;
      height: 55px;
      float: left;
      background: transparent;
      border: none;
      &.ok{
        height: 55*2px;
        float: right;
      }
      &.zero{
        width: 25*2%;
      }
      $bg:#f2f2f2;
      &:nth-child(1){
        background: $bg;
      }
      &:nth-child(2),&:nth-child(5){
        background: darken($bg,4%);
      }
      &:nth-child(3),&:nth-child(6),&:nth-child(9){
        background: darken($bg,4*2%);
      }
      &:nth-child(4),&:nth-child(7),&:nth-child(10){
        background: darken($bg,4*3%);
      }
      &:nth-child(8),&:nth-child(11),&:nth-child(13){
        background: darken($bg,4*4%);
      }
      &:nth-child(14){
        background: darken($bg,4*5%);
      }
      &:nth-child(12){
        background: darken($bg,4*6%);
      }
    }
  }
}
</style>