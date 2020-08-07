<template>
   <div class="nav-wrapper">
    <div class="content">
    <slot/>  <!--插槽-->
    </div>
    <Nav/>
  </div>

</template>

<script lang="ts">
export default({
    name:'Layout'
})
</script>

<style lang="scss" scoped>
.nav-wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content{
  flex-grow: 1;  //这里占了一份，其他的空间其他自己分
  overflow: auto;
}
</style>
