import { client } from "./client";

const ProductsApi = {
    createProducts: (data) => client.post(`/products/create`, data),
    updateProducts: (data, id) => client.post(`/products/update?id=${id}`, data),
    listProducts: () => client.get(`/products/list`),
    productDetail: (id) => client.get(`/products/detail?productId=${id}`),
    deleteProducts: (id) => client.delete(`/products/delete?id=${id}`),
};

export default ProductsApi;