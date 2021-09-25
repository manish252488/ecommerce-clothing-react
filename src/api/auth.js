import { client } from "./client";

const Auth = {
  login: (data) => client.post("/users/login", data),
  signup: (data) => client.post("/users/create", data),
  checkAuth: () => client.get("/users/check"),
  signOut: () => Promise.resolve(),
  addAddress: (data) => client.post("/users/address-create", data),
  setDefaultAddress: (id) => client.post("/users/address-default", {id: id}),
  deleteAddress: (id) => client.delete("/users/delete-address/"+id),
  updateAddress: (data) => client.post("/users/address-update", data),
  updateProfilePicture: (data) => client.post("/users/upload-profile-picture",data),
  getUserDetail: () => client.get("/users/detail"),
  generateOtp:(phone) => client.post("/users/otp-generate", {phoneNo: phone}),
  verifyOtp: (otp,hash) => client.post("/users/otp-verify",{otp: otp, hash: hash}),
  updateProfile: (data) => client.put("/users/update", data),
  genrateMailOtp: (email) => client.post("/users/mail-otp-generate",{email: email}),
  verifyEmailOtp: (data = { email: "",otp: "", hash: ""}) => client.post("/users/mail-otp-verify",data),
  recentViews: (id) => client.post("/users/recent-views", {id: id})
};

export default Auth;
