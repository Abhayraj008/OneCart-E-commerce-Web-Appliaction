import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Lists() {

  const { serverUrl } = useContext(authDataContext)
  const [list, setList] = useState([])
  const navigate = useNavigate()

  // FETCH PRODUCTS
  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")

      if (Array.isArray(result.data)) {
        setList(result.data)
      } else if (Array.isArray(result.data.products)) {
        setList(result.data.products)
      } else {
        setList([])
      }

    } catch (error) {
      console.log(error)
    }
  }

  // DELETE PRODUCT
  const removeList = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?")
    if (!confirmDelete) return

    try {
      const result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      )

      if (result.data) {
        setList(prev => prev.filter(item => item._id !== id))
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (

    <div className='min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>

      {/* NAVBAR */}
      <Nav />

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className='ml-[240px] pt-[90px] px-[30px]'>

        {/* HEADING */}
        <h1 className='text-[30px] font-semibold text-[#afe2f2] mb-[30px]'>
          All Products
        </h1>

        {/* LIST */}
        <div className='flex flex-col gap-[20px] max-w-[1000px]'>

          {list.length > 0 ? (

            list.map((item, index) => (

              <div
                key={index}
                className='bg-[#1a1a1a] border border-gray-700 rounded-xl p-[15px] flex items-center gap-[20px] hover:shadow-lg transition duration-300'
              >

                {/* IMAGE */}
                <img
                  src={item.image1}
                  className='w-[80px] h-[80px] object-cover rounded-lg border border-gray-600'
                  alt=""
                />

                {/* DETAILS */}
                <div className='flex flex-col flex-1'>

                  <p className='text-[16px] font-medium text-white line-clamp-1'>
                    {item.name}
                  </p>

                  <p className='text-[13px] text-gray-400 mt-[2px]'>
                    {item.category}
                  </p>

                  <p className='text-[15px] text-[#46d1f7] mt-[4px] font-semibold'>
                    ₹{item.price}
                  </p>

                </div>

                {/* ACTION BUTTONS */}
                <div className='flex gap-3'>

                  {/* EDIT */}
                  <button
                    onClick={() => navigate(`/edit/${item._id}`)}
                    className='px-4 py-2 text-[14px] rounded-md bg-blue-500 hover:bg-blue-600 transition'
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => removeList(item._id)}
                    className='px-4 py-2 text-[14px] rounded-md bg-red-500 hover:bg-red-600 transition'
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className='text-center text-gray-400 mt-[50px]'>
              No products available 🚫
            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default Lists