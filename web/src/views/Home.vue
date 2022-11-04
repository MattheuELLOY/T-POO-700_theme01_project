<template>
  <barChartVue v-bind:width='600' v-bind:height='300' />
</template>

<script lang="ts">
import barChartVue from '@/components/barChart.vue';
import { getAllUsers } from '@/helpers/user-helper';
import { useUserStore } from '@/store/user';
import { useWorkingTime } from '@/store/workingTime';
import { computed } from '@vue/reactivity';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    barChartVue
  },
  props: {
    userId: Number
  },
  setup(props) {
    const userStore = useUserStore()

    onMounted(() => {
      userStore.get(<number>props.userId)
    })
  }
})
</script>

<style scoped lang="css">
</style>
