import React from "react";
import Title from "../component/Title";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

function Support(){

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
<Title text1={"CUSTOMER"} text2={"SUPPORT"} />
<p className="text-gray-300 mt-3">
We are always here to help you.
</p>
</div>

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-[#1c2f33] p-8 rounded-xl text-center">
<MdEmail className="text-4xl text-cyan-400 mx-auto mb-4"/>
<h3 className="font-semibold text-lg">Email Support</h3>
<p className="text-gray-400 text-sm mt-2">
support@onecart.com
</p>
</div>

<div className="bg-[#1c2f33] p-8 rounded-xl text-center">
<FaPhoneAlt className="text-4xl text-cyan-400 mx-auto mb-4"/>
<h3 className="font-semibold text-lg">Call Us</h3>
<p className="text-gray-400 text-sm mt-2">
+91 8012888884
</p>
</div>

<div className="bg-[#1c2f33] p-8 rounded-xl text-center">
<BiSupport className="text-4xl text-cyan-400 mx-auto mb-4"/>
<h3 className="font-semibold text-lg">Working Hours</h3>
<p className="text-gray-400 text-sm mt-2">
9:00 AM – 8:00 PM
</p>
</div>

</div>

</div>

<div className="mt-24 border-t border-gray-700 pt-10">
<Footer/>
</div>

</div>

)

}

export default Support