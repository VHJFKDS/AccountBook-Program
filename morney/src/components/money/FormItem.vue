<template>
<label class="formItem">
  <span class="name">{{this.fieldName}}</span>
<input type="text" :value="value" @input="onValueChanged($event.target.value)" :placeholder="placeholder">
</label>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue{
 @Prop({default:''}) readonly value!: string
 @Prop({required:true}) fieldName!: string;
 @Prop() placeholder?: string

 
 onValueChanged(value: string){
  this.$emit('update:value',value)
 }
}
</script>


<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.formItem{
  font-size: 14px;
  display: block;
  padding: 16px;
  display: flex;
  align-items: center;
  .name{
   padding: 0 16px;
  }
 input{
   height: 40px;
   flex-grow: 1;
   background: transparent;
   border: none;
 }
}
</style>