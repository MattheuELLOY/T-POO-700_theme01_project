<template>
  <Doughnut :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :width="width" :height="height"/>
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
      for (const workingTime of allWorkingTime.value.slice(-7)) {
        sumWokingTime += moment(workingTime.end).diff(moment(workingTime.start), 'hour')
      }
      return sumWokingTime
    })
    const restWorkingTime = computed(() => { return (35 - workingTime.value) })



    const chartId: string = 'doughnut-chart' 
    const chartData = computed(() => {
      return {
        labels: restWorkingTime.value < 0 ?['Realised','Additional'] : ['Réaliser', 'Restant'],
        datasets: [
          {
            backgroundColor: ['#00D8FF', restWorkingTime.value < 0 ?'#f87979' :'#bcbcbc'],
            borderColor: 'transparent',
            data: [workingTime.value, restWorkingTime.value < 0 ?Math.abs(restWorkingTime.value) : restWorkingTime.value]
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
