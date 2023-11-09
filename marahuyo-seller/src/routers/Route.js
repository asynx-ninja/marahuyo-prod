import { createBrowserRouter, Outlet } from "react-router-dom";
import SellerPageRouter from "./SellerPageRouter";
import SellerComponentRouter from "./SellerComponentRouter";
import Error404 from "../components/global/Error404";

const pages = [
    ...SellerPageRouter,
    ...SellerComponentRouter
];

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <Error404 />,
    children: pages,
  },
]);

export default Route;
