import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { shopDataContext } from "../context/ShopContext";

function Nav() {

const { userData } = useContext(userDataContext);
const { serverUrl } = useContext(authDataContext);
const { showSearch,setShowSearch,search,setSearch,getCartCount }
= useContext(shopDataContext);

const [showProfile,setShowProfile] = useState(false);

const navigate = useNavigate();

const cartCount = getCartCount();

const handleLogout = async () => {

try {

await axios.get(serverUrl + "/api/auth/logout",
{withCredentials:true});

navigate("/login");

}catch(error){
console.log(error)
}

};

return (

<div className="w-full h-[70px] bg-white fixed top-0 z-50 flex items-center justify-between px-6 shadow-md">

{/* LOGO */}

<div
className="flex items-center gap-2 cursor-pointer"
onClick={()=>navigate("/")}>
<img src={logo} className="w-[32px]" />
<h1 className="text-[22px] font-semibold">
OneCart
</h1>
</div>

{/* NAV LINKS */}

<ul className="hidden md:flex items-center gap-10 text-[17px] font-semibold">

<li
className="cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 transition"
onClick={()=>navigate("/")}>
Home
</li>

<li
className="cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 transition"
onClick={()=>navigate("/collection")}>
Collections
</li>

<li
className="cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 transition"
onClick={()=>navigate("/about")}>
About
</li>

<li
className="cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 transition"
onClick={()=>navigate("/contact")}>
Contact
</li>

</ul>

{/* RIGHT SIDE */}

<div className="flex items-center gap-6 relative">

{/* SEARCH */}

<IoSearchOutline
className="w-[26px] h-[26px] cursor-pointer hover:text-cyan-500 transition"
onClick={()=>{
setShowSearch(!showSearch);
navigate("/collection");
}}
/>

{/* USER */}

{!userData && (
<FaCircleUser
className="w-[24px] h-[24px] cursor-pointer"
onClick={()=>setShowProfile(!showProfile)}
/>
)}

{userData && (
<div
className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center cursor-pointer"
onClick={()=>setShowProfile(!showProfile)}
>
{userData?.name?.slice(0,1)}
</div>
)}

{/* CART */}

<div
className="relative cursor-pointer"
onClick={()=>navigate("/cart")}
>

<MdOutlineShoppingCart className="w-[28px] h-[28px]" />

{getCartCount() > 0 && (

<span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] w-[18px] h-[18px] flex items-center justify-center rounded-full">

{getCartCount()}

</span>

)}

</div>

</div>

{/* SEARCH BAR */}

{showSearch && (

<div className="absolute top-[70px] left-0 w-full bg-gray-100 py-4 flex justify-center">

<input
type="text"
placeholder="Search products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-[60%] px-6 py-3 rounded-full border outline-none"
/>

</div>

)}

{/* PROFILE DROPDOWN */}

{showProfile && (

<div className="absolute right-6 top-[70px] w-[200px] bg-white shadow-lg rounded-md overflow-hidden">

<ul className="text-[15px]">

{!userData && (
<li
className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
onClick={()=>navigate("/login")}
>
Login
</li>
)}

{userData && (
<li
className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
onClick={handleLogout}
>
Logout
</li>
)}

<li
className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
onClick={()=>navigate("/order")}
>
Orders
</li>

<li
className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
onClick={()=>navigate("/about")}
>
About
</li>

</ul>

</div>

)}

{/* MOBILE NAV */}

<div className="md:hidden fixed bottom-0 left-0 w-full bg-black text-white flex justify-around py-3">

<button
className="flex flex-col items-center text-xs"
onClick={()=>navigate("/")}>
<IoMdHome className="w-6 h-6"/>
Home
</button>

<button
className="flex flex-col items-center text-xs"
onClick={()=>navigate("/collection")}>
<HiOutlineCollection className="w-6 h-6"/>
Collection
</button>

<button
className="flex flex-col items-center text-xs"
onClick={()=>navigate("/contact")}>
<MdContacts className="w-6 h-6"/>
Contact
</button>

<button
className="flex flex-col items-center text-xs relative"
onClick={()=>navigate("/cart")}
>

<MdOutlineShoppingCart className="w-6 h-6"/>

{cartCount > 0 && (
<span className="absolute -top-1 right-2 bg-red-500 text-[10px] px-1 rounded-full">
{cartCount}
</span>
)}

Cart

</button>

</div>

</div>

);

}

export default Nav;