<template>
    <Layout>
      <div class="tags">
        <router-link  class="tag" v-for="tag in currentTag" :key="tag.id" :to="`/labels/edit/${tag.id}`"> 
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
import {Component} from 'vue-property-decorator';
import Button from '../components/Button.vue';
import { mixins } from 'vue-class-component';
import TagHelper from '../lib/mixins/tagHelper';

// const tagHelper:any = require('@/mixins/tagHelper');
@Component({
  components:{Button},
})
export default class Labels extends mixins(TagHelper){

  get currentTag(){
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