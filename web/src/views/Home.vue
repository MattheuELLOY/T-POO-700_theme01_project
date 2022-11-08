<template>
  <div v-if="user.id" class="content card chart-gap">
    <div class="white-text">
      <h2>Working times of last 7 days</h2>
      <barChartVue v-bind:width='375' v-bind:height='250' />
    </div>
    <div class="white-text">
      <h2>Hours worked of the week</h2>
      <doughnutChartVue v-bind:width='375' v-bind:height='250' />
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
    const user = computed(() => userStore.user)
    const workingTimeStore = useWorkingTime()

    onMounted(() => {
      userStore.get(<number>props.userId)
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
    gap: 7rem;
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
</style>
