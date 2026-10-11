export const getReviews = async (productId) => {

  const res = await fetch(`http://localhost:6000/api/review/${productId}`);

  const data = await res.json();

  return data;

};


export const addReview = async (reviewData) => {

  const res = await fetch(`http://localhost:6000/api/review/add`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(reviewData),

  });

  const data = await res.json();

  return data;

};