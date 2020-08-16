<template>
    <Layout>
      <div class="tags">
        <router-link  class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`"> 
          <span>{{tag.name}}</span>
          <Icon name="right"/>
        </router-link>
     
      </div>
      <div class="createTag-wrapper">
        <Button class="createTag" @click="createTag">新建标签</Button>
      </div>
    </Layout>
    
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import tagListModel from '../models/tagListModel';

@Component
export default class Labels extends Vue{
 tags = window.tagList

 createTag(){
   const name = window.prompt('请输入标签名')
   if(name){
     window.createTag(name)
   }
 }


}
</script>

<style lang="scss" scoped>

.tags{
  background: white;
  font-size: 16px;
  padding-left: 16px;
  .tag{
    min-height: 44px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg{
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag{
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper{    //父元素
    padding: 16px;
    text-align: center;
    margin-top: 44-16px;
  }
}

</style>