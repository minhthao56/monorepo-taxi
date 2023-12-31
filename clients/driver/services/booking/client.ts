import { Client } from "utils/axiosClient";
import { authMobile } from "utils/firebase/mobile";


export const bookingClient = new Client({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL || "",
  path: "booking",
  authProvider: authMobile
});
