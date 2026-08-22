<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  type ChartData,
  type ChartOptions,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

/* ---------------- PROPS ---------------- */
const props = defineProps<{
  dateList: string[]
  viewData: number[]
  clickData: number[]
}>()

/* ---------------- INTERNAL STATE ---------------- */
const labels = ref<string[]>([])
const views = ref<number[]>([])
const clicks = ref<number[]>([])

/* ---------------- WATCH PROPS ---------------- */
watch(
  () => ({
    dates: props.dateList,
    views: props.viewData,
    clicks: props.clickData,
  }),
  (data) => {
    labels.value = [...data.dates]
    views.value = [...data.views]
    clicks.value = [...data.clicks]
  },
  { deep: true, immediate: true }
)

/* ---------------- CHART DATA (Matching the screenshot colors) ---------------- */
const chartData = computed<ChartData<'line', number[], string>>(() => ({
  labels: labels.value,
  datasets: [
    {
      label: '# of Views',
      data: views.value,
      borderColor: '#36a2eb', // Blue line outline
      backgroundColor: 'rgba(54, 162, 235, 0.1)', // Light blue-grey fill in legend box
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#36a2eb',
      pointHoverRadius: 6,
      pointRadius: 4,
    },
    {
      label: '# of Clicks',
      data: clicks.value,
      borderColor: '#ff6384', // Pink line outline
      backgroundColor: 'rgba(255, 99, 132, 0.1)', // Light pink-grey fill in legend box
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#ff6384',
      pointHoverRadius: 6,
      pointRadius: 4,
    },
  ],
}))

/* ---------------- OPTIONS ---------------- */
const chartOptions = ref<ChartOptions<'line'>>({
  responsive: true,
  maintainAspectRatio: false,
  clip: false, // Prevents points at the very top/bottom from being cut off
  layout: {
    padding: {
      top: 10,    // Gives room at the top scale (1.0)
      bottom: 10, // Gives room at the bottom scale (0)
      left: 5,
      right: 15
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'center' as const,
      labels: {
        boxWidth: 40,
        boxHeight: 12,
        font: {
          family: 'sans-serif',
          size: 12,
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true, // Matches E:\Github\quick-discount-pop-up-frontend scaling
      grid: {
        color: '#e5e7eb'
      }
    },
    x: {
      grid: {
        color: '#e5e7eb'
      }
    }
  },
})
</script>

<template>
  <div class="w-full max-w-full mx-auto h-72">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>