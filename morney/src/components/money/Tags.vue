<template>
 <div class="tags">
  <ul class="current">
    <li v-for="tag in dataSource" :key="tag" :class="{selected:selectedTags.indexOf(tag)>=0}" @click="toggle(tag)">{{tag}}</li>
    
  </ul>
  <div class="new">
    <button @click="createTag">新增标签</button>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component
export default class Tags extends Vue{
  @Prop() readonly dataSource:string[] | undefined
  selectedTags:string[] = []
  toggle(tag:string){
    const index = this.selectedTags.indexOf(tag)
    if(index>=0){
       this.selectedTags.splice(index,1)
    }else{
    this.selectedTags.push(tag)
    }
    this.$emit('update:value',this.selectedTags)
  }
  createTag(){
    const name = window.prompt('请输入标签名')
    if(name === ''){
      window.alert('标签不能为空')
    }else if(this.dataSource){
      this.$emit('update:dataSource',[...this.dataSource,name])
      //如果你填了一个name，而name不为空，就会把更新datasource的请求告诉外部
      //如果你触发了update:dataSource事件，就会把你传的数组[]赋值给他之前的:dataSource.sync
  }
}
}
</script>

<style lang="scss" scoped>
.tags{
  // flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  .current{
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    li{
      $bg:#d9d9d9;
      background: $bg;
      height: 24px;
      line-height: 24px;
      border-radius: (24px/2);
      padding: 0 16px;
      margin-right: 12px;
      margin: 4px;
      &.selected{
        background: darken($bg,20%);
      }
    }
  }
  .new{
    padding-top: 16px;
    button{
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>