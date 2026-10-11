import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"

// ================= ADD PRODUCT =================
export const addProduct = async (req,res)=>{

 try {

  const {name,description,price,category,subCategory,sizes,bestseller} = req.body

  const image1 = req.files?.image1 
    ? await uploadOnCloudinary(req.files.image1[0].path) 
    : ""

  const image2 = req.files?.image2 
    ? await uploadOnCloudinary(req.files.image2[0].path) 
    : ""

  const image3 = req.files?.image3 
    ? await uploadOnCloudinary(req.files.image3[0].path) 
    : ""

  const image4 = req.files?.image4 
    ? await uploadOnCloudinary(req.files.image4[0].path) 
    : ""

  const productData = {
    name,
    description,
    price:Number(price),
    category,
    subCategory,
    sizes: sizes ? JSON.parse(sizes) : [],
    bestseller: bestseller === "true",
    image1,
    image2,
    image3,
    image4,
    date: Date.now()
  }

  const product = await Product.create(productData)

  res.status(201).json({
    success:true,
    message:"Product Added Successfully",
    product
  })

 } catch (error) {

  console.log("AddProduct error:",error)

  res.status(500).json({
    success:false,
    message:error.message
  })

 }

}

// ================= GET SINGLE PRODUCT =================
export const getSingleProduct = async (req, res) => {
  try {

    const { id } = req.params

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({
        success:false,
        message:"Product not found"
      })
    }

    res.status(200).json({
      success:true,
      product
    })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
  try {

    const { id } = req.body

    const { name, description, price, category, subCategory, sizes, bestseller } = req.body

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({
        success:false,
        message:"Product not found"
      })
    }

    // Upload new images if provided
    const image1 = req.files?.image1 
      ? await uploadOnCloudinary(req.files.image1[0].path) 
      : product.image1

    const image2 = req.files?.image2 
      ? await uploadOnCloudinary(req.files.image2[0].path) 
      : product.image2

    const image3 = req.files?.image3 
      ? await uploadOnCloudinary(req.files.image3[0].path) 
      : product.image3

    const image4 = req.files?.image4 
      ? await uploadOnCloudinary(req.files.image4[0].path) 
      : product.image4

    const updatedData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestseller: bestseller === "true",
      image1,
      image2,
      image3,
      image4
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    )

    res.status(200).json({
      success:true,
      message:"Product Updated Successfully",
      product: updatedProduct
    })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


// ================= LIST PRODUCTS =================
export const listProduct = async (req,res)=>{
 try {

  const products = await Product.find({})

  res.status(200).json({
    success:true,
    products
  })

 } catch (error) {

  console.log("ListProduct error:",error)

  res.status(500).json({
    success:false,
    message:error.message
  })
 }
}


// ================= REMOVE PRODUCT =================
export const removeProduct = async (req,res)=>{
 try {

  const {id} = req.params

  const product = await Product.findByIdAndDelete(id)

  res.status(200).json({
    success:true,
    message:"Product removed",
    product
  })

 } catch (error) {

  console.log("RemoveProduct error:",error)

  res.status(500).json({
    success:false,
    message:error.message
  })
 }
}