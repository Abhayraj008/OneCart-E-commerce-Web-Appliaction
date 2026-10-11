import React from "react";
import Title from "../component/Title";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { RiExchangeFundsLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";

function ExchangePolicy(){

const navigate = useNavigate()

return(

<div className="bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">

<div className="max-w-[1100px] mx-auto px-6 py-20">

<button
onClick={()=>navigate(-1)}
className="flex items-center gap-3 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 px-5 py-2 rounded-full transition duration-300 shadow-lg mb-12"
>
<IoArrowBack/>
Back
</button>

<div className="text-center mb-16">
<Title text1={"EXCHANGE"} text2={"POLICY"} />
<p className="text-gray-300 mt-3">
Easy and hassle-free product exchange.
</p>
</div>

<div className="bg-[#1c2f33] p-10 rounded-xl shadow-lg">

<div className="flex items-center gap-4 mb-6">
<RiExchangeFundsLine className="text-4xl text-cyan-400"/>
<h2 className="text-2xl font-semibold">Easy Product Exchange</h2>
</div>

<p className="text-gray-300 leading-8 mb-6">
If the product size or item doesn't meet your expectations,
you can request an exchange within the allowed exchange period.
</p>

<h3 className="text-xl mb-4 text-cyan-300 font-semibold">
Exchange Guidelines
</h3>

<ul className="space-y-3 text-gray-300">

<li className="flex gap-3"><FaCheckCircle className="text-cyan-400"/>Exchange request within 7 days</li>
<li className="flex gap-3"><FaCheckCircle className="text-cyan-400"/>Unused product only</li>
<li className="flex gap-3"><FaCheckCircle className="text-cyan-400"/>Original packaging required</li>
<li className="flex gap-3"><FaCheckCircle className="text-cyan-400"/>Exchange depends on availability</li>

</ul>

</div>

</div>

<div className="mt-24 border-t border-gray-700 pt-10">
<Footer/>
</div>

</div>

)

}

export default ExchangePolicy