import React, { useContext } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {
  let [image1,setImage1] = useState(false)
  let [image2,setImage2] = useState(false)
  let [image3,setImage3] = useState(false)
  let [image4,setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes,setSizes] = useState([])
  const [loading,setLoading] = useState(false)
  let {serverUrl} = useContext(authDataContext)

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))
      formData.append("image1",image1)
      formData.append("image2",image2)
      formData.append("image3",image3)
      formData.append("image4",image4)

      let result = await axios.post(serverUrl + "/api/product/addproduct" , formData, {withCredentials:true} )

      console.log(result.data)
      toast.success("ADD Product Successfully")
      setLoading(false)

      if(result.data){
          setName("")
      setDescription("")
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setPrice("")
      setBestSeller(false)
      setCategory("Men")
      setSubCategory("TopWear")
      }

      
    } catch (error) {
       console.log(error)
       setLoading(false)
       toast.error("Add Product Failed")
    }

    
  }
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative'>
    <Nav/>
    <Sidebar/>


    <div className='ml-[240px] pt-[90px] px-[30px] flex justify-center'>

  <form 
    onSubmit={handleAddProduct}
    className='w-full max-w-[900px] bg-[#1a1a1a] p-[30px] rounded-xl shadow-lg border border-gray-700 flex flex-col gap-[25px]'
  >

    <h1 className='text-[28px] font-semibold text-[#afe2f2]'>
      Add Product
    </h1>

    {/* IMAGE UPLOAD */}
    <div>
      <p className='text-[18px] font-medium mb-2'>Upload Images</p>

      <div className='flex gap-4 flex-wrap'>
        {[image1, image2, image3, image4].map((img, index) => (
          <label key={index} className='w-[80px] h-[80px] cursor-pointer'>
            <img 
              src={!img ? upload : URL.createObjectURL(img)} 
              className='w-full h-full object-cover rounded-lg border border-gray-600 hover:border-[#46d1f7]'
            />
            <input 
              type="file" 
              hidden 
              onChange={(e) => {
                const setter = [setImage1, setImage2, setImage3, setImage4][index]
                setter(e.target.files[0])
              }}
              required={index === 0}
            />
          </label>
        ))}
      </div>
    </div>

    {/* NAME */}
    <div>
      <p className='text-[16px] mb-1'>Product Name</p>
      <input
        type="text"
        placeholder='Enter product name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full h-[45px] px-4 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:border-[#46d1f7] outline-none'
      />
    </div>

    {/* DESCRIPTION */}
    <div>
      <p className='text-[16px] mb-1'>Product Description</p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full h-[100px] px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:border-[#46d1f7] outline-none'
      />
    </div>

    {/* CATEGORY */}
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <div>
        <p className='text-[16px] mb-1'>Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className='w-full h-[40px] bg-[#2a2a2a] border border-gray-600 rounded-lg px-2'
        >
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>
      </div>

      <div>
        <p className='text-[16px] mb-1'>Sub Category</p>
        <select
          onChange={(e) => setSubCategory(e.target.value)}
          className='w-full h-[40px] bg-[#2a2a2a] border border-gray-600 rounded-lg px-2'
        >
          <option>TopWear</option>
          <option>BottomWear</option>
          <option>WinterWear</option>
        </select>
      </div>
    </div>

    {/* PRICE */}
    <div>
      <p className='text-[16px] mb-1'>Price</p>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className='w-full h-[45px] px-4 rounded-lg bg-[#2a2a2a] border border-gray-600'
      />
    </div>

    {/* SIZES */}
    <div>
      <p className='text-[16px] mb-2'>Sizes</p>
      <div className='flex gap-3 flex-wrap'>
        {["S","M","L","XL","XXL"].map(size => (
          <div
            key={size}
            onClick={() => setSizes(prev =>
              prev.includes(size)
                ? prev.filter(item => item !== size)
                : [...prev, size]
            )}
            className={`px-4 py-2 rounded-md cursor-pointer border ${
              sizes.includes(size)
                ? "bg-[#46d1f7] text-black"
                : "bg-[#2a2a2a] border-gray-600"
            }`}
          >
            {size}
          </div>
        ))}
      </div>
    </div>

    {/* BESTSELLER */}
    <div className='flex items-center gap-3'>
      <input type="checkbox" onChange={() => setBestSeller(prev => !prev)} />
      <p>Add to Bestseller</p>
    </div>

    {/* BUTTON */}
    <button className='w-full py-[12px] rounded-lg bg-[#46d1f7] text-black font-medium hover:bg-[#34b7d6] transition'>
      {loading ? <Loading /> : "Add Product"}
    </button>

  </form>
</div>
    </div>
  )
}

export default Add
