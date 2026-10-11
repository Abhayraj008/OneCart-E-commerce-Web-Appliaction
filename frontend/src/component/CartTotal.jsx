import React, { useContext, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import Title from "./Title";

function CartTotal() {

const { currency, delivery_fee, getCartAmount } =
useContext(shopDataContext)

const navigate = useNavigate()

const [coupon,setCoupon] = useState("")

const cartAmount = getCartAmount()

const total =
cartAmount === 0
? 0
: cartAmount + delivery_fee

return (

<div className="w-full lg:ml-[30px]">

{/* Title */}

<div className="text-xl py-[10px]">
<Title text1={"CART"} text2={"TOTALS"} />
</div>

{/* Summary Card */}

<div className="bg-white text-black p-8 rounded-xl shadow-xl mt-4">

{/* Price Details */}

<div className="space-y-4 text-[15px]">

<div className="flex justify-between border-b pb-3">
<span className="text-gray-600">
Subtotal
</span>

<span className="font-medium">
{currency} {cartAmount.toFixed(2)}
</span>
</div>

<div className="flex justify-between border-b pb-3">
<span className="text-gray-600">
Shipping Fee
</span>

<span className="font-medium">
{currency} {delivery_fee}
</span>
</div>

<div className="flex justify-between text-lg font-semibold pt-2">
<span>Total</span>

<span className="text-green-600">
{currency} {total.toFixed(2)}
</span>
</div>

</div>

{/* Coupon Section */}

<div className="mt-6">

<input
type="text"
placeholder="Enter Coupon Code"
value={coupon}
onChange={(e)=>setCoupon(e.target.value)}
className="w-full border px-4 py-2 rounded mb-3 outline-none focus:ring-2 focus:ring-cyan-400"
/>

<button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
Apply Coupon
</button>

</div>

{/* Checkout Button */}

<button
onClick={()=>navigate("/placeorder")}
className="w-full mt-6 bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition shadow-lg"
>
Proceed to Checkout
</button>

</div>

</div>

)

}

export default CartTotal