import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import HisabNikash from "../Pages/HisabNikash/HisabNikash";

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
    ]
  },
]);
