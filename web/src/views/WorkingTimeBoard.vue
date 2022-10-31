<template>
  <WorkingTimes v-bind:userid="userid" :status="status"/>
</template>

<script lang="ts">
import WorkingTimes from '@/components/WorkingTimes.vue';

export default {
  props: {
    userid: Number,
    status: String
  },
  components: { WorkingTimes },
}

</script>

<style scoped lang="css">
</style>
