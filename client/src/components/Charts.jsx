import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'
import { getLast7Days } from '../libs/features'

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
)

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
}

const LineChart = ({ value }) => {
  const data = {
    labels: getLast7Days(),
    datasets: [
      {
        label: 'Dataset 1',
        data: value,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  }

  return <Line data={data} options={lineChartOptions} />
}

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
}

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: ['hsl(204, 81%, 56%)', 'hsl(42, 100%, 66%)'],
        hoverBackgroundColor: ['hsl(204, 81%, 56%)', 'hsl(42, 100%, 66%)'],
        borderColor: ['hsl(204, 81%, 46%)', 'hsl(42, 100%, 56%)'],
        offset: 20,
      },
    ],
  }
  return (
    <Doughnut
      data={data}
      options={doughnutChartOptions}
      style={{ zIndex: 10 }}
    />
  )
}

export { LineChart, DoughnutChart }
