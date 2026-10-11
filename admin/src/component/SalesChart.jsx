import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

import { authDataContext } from '../context/AuthContext'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

function SalesChart() {

  const { serverUrl } = useContext(authDataContext)
  const [chartData, setChartData] = useState({})
  const [range, setRange] = useState(7)

  const fetchStats = async () => {
    const res = await axios.get(`${serverUrl}/api/order/stats?range=${range}`)
    
    const labels = Object.keys(res.data.data)
    const values = Object.values(res.data.data)

    setChartData({
      labels,
      datasets: [
        {
          label: "Orders",
          data: values,
          borderColor: "#46d1f7",
          tension: 0.3
        }
      ]
    })
  }

  useEffect(() => {
    fetchStats()
  }, [range])

  return (
    <div className='bg-[#1a1a1a] p-[20px] rounded-xl border border-gray-700'>

      <div className='flex justify-between mb-4'>
        <h2 className='text-[18px]'>Sales Analytics</h2>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className='bg-[#2a2a2a] px-2 py-1 rounded'
        >
          <option value={7}>Last 7 Days</option>
          <option value={15}>Last 15 Days</option>
          <option value={30}>Last 1 Month</option>
        </select>
      </div>

      {chartData.labels && <Line data={chartData} />}

    </div>
  )
}

export default SalesChart