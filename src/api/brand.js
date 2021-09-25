import { client } from "./client";

const BrandsApi = {
    listbrands: () => client.get("/brands/list"),
    createBrand: (data) => client.post("/brands/create", data),
    updateBrand: (data) => client.post("/brands/update", data),
    deleteBrand: (id) => client.delete("/brands/update?id="+id),
};

export default BrandsApi;