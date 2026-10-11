import React from "react";

function CartItemSkeleton(){

return(

<div className="animate-pulse space-y-4">

{[1,2,3].map((item)=>(
<div
key={item}
className="h-24 bg-white/10 rounded-lg"
/>
))}

</div>

)

}

export default CartItemSkeleton