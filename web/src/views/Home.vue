<template v-if="user.id">
  <div class="content column card chart-gap">
    <div class="white-text">
      <div>
        <h2>Activity</h2>
        <barChartVue v-bind:width='375' v-bind:height='250' />
      </div>
      <div>
        <h2>Hours worked in last 7 days</h2>
        <doughnutChartVue v-bind:width='375' v-bind:height='250' />
      </div>
    </div>
    <div class="white-text">
      <div>
        <h2>Working hours per day</h2>
        <LineChart v-bind:width='700' v-bind:height='250' />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import barChartVue from '@/components/barChart.vue';
import doughnutChartVue from '@/components/doughnutChart.vue';
import { useUserStore } from '@/store/user';
import { useWorkingTime } from '@/store/workingTime';
import { computed } from '@vue/reactivity';
import { defineComponent, onMounted } from 'vue';
import LineChart from "@/components/LineChart.vue";

export default defineComponent({
  name: 'Home',
  components: {
    LineChart,
    barChartVue,
    doughnutChartVue
  },
  props: {
    userId: Number
  },
  setup(props) {
    const userStore = useUserStore()
    const user = computed(() => userStore.user)
    const workingTimeStore = useWorkingTime()

    onMounted(() => {
      workingTimeStore.getAll(<number>props.userId)
    })

    return {
      user
    }
  }
})
</script>

<style scoped lang="css">
  .chart-gap {
    gap: 2rem;
  }
@media (max-width: 72em) {
  .chart-gap {
    gap: 1rem;
  }
}
@media (max-width: 62em) {
  .chart-gap {
    flex-direction: column;
  }
}
  .white-text{
    display: flex;
    text-align: center;
  }
</style>
