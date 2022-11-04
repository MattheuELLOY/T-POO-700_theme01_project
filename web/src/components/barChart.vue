<template>
  <Bar  :chart-options="chartOptions"
        :chart-data="chartData"
        :width="width"
        :height="height"/>
  {{ moment(workingTime[0]?.end).hours().valueOf() }}
</template>

<script lang="ts">

import { defineComponent} from 'vue'

import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { computed, reactive } from '@vue/reactivity'
import { useWorkingTime } from '@/store/workingTime'
import moment from 'moment'
import type { Workingtime } from '@/models/workingtime'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 300
    }
  },
  setup() {
    const data = reactive({
      allWorkingTime: [] as Workingtime[],
      dataWorkingTime: [] as number[]
    })

    const workingTimeStore = useWorkingTime()
    const workingTime = computed(() => workingTimeStore.allWorkingTime)

    const chartData = {
      labels: [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
      ],
      datasets: [
        {
          label: 'Heure',
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#f87979'],
          data: data.dataWorkingTime
        }
      ]
    }

    data.allWorkingTime = workingTime.value
    data.allWorkingTime.forEach((workingTime) => {
      data.dataWorkingTime.push(moment(workingTime.end).diff(moment(workingTime.start), 'hours'))
    })

    data.dataWorkingTime = data.dataWorkingTime.sort((a, b) => a.valueOf() - b.valueOf())

    const chartOptions = {
      responsive: true
    }

    return {
      chartData,
      chartOptions,
      workingTime,
      moment
    }
  }
})
</script>
