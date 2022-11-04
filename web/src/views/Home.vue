<template>
  <div class="">
    <barChartVue v-bind:width='375' v-bind:height='250' />
    <doughnutChartVue v-bind:width='375' v-bind:height='250' />
  </div>
</template>

<script lang="ts">
import barChartVue from '@/components/barChart.vue';
import doughnutChartVue from '@/components/doughnutChart.vue';
import { useUserStore } from '@/store/user';
import { useWorkingTime } from '@/store/workingTime';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    barChartVue,
    doughnutChartVue
  },
  props: {
    userId: Number
  },
  setup(props) {
    const userStore = useUserStore()
    const workingTimeStore = useWorkingTime()

    onMounted(() => {
      userStore.get(<number>props.userId)
      workingTimeStore.getAll(<number>props.userId)
    })
  }
})
</script>

<style scoped lang="css">

</style>
