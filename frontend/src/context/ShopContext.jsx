import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";
import { userDataContext } from "./UserContext";
import { toast } from "react-toastify";

export const shopDataContext = createContext();

function ShopContext({ children }) {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const currency = "₹";
  const delivery_fee = 40;

  // =============================
  // GET PRODUCTS
  // =============================
 console.log("cartItem:", cartItem)
  const getProducts = async () => {
    try {

      const result = await axios.get(serverUrl + "/api/product/list");

      if (Array.isArray(result.data)) {
        setProducts(result.data);
      }
      else if (Array.isArray(result.data.products)) {
        setProducts(result.data.products);
      }
      else {
        setProducts([]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // =============================
  // ADD TO CART
  // =============================

  const addtoCart = async (itemId, size) => {

    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {

      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      }
      else {
        cartData[itemId][size] = 1;
      }

    } else {

      cartData[itemId] = {};
      cartData[itemId][size] = 1;

    }

    setCartItem(cartData);

    if (userData) {

      setLoading(true);

      try {

        await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );

        toast.success("Product Added");

      } catch (error) {

        console.log(error);
        toast.error("Add Cart Error");

      }

      setLoading(false);

    }
  };

  // =============================
  // GET USER CART
  // =============================

 const getUserCart = async () => {

try {

const result = await axios.post(
serverUrl + "/api/cart/get",
{},
{ withCredentials: true }
);

if (result.data) {

let cleanedCart = {};

for (const product in result.data) {

for (const size in result.data[product]) {

const qty = result.data[product][size];

if (qty > 0) {

if (!cleanedCart[product]) {
cleanedCart[product] = {};
}

cleanedCart[product][size] = qty;

}

}

}

setCartItem(cleanedCart);

} else {
setCartItem({});
}

} catch (error) {
console.log(error);
}

};

  // =============================
  // UPDATE CART
  // =============================

  const updateQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItem);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    setCartItem(cartData);

    if (userData) {

      try {

        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true }
        );

      } catch (error) {

        console.log(error);

      }

    }

  };

  // =============================
  // CART COUNT (BUG FIXED)
  // =============================

 const getCartCount = () => {

let total = 0;

for (const product in cartItem) {

for (const size in cartItem[product]) {

const qty = cartItem[product][size];

if (qty > 0) {
total += qty;
}

}

}

return total;
};

  // =============================
  // CART TOTAL AMOUNT
  // =============================

  const getCartAmount = () => {

    let totalAmount = 0;

    for (const productId in cartItem) {

      const product = products.find(
        p => p._id.toString() === productId.toString()
      );

      if (!product) continue;

      const sizes = cartItem[productId];

      for (const size in sizes) {

        const quantity = sizes[size];

        if (quantity > 0) {
          totalAmount += product.price * quantity;
        }

      }

    }

    return totalAmount;

  };

  // =============================
  // LOAD PRODUCTS
  // =============================

  useEffect(() => {
    getProducts();
  }, []);

  // =============================
  // LOAD USER CART AFTER LOGIN
  // =============================

  useEffect(() => {

    if (userData) {
      getUserCart();
    }

  }, [userData]);

  // =============================
  // CONTEXT VALUE
  // =============================
console.log("🛒 CART STATE:", cartItem)
  const value = {

    products,
    currency,
    delivery_fee,

    search,
    setSearch,

    showSearch,
    setShowSearch,

    cartItem,
    setCartItem,

    addtoCart,
    updateQuantity,

    getCartCount,
    getCartAmount,

    loading

  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;