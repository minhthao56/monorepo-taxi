import { createBrowserRouter } from "react-router-dom";
import CustomerPage from "../pages/CustomerPage";
import DriverPage from "../pages/DriverPage";
import PhoneBooking from "../pages/PhoneBookingPage";
import Booking from "../pages/BookingPage";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import {loginLoader, protectedLoader} from "./loader";
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import { loginAction, logoutAction } from "./action";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <PrivateLayout />,
    loader: protectedLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/phone-booking",
        element: <PhoneBooking />,
      },
      {
        path: "/customer",
        element: <CustomerPage />,
      },
      {
        path: "/driver",
        element: <DriverPage />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
    ],
  },
  {
    id: "public",
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/logout",
        action: logoutAction,
      },
    ],
  },
]);

export default router;
