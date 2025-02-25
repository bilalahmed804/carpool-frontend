const devURL = "http://192.168.5.229:4000";
// const devURL = "https://carpool-backend-staging.up.railway.app";
const prodURL = "";

export const BASE_URL = devURL;
export const AppRoutes = {
  signupUser: BASE_URL + "/user/signupUser",
  signupRider: BASE_URL+"/user/signupRider",
  login: BASE_URL + "/user/login",
  getAllUser: BASE_URL + "/user/allUsers",
  getCurrentUser: BASE_URL + "/user/currentUser",
  SendRideData : BASE_URL + '/rides/user',
  SendRideShare : BASE_URL + '/rides/rider',
};