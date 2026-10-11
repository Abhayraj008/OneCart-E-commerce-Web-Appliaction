import User from "../model/userModel.js";

export const addToCart = async (req, res) => {
  try {

    const { itemId, size } = req.body;

    const userData = await User.findById(req.userId);

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await User.findByIdAndUpdate(req.userId, { cartData });

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};


export const UpdateCart = async (req, res) => {
  try {

    const { itemId, size, quantity } = req.body;

    const userData = await User.findById(req.userId);

    let cartData = userData.cartData || {};

    if (quantity <= 0) {

      if (cartData[itemId]) {

        delete cartData[itemId][size];

        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }

      }

    } else {

      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      cartData[itemId][size] = quantity;

    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};


export const getUserCart = async (req, res) => {
  try {

    const userData = await User.findById(req.userId);

    const cartData = userData.cartData || {};

    res.json(cartData);

  } catch (error) {
    console.log(error);
    res.json({});
  }
};