
<template>
<Layout class-prefix="layout">
<NumberPad :value.sync="record.amount" @submit="saveRecord"/>
<Tabs :data-source="recordTypeList" :value.sync="record.type"/>
<div class="notes">
    <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
</div>
<Tags/>
    </Layout> 
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from "@/components/money/NumberPad.vue";
import FormItem from "@/components/money/FormItem.vue"
import Tags from "@/components/money/Tags.vue"
import { Component} from "vue-property-decorator";
import recordTypeList from '../constants/recordTypeList';
import Tabs from '../components/Tabs.vue';


@Component({
  components:{Tags,NumberPad,FormItem,Tabs},
})

export default class Money extends Vue{

recordTypeList = recordTypeList 


get recordList(){
      return this.$store.state.recordList
    }

 record: RecordItem = {  //记录
  tags:[],notes:'',type:'-',amount:0
}

created(){
  this.$store.commit('fetchRecords')
}
 onUpdateNotes(value: string){
  this.record.notes = value
 }
saveRecord(){  //点了ok后的数据存进去
 this.$store.commit('createRecord',this.record)
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
  // .notes{
  //   padding: 12px 0;
  // }

</style>

