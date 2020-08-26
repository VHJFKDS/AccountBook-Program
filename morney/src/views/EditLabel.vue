<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name" @update:value="update" field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button class="save" @click="save">保存</Button>
      <Button v-show="tagList.length !== 1" @click="remove">删除标签</Button>   
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import Button from '../components/Button.vue';
import checkName from '@/lib/checkName';

@Component({
  components:{FormItem,Button},
})

export default class EditLabel extends Vue{
  get currentTag(){
      return this.$store.state.currentTag
  }
  get tagList(){
    return this.$store.state.tagList
  }
  created(){
    this.$store.commit('fetchTags')
    this.$store.commit('setCurrentTag',this.$route.params.id)
  if(!this.currentTag){   
    this.$router.replace('/404')
  }
  }
update(name: string){
  if(this.currentTag){
    this.$store.commit('updateTag',name)
  // store.updateTag(this.tag.id,name)
  }
}
 
save(){
  if(!checkName(this.currentTag.name)){
    return window.alert('标签名不能为空')
  }else{
    this.$store.commit('saveTag')
  }
}
  remove(){
     this.$store.commit('removeTag')

  //   if(this.currentTag){
  //    this.$store.commit('removeTag',this.currentTag.id)
  // }
  }
goBack(){
  this.$router.back()
}

}

</script>
<style lang="scss" scoped>
.navBar{
  text-align: center;
  font-size: 16px;
  padding:12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .leftIcon{
    width: 24px;
    height: 24px;
  }
  
  .rightIcon{
    width: 24px;
    height: 24px;
  }
}
  .form-wrapper{
    background: white;
    margin-top: 8px;
  }

.button-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
  Button{
    margin: 0 16px;
    
}
}
::v-deep .save{
      padding: 0 32px;
    }
</style>