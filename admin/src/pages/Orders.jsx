import React, { useState, useEffect, useContext } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si";

function Orders() {

  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + '/api/order/list',
        {},
        { withCredentials: true }
      )
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      await axios.post(
        serverUrl + '/api/order/status',
        { orderId, status: e.target.value },
        { withCredentials: true }
      )
      fetchAllOrders()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>

      <Nav />
      <Sidebar />

      {/* MAIN */}
      <div className='ml-[240px] pt-[90px] px-[30px]'>

        {/* HEADING */}
        <h1 className='text-[30px] font-semibold text-[#afe2f2] mb-[30px]'>
          All Orders
        </h1>

        {/* ORDERS LIST */}
        <div className='flex flex-col gap-[20px] max-w-[1100px]'>

          {orders.length > 0 ? (

            orders.map((order, index) => (

              <div
                key={index}
                className='bg-[#1a1a1a] border border-gray-700 rounded-xl p-[20px] flex flex-col md:flex-row gap-[20px] hover:shadow-lg transition'
              >

                {/* ICON */}
                <div>
                  <SiEbox className='w-[50px] h-[50px] bg-white text-black p-2 rounded-lg' />
                </div>

                {/* LEFT */}
                <div className='flex flex-col gap-2 flex-1'>

                  {/* PRODUCTS */}
                  <div className='text-[15px] text-[#46d1f7]'>
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name} × {item.quantity} ({item.size})
                        {i !== order.items.length - 1 && ", "}
                      </span>
                    ))}
                  </div>

                  {/* ADDRESS */}
                  <div className='text-[13px] text-gray-400'>
                    <p>{order.address.firstName} {order.address.lastName}</p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state}, {order.address.country}
                    </p>
                    <p>{order.address.pinCode}</p>
                    <p>{order.address.phone}</p>
                  </div>

                </div>

                {/* RIGHT */}
                <div className='flex flex-col gap-2 text-[14px] min-w-[200px]'>

                  <p>Items: {order.items.length}</p>
                  <p>Method: {order.paymentMethod}</p>
                  <p>
                    Payment:{" "}
                    <span className={order.payment ? "text-green-400" : "text-yellow-400"}>
                      {order.payment ? "Done" : "Pending"}
                    </span>
                  </p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>

                  <p className='text-[18px] font-semibold text-white'>
                    ₹{order.amount}
                  </p>

                  {/* STATUS */}
                  <select
                    value={order.status}
                    onChange={(e) => statusHandler(e, order._id)}
                    className='mt-2 px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md focus:border-[#46d1f7]'
                  >
                    <option>Order Placed</option>
                    <option>Packing</option>
                    <option>Shipped</option>
                    <option>Out for delivery</option>
                    <option>Delivered</option>
                  </select>

                </div>

              </div>

            ))

          ) : (

            <p className='text-gray-400'>No orders found</p>

          )}

        </div>

      </div>

    </div>
  )
}

export default Orders