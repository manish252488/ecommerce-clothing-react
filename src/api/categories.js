import { client } from "./client";

const CategoriesApi = {
    listCategories: () => client.get("/category/list")
};

export default CategoriesApi;