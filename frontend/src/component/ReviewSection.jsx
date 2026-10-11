import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function ReviewSection({ productId }) {

  const [reviews,setReviews] = useState([])
  const [rating,setRating] = useState(0)
  const [comment,setComment] = useState("")

  const fetchReviews = async()=>{

    const res = await fetch(`http://localhost:6000/api/review/${productId}`)
    const data = await res.json()

    if(data.success){
      setReviews(data.reviews)
    }

  }

  useEffect(()=>{
    fetchReviews()
  },[productId])


  const submitReview = async()=>{

    const res = await fetch("http://localhost:6000/api/review/add",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        productId,
        userName:"Guest",
        rating,
        comment
      })

    })

    const data = await res.json()

    if(data.success){
      fetchReviews()
      setRating(0)
      setComment("")
    }

  }

  return(

<div className="mt-10">

<h2 className="text-xl font-semibold mb-4">
Customer Reviews
</h2>


{/* Rating Input */}

<div className="flex gap-2 mb-3">

{[1,2,3,4,5].map((star)=>(
<FaStar
key={star}
onClick={()=>setRating(star)}
className={`cursor-pointer ${star<=rating ? "text-yellow-400":"text-gray-600"}`}
/>
))}

</div>


<textarea
placeholder="Write review..."
className="w-full p-3 bg-gray-800 rounded"
value={comment}
onChange={(e)=>setComment(e.target.value)}
/>


<button
className="mt-3 bg-[#46d1f7] text-black px-6 py-2 rounded"
onClick={submitReview}
>
Submit Review
</button>


{/* Review List */}

<div className="mt-6">

{reviews.map((r,index)=>(

<div key={index} className="border-b py-4">

<div className="flex gap-1">

{[...Array(r.rating)].map((_,i)=>(
<FaStar key={i} className="text-yellow-400"/>
))}

</div>

<p className="text-gray-300">
{r.comment}
</p>

<p className="text-sm text-gray-400">
{r.userName}
</p>

</div>

))}

</div>

</div>

  )

}

export default ReviewSection