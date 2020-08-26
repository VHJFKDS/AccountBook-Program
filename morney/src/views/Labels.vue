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
      <Dialog title="新增标签" :visible="isCreateTagVisible" @confirm="confirmCreateTag" @cancel="cancelCreateTag">
        <FormItem slot="content" :value.sync="tagName" placeholder="在这里输入名称" field-name="标签名"/>
      </Dialog>
    </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '../components/Button.vue';
import { mixins } from 'vue-class-component';
import TagHelper from '../lib/mixins/tagHelper';
import FormItem from '../components/money/FormItem.vue';
import Dialog from '../components/Dialog.vue';

// const tagHelper:any = require('@/mixins/tagHelper');
@Component({
  components:{Button,FormItem,Dialog},
})
export default class Labels extends mixins(TagHelper){
  get tags(){
      return this.$store.state.tagList
  }
  beforeCreate(){
    this.$store.commit('fetchTags')
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