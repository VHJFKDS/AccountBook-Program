
<template>
<Layout class-prefix="layout">
<NumberPad :value.sync="record.amount" @submit="saveRecord"/>
<Types :value.sync="record.type"/>
<FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
<Tags/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue"
import FormItem from "@/components/money/FormItem.vue"
import Tags from "@/components/money/Tags.vue"
import { Component} from "vue-property-decorator";
import store from '../store/index2';


@Component({
  components:{Tags,NumberPad,Types,FormItem}
  
  
})

export default class Money extends Vue{
 recordList = store.recordList;
 record:RecordItem = {  //记录
  tags:[],notes:'',type:'-',amount:0
}


 onUpdateNotes(value:string){
  this.record.notes = value
 }
saveRecord(){  //点了ok后的数据存进去
 store.createRecord(this.record)
}


}
</script>

<style lang="scss">
.layout-content{
  background: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  }

</style>

