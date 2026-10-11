import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct";
import ReviewSection from "../component/ReviewSection";
import Loading from "../component/Loading";

function ProductDetail() {

  const { productId } = useParams();
  const { products, currency, addtoCart, loading } = useContext(shopDataContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [tab, setTab] = useState("description");

  // fetch product
  useEffect(() => {

    const product = products.find((item) => item._id === productId);

    if (product) {
      setProductData(product);
      setImage(product.image1);
    }

  }, [productId, products]);


  // loading fallback
  if (!productData) {
    return (
      <div className="text-white pt-[120px] text-center">
        Loading Product...
      </div>
    );
  }


  const images = [
    productData.image1,
    productData.image2,
    productData.image3,
    productData.image4,
  ].filter(Boolean);


  return (

<div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">

{/* PRODUCT SECTION */}

<div className="max-w-[1300px] mx-auto pt-[90px] px-[20px] grid lg:grid-cols-2 gap-[50px]">


{/* IMAGE SECTION */}

<div className="flex gap-[15px]">


{/* THUMBNAILS */}

<div className="flex flex-col gap-[12px]">

{images.map((img,i)=>(
<img
key={i}
src={img}
onClick={()=>setImage(img)}
className={`w-[75px] h-[85px] object-cover rounded border cursor-pointer
${image===img ? "border-[#46d1f7]" : "border-gray-600"}
hover:scale-105 transition`}
/>
))}

</div>


{/* MAIN IMAGE */}

<div className="flex-1 border border-gray-600 rounded-lg overflow-hidden bg-black">

<img
src={image || productData.image1}
className="w-full h-[480px] object-contain hover:scale-105 transition duration-300"
/>

</div>

</div>



{/* PRODUCT INFO */}

<div className="flex flex-col gap-[16px]">

<h1 className="text-[30px] font-semibold">
{productData.name}
</h1>


{/* RATING */}

<div className="flex items-center gap-1">

<FaStar className="text-yellow-400"/>
<FaStar className="text-yellow-400"/>
<FaStar className="text-yellow-400"/>
<FaStar className="text-yellow-400"/>
<FaStarHalfAlt className="text-yellow-400"/>

<span className="text-gray-400 ml-2">(124 reviews)</span>

</div>


{/* PRICE */}

<p className="text-[32px] font-bold text-[#46d1f7]">
{currency} {productData.price}
</p>


{/* DESCRIPTION */}

<p className="text-gray-300 leading-[28px] text-[15px]">
{productData.description}
</p>


{/* SIZE */}

<div>

<p className="font-semibold mb-2">Select Size</p>

<div className="flex gap-[10px] flex-wrap">

{productData.sizes.map((item,index)=>(

<button
key={index}
onClick={()=>setSize(item)}
className={`px-5 py-2 border rounded transition

${size===item
?"bg-[#46d1f7] text-black border-[#46d1f7]"
:"border-gray-500 hover:border-[#46d1f7]"
}

`}
>
{item}
</button>

))}

</div>

</div>


{/* ADD TO CART */}

<button
onClick={()=>addtoCart(productData._id,size)}
className="w-[220px] bg-[#46d1f7] text-black py-3 rounded-lg font-semibold hover:bg-[#2cc3ec] transition mt-[8px]"
>

{loading ? <Loading/> : "Add To Cart"}

</button>


{/* PRODUCT INFO */}

<div className="border-t border-gray-600 pt-[20px] mt-[20px] text-gray-300 text-[14px] leading-[28px]">

<p>✔ 100% Original Product</p>
<p>✔ Cash on delivery available</p>
<p>✔ Easy return & exchange within 7 days</p>

</div>

</div>

</div>



{/* DESCRIPTION + REVIEW TABS */}

<div className="max-w-[1200px] mx-auto mt-[70px] px-[20px]">

<div className="flex gap-[10px]">

<button
onClick={()=>setTab("description")}
className={`px-6 py-3 border
${tab==="description"
?"bg-[#46d1f7] text-black border-[#46d1f7]"
:"border-gray-600"}`}
>
Description
</button>

<button
onClick={()=>setTab("reviews")}
className={`px-6 py-3 border
${tab==="reviews"
?"bg-[#46d1f7] text-black border-[#46d1f7]"
:"border-gray-600"}`}
>
Reviews
</button>

</div>


<div className="border border-gray-600 mt-[10px] p-[30px] text-gray-300 leading-[28px]">

{tab==="description" && (

<p>

Upgrade your wardrobe with this stylish cotton shirt.
Designed for comfort and durability, it provides a perfect
blend of fashion and everyday wear.

</p>

)}

{tab==="reviews" && (

<ReviewSection productId={productData._id}/>

)}

</div>

</div>



{/* RELATED PRODUCTS */}

<div className="mt-[80px]">

<RelatedProduct
category={productData.category}
subCategory={productData.subCategory}
currentProductId={productData._id}
/>

</div>

</div>

  );
}

export default ProductDetail;