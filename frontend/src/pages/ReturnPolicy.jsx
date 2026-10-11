import React from "react";
import Title from "../component/Title";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";

function ReturnPolicy() {

const navigate = useNavigate();

return (

<div className="bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">

<div className="max-w-[1100px] mx-auto px-6 py-20">

{/* Back Button */}
<button
onClick={() => navigate(-1)}
className="flex items-center gap-3 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 px-5 py-2 rounded-full transition duration-300 shadow-lg mb-12"
>
<IoArrowBack className="text-xl"/>
Back
</button>

{/* Title */}
<div className="text-center mb-16">
<Title text1={"RETURN"} text2={"POLICY"} />
<p className="text-gray-300 mt-3">
Shop with confidence with our 7-day easy return guarantee.
</p>
</div>

{/* Highlight Cards */}
<div className="grid md:grid-cols-3 gap-6 mb-16">

<div className="bg-[#1c2f33] p-6 rounded-xl text-center">
<TbRosetteDiscountCheckFilled className="text-cyan-400 text-4xl mx-auto mb-3"/>
<h3 className="text-lg font-semibold">7 Day Return</h3>
<p className="text-gray-400 text-sm">
Return products within 7 days of delivery.
</p>
</div>

<div className="bg-[#1c2f33] p-6 rounded-xl text-center">
<FaBoxOpen className="text-cyan-400 text-4xl mx-auto mb-3"/>
<h3 className="text-lg font-semibold">Original Condition</h3>
<p className="text-gray-400 text-sm">
Items must be unused with original packaging.
</p>
</div>

<div className="bg-[#1c2f33] p-6 rounded-xl text-center">
<MdOutlineAssignmentReturn className="text-cyan-400 text-4xl mx-auto mb-3"/>
<h3 className="text-lg font-semibold">Fast Refund</h3>
<p className="text-gray-400 text-sm">
Refund processed within 3-5 working days.
</p>
</div>

</div>

{/* Return Process */}
<div className="bg-[#1c2f33] p-10 rounded-xl shadow-lg">

<h2 className="text-2xl font-semibold mb-6 text-cyan-300">
How Returns Work
</h2>

<ol className="list-decimal ml-6 space-y-4 text-gray-300 leading-7">

<li>Login to your account and open your orders.</li>
<li>Select the product you want to return.</li>
<li>Choose refund or replacement option.</li>
<li>Pack the item securely with original packaging.</li>
<li>Our courier partner will collect the product.</li>

</ol>

<h3 className="text-xl font-semibold mt-10 mb-4 text-cyan-300">
Return Conditions
</h3>

<ul className="list-disc ml-6 space-y-3 text-gray-300">

<li>Item must be unused and undamaged.</li>
<li>Original tags and packaging required.</li>
<li>Return request within 7 days.</li>
<li>Refunds processed after quality check.</li>

</ul>

</div>

</div>

{/* Footer */}
<div className="mt-24 border-t border-gray-700 pt-10">
<Footer/>
</div>

</div>

)

}

export default ReturnPolicy