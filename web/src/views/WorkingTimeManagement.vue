<template>
  <WorkingTime v-bind:userid="userid" status='' />
</template>

<script lang="ts">
import WorkingTime from '@/components/WorkingTime.vue';
import { onMounted } from 'vue';

export default {
  props: {
    userid: Number
  },
  components: { WorkingTime },
}
</script>

<style scoped lang="css">

</style>
