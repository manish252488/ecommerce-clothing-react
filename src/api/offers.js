import { client } from "./client";

const OffersApi = {
    create: (data) => client.post("/offers/create", data),
    update: (id,data) => client.post(`/offers/update/${id}` , data),
    delete: (id=[]) => client.post(`/offers/delete`, {ids: id}),
    activate: (id=[]) => client.post(`/offers/activate`, {ids: id}),
    listCategories: () => client.get("/offers/list")
};

export default OffersApi;