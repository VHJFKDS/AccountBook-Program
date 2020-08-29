
<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />

    <div class="createdAt">
      <FormItem field-name="日期" placeholder="在这里输入日期" 
     :value.sync="record.createdAt" type="date" />
    </div>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" 
      @update:value="onUpdateNotes" />
    </div>
    
    <Tags :value.sync="record.tags" />
    <Dialog
      title="新增标签"
      :visible="isCreateTagVisible"
      @confirm="confirmCreateTag"
      @cancel="cancelCreateTag"
    >
      <FormItem slot="content" :value.sync="tagName" placeholder="在这里输入名称" field-name="标签名" />
    </Dialog>
    <Dialog
      title="提示"
      :visible="isSelectTagVisible"
      @confirm="confirmSelectTag"
      @cancel="cancelSelectTag"
    >
      <div slot="content" class="info">至少要选择一个标签哦~</div>
    </Dialog>
    
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from 'vue-class-component';


import NumberPad from "@/components/money/NumberPad.vue";
import FormItem from "@/components/money/FormItem.vue";
import Tags from "@/components/money/Tags.vue";
import recordTypeList from "../constants/recordTypeList";
import Tabs from "../components/Tabs.vue";
import TagHelper from '@/lib/mixins/tagHelper';
import Dialog from '../components/Dialog.vue';

@Component({
  components: { Tags, NumberPad, FormItem, Tabs, Dialog},
})
export default class Money extends mixins(TagHelper) {
  recordTypeList = recordTypeList;
  isSelectTagVisible = false


  get recordList() {
    return this.$store.state.recordList;
  }


  record: RecordItem = {
    //记录
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt:new Date().toISOString(),
  };
 
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    //点了ok后的数据存进去
    if(!this.record.tags || this.record.tags.length === 0){
      return window.alert('至少要选择一个标签哦')
    }
    this.$store.commit("createRecord", this.record);
    this.record.tags = []
    this.record.notes = ''
    this.record.amount = 0
  }
   confirmSelectTag () {
    this.isSelectTagVisible = false
  }
   cancelSelectTag () {
    this.isSelectTagVisible = false
  }
}
</script>

<style lang="scss">
.layout-content {
  background: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
}

.info{
  text-align: center;
}

</style>

