import { createBrowserRouter, Outlet } from "react-router-dom";
import ClientPageRouter from "./ClientPageRouter";
import ClientComponentRouter from "./ClientComponentRouter";
import Error404 from "../components/global/Error404";

const pages = [...ClientPageRouter, ...ClientComponentRouter];

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <Error404 />,
    children: pages,
  },
]);

export default Route;
