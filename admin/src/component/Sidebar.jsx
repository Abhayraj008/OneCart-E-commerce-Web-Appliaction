import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate()

  return (
    <div className='w-[240px] fixed left-0 top-[70px] h-[calc(100vh-70px)] border-r border-gray-700 bg-[#0c2025]'>

     <div className='flex flex-col gap-5 p-[20px] text-[16px] font-medium'>

        {/* ADD ITEMS */}
        <div 
          onClick={() => navigate('/add')}
          className='flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer hover:bg-[#2c7b89] transition'
        >
          <IoIosAddCircleOutline className='text-[20px]'/>
          <p>Add Items</p>
        </div>

        {/* LIST ITEMS */}
        <div 
          onClick={() => navigate('/lists')}
          className='flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer hover:bg-[#2c7b89] transition'
        >
          <FaRegListAlt className='text-[18px]'/>
          <p>List Items</p>
        </div>

        {/* ORDERS */}
        <div 
          onClick={() => navigate('/orders')}
          className='flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer hover:bg-[#2c7b89] transition'
        >
          <SiTicktick className='text-[18px]'/>
          <p>View Orders</p>
        </div>

      </div>

    </div>
  )
}

export default Sidebar