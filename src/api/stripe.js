import { client } from "./client";

const StripeApi = {
  createSession: (data) => client.post("/stripe/create-session", data),
};

export default StripeApi;
