<template>
<Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <Chart :options="y"/>
        <ol v-if="groupedList.length>0">
          <li v-for="(group,index) in groupedList" :key="index">
            <h3 class="title">
              {{beautify(group.title)}}
              <span>￥{{group.total}}</span>
              </h3>
            <ol>
              <li v-for="item in group.items" :key="item.id" class="record">
               <span>{{tagString(item.tags)}}</span> 
               <span class="notes">{{item.notes}}</span>
               <span>￥{{item.amount}}</span>
               </li>
            </ol>
          </li>
        </ol>
         <div v-else class="no-result">
             目前没有相关记录
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '../components/Tabs.vue';
import recordTypeList from '../constants/recordTypeList';
import dayjs from 'dayjs'
import clone from '@/lib/clone';
import Chart from '../components/money/Chart.vue';

const ECharts = require('vue-echarts').default

import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

console.log(ECharts)

@Component({
  components:{Tabs,Chart}
})
export default class Statistics extends Vue{
 tagString(tags: Tag[]){
   return tags.length === 0 ? '无' :tags.map(tag=>tag.name).join(',')
 }


 beautify(string: string){
   const now = dayjs()
   const day = dayjs(string)
  if(day.isSame(now,'day')){
    return '今天'
  }else if(day.isSame(now.subtract(1,'day'),'day')){ //subtract(1,'day')减1天
    return '昨天'
  }else if(day.isSame(now.subtract(2,'day'),'day')){
    return '前天'
  }else if(day.isSame(now,'year')){
    return day.format('M月D日')
  }else{
    return day.format('YYYY年M月D日')
  }
 }
 get y(){
   return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
        'Mon', 'Tue'
        ]
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130,
        120, 200, 150, 80, 70, 110, 130,
        120, 200, 150, 80, 70, 110, 130,
        120, 200, 150, 80, 70, 110, 130,
        120, 200
        ],
        type: 'line',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
        }
    }],
    tooltip:{show:true}
    }
  }

 

 get recordList(){
   return (this.$store.state as RootState).recordList
 }
 get groupedList(){
   const {recordList} = this
   const newList = clone(recordList).filter(r=>r.type === this.type)
    .sort((a,b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())


   if(newList.length === 0){return [] as Result}
   
   type Result = {title: string;total?: number;items: RecordItem[]}[]
   const result: Result = [{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}]
   for(let i=1;i<newList.length;i++){
     const current = newList[i]
     const last = result[result.length -1]
     if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
       last.items.push(current)
     }else{
       result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current]})
     }
   }
   result.map(group=>{
     group.total = group.items.reduce((sum,item)=>sum+item.amount,0)
   })
   return result
 }
 beforeCreate(){
   this.$store.commit('fetchRecords')
 }

 type ='-';
 recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.echarts {
  min-width: 100%;
  height: 400px;
}
.no-result{
  padding: 16px;
  text-align: center;
}
 ::v-deep {
 .type-tabs-item{
  background: #c4c4c4;
  &.selected{
    background: white;
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
    @extend %item;
    background: white;
  }
  .notes{
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>