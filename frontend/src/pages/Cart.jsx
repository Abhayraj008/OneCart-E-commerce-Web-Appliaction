import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../component/CartTotal";
import CartItemSkeleton from "../component/CartItemSkeleton";

function Cart() {

const { products, currency, cartItem, updateQuantity } =
useContext(shopDataContext);

const navigate = useNavigate();
const [cartData,setCartData] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

const tempData = [];

for(const items in cartItem){

for(const item in cartItem[items]){

if(cartItem[items][item] > 0){

tempData.push({
_id: items,
size: item,
quantity: cartItem[items][item]
})

}

}

}

setCartData(tempData)

setTimeout(()=>{
setLoading(false)
},800)

},[cartItem])

return (

<div className="min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white px-6 py-20">

<div className="max-w-[1200px] mx-auto">

{/* Back Button */}

<button
onClick={()=>navigate(-1)}
className="flex items-center gap-2 mb-10 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
>
<IoArrowBack/>
Back
</button>

<h2 className="text-3xl text-center mb-12 font-semibold">
Your Cart
</h2>

{/* Empty Cart */}

{!loading && cartData.length === 0 && (

<div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn">

<img
src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
className="w-32 mb-6"
/>

<p className="text-lg mb-4 text-gray-300">
Your cart is empty
</p>

<button
onClick={()=>navigate("/collection")}
className="bg-cyan-500 px-6 py-3 rounded-lg hover:bg-cyan-600 transition"
>
Continue Shopping
</button>

</div>

)}

<div className="flex flex-col lg:flex-row gap-10">

{/* Cart Items */}

<div className="flex-1 space-y-6">

{loading && <CartItemSkeleton/>}

{!loading && cartData.map((item,index)=>{

const productData =
products.find(p=>p._id === item._id)

if(!productData) return null

return(

<div
key={index}
className="flex justify-between items-center p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md"
>

<div className="flex gap-6 items-center">

<img
src={productData.image1}
className="w-[90px] rounded-lg"
/>

<div>

<p className="text-lg font-semibold">
{productData.name}
</p>

<p className="text-cyan-300">
{currency} {productData.price}
</p>

<p className="text-sm text-gray-400">
Size: {item.size}
</p>

<p className="text-sm text-gray-300 mt-1">
Subtotal:
{currency} {productData.price * item.quantity}
</p>

</div>

</div>

{/* Quantity Controls */}

<div className="flex items-center gap-4">

<button
onClick={()=>updateQuantity(
item._id,
item.size,
item.quantity - 1
)}
className="bg-white/10 px-3 py-1 rounded hover:bg-white/20"
>
-
</button>

<span className="w-6 text-center">
{item.quantity}
</span>

<button
onClick={()=>updateQuantity(
item._id,
item.size,
item.quantity + 1
)}
className="bg-white/10 px-3 py-1 rounded hover:bg-white/20"
>
+
</button>

</div>

{/* Delete */}

<button
onClick={()=>updateQuantity(item._id,item.size,0)}
className="text-red-400 hover:text-red-500 text-xl"
>
<RiDeleteBin6Line/>
</button>

</div>

)

})}

</div>

{/* Sticky Cart Summary */}

<div className="lg:w-[350px] sticky top-28 h-fit">

<CartTotal/>

</div>

</div>

</div>

</div>

)

}

export default Cart