<template>
   <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
    <slot/>  <!--插槽-->
    </div>
    <Nav/>
  </div>

</template>

<script lang="ts">
export default({
  props:['classPrefix'],
    name:'Layout'
})
</script>

<style lang="scss" scoped>
.layout-wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content{
  // background: #f5f5f5;
  flex-grow: 1;  //这里占了一份，其他的空间其他自己分
  overflow: auto;
}
</style>
