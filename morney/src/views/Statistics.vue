<template>
<Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <h3 class="title">{{group.title}}</h3>
            <ol>
              <li v-for="item in group.items" :key="item.id" class="record">
                {{item.amount}}{{item.createdAt}}</li>
            </ol>
          </li>
        </ol>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '../components/Tabs.vue';
import intervalList from '../constants/intervalList';
import recordTypeList from '../constants/recordTypeList';

@Component({
  components:{Tabs}
})
export default class Statistics extends Vue{
 get recordList(){
   return (this.$store.state as RootState).recordList
 }
 get result(){
   const {recordList} = this
   type HashTableValue = {title:string,items:RecordItem[]}

   const hashTable:{[key:string]:HashTableValue} ={}    //它的key是字符串，value也是字符串
   for(let i=0;i<recordList.length;i++){
    const [date,time] = recordList[i].createdAt!.split('T')  //createdAt
    hashTable[date] = hashTable[date] || {title:date,items:[]}
    hashTable[date].items.push(recordList[i])
   }
   return hashTable
 }
 beforeCreate(){
   this.$store.commit('fetchRecords')
 }

 type ='-';
 interval='day';
 intervalList = intervalList;
 recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
 ::v-deep {
 .type-tabs-item{
  background: white;
  &.selected{
    background: #c4c4c4;
    &::after{
      display: none;
    }
  }
 }
  .interval-tabs-item{
    height: 48px;
  }
}
%item{
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
  .title{
    @extend %item
  }
  .record{
    background: white;
    @extend %item

  }
</style>