import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import HisabNikash from "../Pages/HisabNikash/HisabNikash";
import BakiDetails from "../Pages/HisabNikash/BakiDetails";
import ProductDetails from "../Pages/HisabNikash/ProductDetails";
import MalerHisab from "../Pages/HisabNikash/MalerHisab";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "hisabnikash",
        element: <HisabNikash />,
      },
      {
        path: "/baki-hisab/:id",
        element: <BakiDetails />
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />
      },
      { path: "malerhisab", element: <MalerHisab /> },
    ]
  },
]);
