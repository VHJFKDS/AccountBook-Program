
<template>
    <Layout class-prefix="layout">
      {{recordList}}
<NumberPad :value.sync="record.amout" @submit="saveRecord"/>
<Types :value.sync="record.type"/>
<Notes @update:value="onUpdateNotes"/>
<Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue"
import Notes from "@/components/money/Notes.vue"
import Tags from "@/components/money/Tags.vue"
import { Component, Watch } from "vue-property-decorator";

window.localStorage.setItem('version','0.0.1')  //设置版本

type Record = {   //类型声明 (记录类型)
  tags:string[]
  notes:string
  type:string
  amout:number
  createdAt?:Date
}

@Component({
  components:{Tags,NumberPad,Types,Notes}
})

export default class Money extends Vue{
 tags=['衣','食','住','行','菜谱'];
 recordList:Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')
record:Record = {  //记录
  tags:[],notes:'',type:'-',amout:0
}

 onUpdateTags(value:string[]){
   this.record.tags = value
 }
 onUpdateNotes(value:string){
  this.record.notes = value
 }
saveRecord(){  //点了ok后的数据存进去
const record2:Record = JSON.parse(JSON.stringify(this.record))   
record2.createdAt = new Date()
  this.recordList.push(record2)
  console.log(this.recordList)
}
@Watch('recordList')
onRecordListChange(){
  window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
}

}
</script>

<style lang="scss">
.layout-content{
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
 
  }

</style>

