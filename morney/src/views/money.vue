
<template>
    <Layout class-prefix="layout">
<NumberPad/>
<Types/>
<Notes/>
<Tags/>
    </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue"
import Notes from "@/components/money/Notes.vue"
import Tags from "@/components/money/Tags.vue"

export default {
 name:'Money',
 components:{Tags,NumberPad,Types,Notes}
}
</script>

<style lang="scss">
.layout-content{
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  display: flex;
  flex-direction: column-reverse;
  }

</style>

