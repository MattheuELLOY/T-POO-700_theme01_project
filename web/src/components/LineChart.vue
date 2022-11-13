<template>
  <Line :chart-options="chartOptions" :chart-data="chartData" :width="width" :height="height"/>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed } from 'vue'
import { useWorkingTime } from '@/store/workingTime'
import moment from 'moment'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'lineChart',
  components: {
    Line
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    }
  },
  setup() {
    const workingTimeStore = useWorkingTime()
    const allWorkingTime = computed(() => workingTimeStore.allWorkingTime)

    const dataWorkingTimes = computed(() => {
      const dataWorkingTime = []
      const sortedArray = allWorkingTime.value.sort((a, b) => moment(a.start).diff(b.start))
      for(const workingTime of sortedArray) {
        dataWorkingTime.push(moment(workingTime.end).diff(moment(workingTime.start), 'hour'))
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
            data: dataWorkingTimes.value,
            fill: false,
            borderColor: '#41B883',
            backgroundColor: '#41B883',
            tension: 0.1
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