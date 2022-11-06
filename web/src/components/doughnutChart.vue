<template>
  <Doughnut :chart-data="chartData" :chart-options="chartOptions" :chart-id="chartId" :width="width" :height="height"/>
</template>

<script lang="ts">
import { computed, defineComponent, h, type PropType } from 'vue'

import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'
import { useWorkingTime } from '@/store/workingTime'
import moment, { relativeTimeRounding } from 'moment'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    }
  },
  setup() {
    const workingTimeStore = useWorkingTime()
    const allWorkingTime = computed(() => workingTimeStore.allWorkingTime)

    const workingTime = computed(() => { 
      var sumWokingTime: number = 0
      for (const workingTime of allWorkingTime.value) {
        sumWokingTime += moment(workingTime.end).diff(moment(workingTime.start), 'hour')
      }
      return sumWokingTime
    })
    const restWorkingTime = computed(() => { return (35 - workingTime.value) })

    const chartId: string = 'doughnut-chart' 
    const chartData = computed(() => {
      return {
        labels: ['Réaliser', 'Restant'],
        datasets: [
          {
            backgroundColor: ['#00D8FF', '#bcbcbc'],
            borderColor: 'transparent',
            data: [workingTime, restWorkingTime]
          }
        ]
      }
    })
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return {
      chartId,
      chartData,
      chartOptions,
    }
  }
})
</script>
