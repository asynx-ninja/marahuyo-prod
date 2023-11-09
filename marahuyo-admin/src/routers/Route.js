import { createBrowserRouter, Outlet } from "react-router-dom";
import AdminComponentRouter from "./AdminComponentRouter";
import AdminPageRouter from "./AdminPageRouter";
import Error404 from "../components/global/Error404";

const pages = [
    ...AdminComponentRouter,
    ...AdminPageRouter
]

const Route = createBrowserRouter([
  {
      path: "/",
      element: <Outlet />,
      errorElement: <Error404 />,
      children: pages
  }
])

export default Route;
