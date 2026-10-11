import React, { useContext, useState, useMemo } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import razorpay from "../assets/Razorpay.jpg";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function PlaceOrder() {
    console.log("KEY:", import.meta.env.VITE_RAZORPAY_KEY_ID);

  const navigate = useNavigate();

  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);

  const { serverUrl } = useContext(authDataContext);

  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: ""
  });

  const productMap = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(p._id, p));
    return map;
  }, [products]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.phone || !formData.street) {
      toast.error("Please fill all required fields");
      return false;
    }
    return true;
  };

  // 🔥 NEW: Razorpay function
  const loadRazorpay = async (order) => {

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "My Shop",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response) {
        await axios.post(
          serverUrl + "/api/order/verifyrazorpay",
          { razorpay_order_id: response.razorpay_order_id },
          { withCredentials: true }
        );

        toast.success("Payment Successful 🎉");
        setCartItem({});
        navigate("/order");
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      let orderItems = [];

      Object.keys(cartItem).forEach((productId) => {
        Object.keys(cartItem[productId]).forEach((size) => {

          const quantity = cartItem[productId][size];

          if (quantity > 0) {
            const product = productMap.get(productId);

            if (product) {
              orderItems.push({
                ...product,
                size,
                quantity
              });
            }
          }
        });
      });

      if (orderItems.length === 0) {
        toast.error("Cart is empty");
        setLoading(false);
        return;
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method
      };

      // 🔥 FIX: condition based API
      if (method === "cod") {

        const result = await axios.post(
          serverUrl + "/api/order/placeorder",
          orderData,
          { withCredentials: true }
        );

        if (result.data) {
          setCartItem({});
          toast.success("Order Placed Successfully 🚀");
          navigate("/order");
        }

      } else {

        const result = await axios.post(
        serverUrl + "/api/order/razorpay",
          orderData,
          { withCredentials: true }
        );

        console.log("RAZORPAY ORDER:", result.data);

        await loadRazorpay(result.data);
      }

    } catch (error) {
        console.log(serverUrl);
      console.log(error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white px-4 py-16">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

        <form onSubmit={onSubmitHandler} className="space-y-5 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10">

          <Title text1={"DELIVERY"} text2={"INFORMATION"} />

          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" value={formData.firstName} onChange={onChangeHandler}
              placeholder="First Name"
              className="w-full h-12 px-4 rounded-lg bg-slate-800 focus:ring-2 focus:ring-cyan-500 outline-none"
            />

            <input name="lastName" value={formData.lastName} onChange={onChangeHandler}
              placeholder="Last Name"
              className="w-full h-12 px-4 rounded-lg bg-slate-800 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          <input name="email" value={formData.email} onChange={onChangeHandler}
            placeholder="Email"
            className="w-full h-12 px-4 rounded-lg bg-slate-800 outline-none"
          />

          <input name="street" value={formData.street} onChange={onChangeHandler}
            placeholder="Street"
            className="w-full h-12 px-4 rounded-lg bg-slate-800 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <input name="city" value={formData.city} onChange={onChangeHandler}
              placeholder="City"
              className="w-full h-12 px-4 rounded-lg bg-slate-800 outline-none"
            />

            <input name="state" value={formData.state} onChange={onChangeHandler}
              placeholder="State"
              className="w-full h-12 px-4 rounded-lg bg-slate-800 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input name="pinCode" value={formData.pinCode} onChange={onChangeHandler}
              placeholder="Pincode"
              className="w-full h-12 px-4 rounded-lg bg-slate-800 outline-none"
            />

            <input name="country" value={formData.country} onChange={onChangeHandler}
              placeholder="Country"
              className="w-full h-12 px-4 rounded-lg bg-slate-800 outline-none"
            />
          </div>

          <input name="phone" value={formData.phone} onChange={onChangeHandler}
            placeholder="Phone"
            className="w-full h-12 px-4 rounded-lg bg-slate-800 outline-none"
          />

          {/* PAYMENT */}
          <div className="mt-8">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

            <div className="flex gap-4 mt-5">

              <button
                type="button"
                onClick={() => setMethod("razorpay")}
                className={`w-36 h-12 bg-white rounded-lg flex items-center justify-center ${
                  method === "razorpay" ? "ring-4 ring-cyan-500" : ""
                }`}
              >
                <img src={razorpay} className="w-full h-full object-contain p-1" />
              </button>

              <button
                type="button"
                onClick={() => setMethod("cod")}
                className={`px-6 h-12 rounded-lg font-semibold ${
                  method === "cod"
                    ? "bg-cyan-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                Cash on Delivery
              </button>

            </div>
          </div>

          <button className="w-full mt-6 bg-cyan-500 py-4 rounded-xl">
            {loading ? <Loading /> : "Place Order 🚀"}
          </button>

        </form>

        <div className="sticky top-24 h-fit bg-white/5 p-6 rounded-2xl">
          <CartTotal />
        </div>

      </div>
    </div>
  );
}

export default PlaceOrder;