/* /reviews/create */
/* /reviews/list */

import { client } from "./client";

const ReviewApi = {
  postReview: ({productId, review}) => client.post(`/reviews/create`, {productId: productId, review: review}),
  getProductReviews: (prodid) => client.get(`/reviews/list?productId=${prodid}`),
};

export default ReviewApi;
