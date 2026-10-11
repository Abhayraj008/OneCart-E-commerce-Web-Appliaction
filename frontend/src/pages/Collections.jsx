import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {

    const [showFilter,setShowFilter] = useState(false)

    const {products,search,showSearch} = useContext(shopDataContext)

    const [filterProduct,setFilterProduct] = useState([])
    const [category,setCategory] = useState([])
    const [subCategory,setSubCategory] = useState([])
    const [sortType,setSortType] = useState("relavent")



    const toggleCategory = (e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setCategory(prev => [...prev,e.target.value])
        }
    }



    const toggleSubCategory = (e)=>{
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setSubCategory(prev => [...prev,e.target.value])
        }
    }



    const applyFilter = ()=>{

        let productCopy = [...products]

        if(showSearch && search){
            productCopy = productCopy.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        if(category.length > 0){
            productCopy = productCopy.filter(item =>
                category.includes(item.category)
            )
        }

        if(subCategory.length > 0){
            productCopy = productCopy.filter(item =>
                subCategory.includes(item.subCategory)
            )
        }

        setFilterProduct(productCopy)

    }



    const sortProducts = ()=>{

        let sortedProducts = [...filterProduct]

        switch(sortType){

            case "low-high":
                sortedProducts.sort((a,b)=>a.price-b.price)
                break

            case "high-low":
                sortedProducts.sort((a,b)=>b.price-a.price)
                break

            default:
                applyFilter()
                return
        }

        setFilterProduct(sortedProducts)

    }



    useEffect(()=>{
        setFilterProduct(products)
    },[products])


    useEffect(()=>{
        applyFilter()
    },[category,subCategory,search,showSearch])


    useEffect(()=>{
        sortProducts()
    },[sortType])



  return (

<div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[80px] pb-[120px] text-[#aaf5fa]'>



{/* SIDEBAR */}

<div className='md:w-[260px] w-full md:min-h-screen border-r border-gray-400 p-6'>

<p
className='text-[22px] font-semibold flex items-center gap-2 cursor-pointer md:cursor-default'
onClick={()=>setShowFilter(prev=>!prev)}
>

FILTERS

{!showFilter && <FaChevronRight className='md:hidden'/>}
{showFilter && <FaChevronDown className='md:hidden'/>}

</p>



<div className={`${showFilter ? "block":"hidden"} md:block`}>

<div className='bg-slate-600 p-4 rounded-lg mt-6 border border-gray-300'>

<p className='text-[17px] text-white mb-3'>CATEGORIES</p>

<label className='flex gap-2 mb-2'>
<input type="checkbox" value="Men" onChange={toggleCategory}/>
Men
</label>

<label className='flex gap-2 mb-2'>
<input type="checkbox" value="Women" onChange={toggleCategory}/>
Women
</label>

<label className='flex gap-2'>
<input type="checkbox" value="Kids" onChange={toggleCategory}/>
Kids
</label>

</div>



<div className='bg-slate-600 p-4 rounded-lg mt-6 border border-gray-300'>

<p className='text-[17px] text-white mb-3'>SUB-CATEGORIES</p>

<label className='flex gap-2 mb-2'>
<input type="checkbox" value="TopWear" onChange={toggleSubCategory}/>
TopWear
</label>

<label className='flex gap-2 mb-2'>
<input type="checkbox" value="BottomWear" onChange={toggleSubCategory}/>
BottomWear
</label>

<label className='flex gap-2'>
<input type="checkbox" value="WinterWear" onChange={toggleSubCategory}/>
WinterWear
</label>

</div>

</div>

</div>



{/* PRODUCT SECTION */}

<div className='flex-1 px-[30px]'>



<div className='flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 mb-8'>

<Title text1={"ALL"} text2={"COLLECTIONS"} />

<select
className='bg-slate-600 text-white px-4 py-2 rounded-lg border border-gray-400 hover:border-[#46d1f7]'
onChange={(e)=>setSortType(e.target.value)}
>

<option value="relavent">Sort By: Relevant</option>
<option value="low-high">Sort By: Low to High</option>
<option value="high-low">Sort By: High to Low</option>

</select>

</div>



<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>

{

filterProduct.map((item,index)=>(

<Card
key={index}
id={item._id}
name={item.name}
price={item.price}
image={item.image1}
/>

))

}

</div>

</div>

</div>

  )
}

export default Collections