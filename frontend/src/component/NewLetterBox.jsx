import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

function NewLetterBox() {

  const [email,setEmail] = useState("")
  const [success,setSuccess] = useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault()

    setSuccess(true)

    setTimeout(()=>{
      setSuccess(false)
      setEmail("")
    },3000)
  }

  return (

<div className="w-full py-20 bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center gap-4 relative">

{/* Title */}

<p className="md:text-[32px] text-[22px] text-cyan-300 font-semibold text-center px-5">
Subscribe now & get 20% off
</p>

<p className="md:text-[18px] text-[14px] text-center text-blue-100 max-w-[700px] px-5">
Subscribe now and enjoy exclusive savings, special deals,
and early access to new collections.
</p>

{/* Form */}

<form
onSubmit={handleSubmit}
className="flex items-center justify-center mt-6 gap-4 flex-wrap"
>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Enter Your Email"
className="bg-gray-200 text-black w-[400px] max-w-[80%] h-[45px] px-5 rounded-lg outline-none
focus:ring-2 focus:ring-cyan-400 transition duration-300"
/>

<button
type="submit"
className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600
transition duration-300 shadow-lg hover:scale-105 active:scale-95 text-white font-medium"
>
Subscribe
</button>

</form>

{/* Success Popup */}

{success && (

<div className="absolute bottom-6 bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-3 shadow-lg animate-bounce">

<FaCheckCircle/>
Subscribed Successfully!

</div>

)}

</div>

  )
}

export default NewLetterBox