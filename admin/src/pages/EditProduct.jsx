import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'

function EditProduct() {

  const { id } = useParams()
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)

  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("TopWear")

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [preview1, setPreview1] = useState("")
  const [preview2, setPreview2] = useState("")
  const [preview3, setPreview3] = useState("")
  const [preview4, setPreview4] = useState("")

  // ================= FETCH PRODUCT =================
  const fetchProduct = async () => {
    try {

      const res = await axios.get(`${serverUrl}/api/product/single/${id}`)

      const data = res.data.product || res.data

      setName(data.name || "")
      setDescription(data.description || "")
      setPrice(data.price || "")
      setCategory(data.category || "Men")
      setSubCategory(data.subCategory || "TopWear")

      setPreview1(data.image1 || "")
      setPreview2(data.image2 || "")
      setPreview3(data.image3 || "")
      setPreview4(data.image4 || "")

    } catch (error) {
      console.log("FETCH ERROR:", error)
    }
  }

  // ================= UPDATE PRODUCT =================
  const updateProduct = async (e) => {
    e.preventDefault()

    try {

      setLoading(true)

      const formData = new FormData()

      formData.append("id", id)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)

      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)

      await axios.post(
        `${serverUrl}/api/product/update`,
        formData,
        { withCredentials: true }
      )

      alert("Product Updated Successfully ✅")

      navigate('/lists')

    } catch (error) {
      console.log("UPDATE ERROR:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>

      <Nav />
      <Sidebar />

      {/* MAIN */}
      <div className='ml-[240px] pt-[90px] px-[30px] flex justify-center'>

        <form
          onSubmit={updateProduct}
          className='w-full max-w-[900px] bg-[#1a1a1a] p-[30px] rounded-xl border border-gray-700 flex flex-col gap-[25px]'
        >

          <h1 className='text-[28px] font-semibold text-[#afe2f2]'>
            Edit Product
          </h1>

          {/* IMAGES */}
          <div>
            <p className='text-[16px] mb-2'>Update Images</p>

            <div className='flex gap-4 flex-wrap'>

              {[preview1, preview2, preview3, preview4].map((img, i) => (
                <label key={i} className='w-[80px] h-[80px] cursor-pointer'>
                  <img
                    src={img}
                    className='w-full h-full object-cover rounded-lg border border-gray-600'
                  />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0]
                      const setters = [setImage1, setImage2, setImage3, setImage4]
                      const previewSetters = [setPreview1, setPreview2, setPreview3, setPreview4]

                      setters[i](file)
                      previewSetters[i](URL.createObjectURL(file))
                    }}
                  />
                </label>
              ))}

            </div>
          </div>

          {/* NAME */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Product Name'
            className='h-[45px] px-4 bg-[#2a2a2a] border border-gray-600 rounded-lg'
          />

          {/* DESCRIPTION */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            className='h-[100px] px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg'
          />

          {/* CATEGORY */}
          <div className='grid grid-cols-2 gap-4'>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='h-[40px] bg-[#2a2a2a] border border-gray-600 rounded-lg px-2'
            >
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>

            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className='h-[40px] bg-[#2a2a2a] border border-gray-600 rounded-lg px-2'
            >
              <option>TopWear</option>
              <option>BottomWear</option>
              <option>WinterWear</option>
            </select>

          </div>

          {/* PRICE */}
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price'
            className='h-[45px] px-4 bg-[#2a2a2a] border border-gray-600 rounded-lg'
          />

          {/* BUTTON */}
          <button
            type="submit"
            className='py-[12px] bg-blue-500 rounded-lg hover:bg-blue-600 transition'
          >
            {loading ? "Updating..." : "Update Product"}
          </button>

        </form>

      </div>
    </div>
  )
}

export default EditProduct