import { client } from "./client";

const ImageApi = {
    getImageFromServer: (file) => client.get("/image/"+file)
};

export default ImageApi;
