<template>
  <Bar :chart-options="chartOptions" :chart-data="chartData" :width="width" :height="height"/>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { Bar } from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement} from 'chart.js'
import { computed } from 'vue'
import { useWorkingTime } from '@/store/workingTime'
import moment from 'moment'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement)

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
    const workingTimeStore = useWorkingTime()
    const allWorkingTime = computed(() => workingTimeStore.allWorkingTime)

    const dataWorkingTimes = computed(() => {
      const dataWorkingTime = []
      const sortedArray = allWorkingTime.value.sort((a, b) => moment(a.start).diff(b.start))
      for(const workingTime of sortedArray) {
        dataWorkingTime.push(moment(workingTime.end).diff(moment(workingTime.start), 'hours'))

      }
      return dataWorkingTime.slice(-7)
    })

    const labelArray = computed(() => {
      const res = []
      for(const startDate of allWorkingTime.value){
        res.push(startDate.start.toString().split('T')[0])
      }
      return res.slice(-7)
    })



    const chartData = computed(() => {
      return {
        labels : labelArray.value,

        datasets: [
          {
            label: 'Hours',
            backgroundColor: ['#e03f3b', '#f87979'],
            data: dataWorkingTimes.value
          }
        ]
      }
    })

    const chartOptions = {
      responsive: true
    }

    return {
      chartData,
      chartOptions,
      dataWorkingTimes
    }
  }
})
</script>