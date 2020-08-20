<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
   <li v-for="item in dataSource" :key="item.value" class="tabs-item"
   :class="liClass(item)" @click="select(item)"
   >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = {text:string,value:string}
@Component
export default class Tabs extends Vue{
 @Prop({required:true,type:Array}) dataSource!:DataSourceItem[]   //接受一个数据源
  @Prop() readonly value!:string;    //value表示你选中的是哪一项
  @Prop() classPrefix?:string  //增加一个类前缀

  liClass(item:DataSourceItem){
      return{
        [this.classPrefix+'-tabs-item']:this.classPrefix,selected:item.value === this.value
      }
  }
  
  select(item:DataSourceItem){
    this.$emit('update:value',item.value)
  }
}
</script>


<style lang="scss" scoped>
.tabs{
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item{
    width: 50%;
    line-height: 64px;
    height: 64px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
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