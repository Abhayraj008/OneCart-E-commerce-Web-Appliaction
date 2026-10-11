import React, { useState, useEffect, useContext } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import SalesChart from '../component/SalesChart'
import axios from 'axios'

function Home() {

  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [revenue, setRevenue] = useState(0) // 🔥 NEW

  const { serverUrl } = useContext(authDataContext)

 const fetchCounts = async () => {
  try {

    // ✅ PRODUCTS
    const productRes = await axios.get(`${serverUrl}/api/product/list`, {
      withCredentials: true
    })

    setTotalProducts(productRes.data.products.length)

    // ✅ ORDERS
    const orderRes = await axios.post(`${serverUrl}/api/order/list`, {}, {
      withCredentials: true
    })

    console.log("ORDER DATA:", orderRes.data)

    const orders = orderRes.data.orders || []

    setTotalOrders(orders.length)

    // 🔥 💰 REVENUE LOGIC
    let totalRevenue = 0

    orders.forEach(order => {

      console.log("CHECK ORDER:", order.payment, order.amount)

      // ✅ only paid orders
      if (order.payment === true) {
        totalRevenue += order.amount
      }

    })

    console.log("TOTAL REVENUE:", totalRevenue)

    setRevenue(totalRevenue)

  } catch (err) {
    console.log("ERROR:", err)
  }
}

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>

      <Nav />
      <Sidebar />

      <div className='ml-[240px] pt-[90px] px-[30px]'>

        <h1 className='text-[30px] text-[#afe2f2] mb-[25px]'>
          Dashboard
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px]'>

          {/* PRODUCTS */}
          <div className='bg-[#1a1a1a] p-[25px] rounded-xl border border-gray-700 shadow-md'>
            <p className='text-gray-400'>Total Products</p>
            <h2 className='text-[30px] font-bold mt-[10px]'>
              {totalProducts}
            </h2>
          </div>

          {/* ORDERS */}
          <div className='bg-[#1a1a1a] p-[25px] rounded-xl border border-gray-700 shadow-md'>
            <p className='text-gray-400'>Total Orders</p>
            <h2 className='text-[30px] font-bold mt-[10px]'>
              {totalOrders}
            </h2>
          </div>

          {/* REVENUE 🔥 */}
          <div className='bg-[#1a1a1a] p-[25px] rounded-xl border border-gray-700 shadow-md'>
            <p className='text-gray-400'>Revenue</p>
            <h2 className='text-[30px] font-bold mt-[10px] text-green-400'>
              ₹{revenue}
            </h2>
          </div>

        </div>

        <div className='mt-[40px] max-w-[1000px]'>
          <SalesChart />
        </div>
      </div>
    console.log("PRODUCT API:", productRes.data)
    console.log("ORDER API:", orderRes.data)
    </div>
  )
}

export default Home