<template>
  <label class="formItem">
    <span class="name">{{this.fieldName}}</span>
    <template v-if="type === 'date'">
      <input
        :type="type || 'text'"
        :value="x(value)"
        @input="onValueChanged($event.target.value)"
        :placeholder="this.placeholder"
      />
    </template>
    <template v-else>
      <input
        :type="type || 'text'"
        :value="value"
        @input="onValueChanged($event.target.value)"
        :placeholder="this.placeholder"
      />
    </template>
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;

  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
  x(isoString: string){
    return dayjs(isoString).format('YYYY-MM-DD')
  }
}
</script>


<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.formItem {
  font-size: 14px;
  display: block;
  padding: 16px;
  display: flex;
  align-items: center;
  .name {
    padding: 0 16px;
  }
  input {
    height: 30px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>