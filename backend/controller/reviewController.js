import Review from "../model/reviewModel.js";

// ADD REVIEW
export const addReview = async (req, res) => {
  try {

    const { productId, userName, rating, comment } = req.body;

    const review = new Review({
      productId,
      userName,
      rating,
      comment,
    });

    await review.save();

    res.json({
      success: true,
      message: "Review Added",
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// GET REVIEWS
export const getReviews = async (req, res) => {
  try {

    const { productId } = req.params;

    const reviews = await Review.find({ productId });

    res.json({
      success: true,
      reviews,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};