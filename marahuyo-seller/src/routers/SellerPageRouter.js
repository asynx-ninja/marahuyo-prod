import Change from "../pages/login/Change";
import Code from "../pages/login/Code";
import Forgot from "../pages/login/Forgot";
import Login from "../pages/login/Login";
import SignUp from "../pages/login/SignUp";

import AddProduct from "../pages/main/AddProduct";
import EditProduct from "../pages/main/EditProduct";
import CreateShop from "../pages/main/CreateShop";
import Dashboard from "../pages/main/Dashboard";
import Inventory from "../pages/main/Inventory";
import ProductRating from "../pages/main/ProductRating";
import UpdateProduct from "../pages/main/UpdateProduct";
import UpdateSeller from "../pages/settings/UpdateSeller";
import UpdateShop from "../pages/settings/UpdateShop";
import UpdatePass from "../pages/settings/UpdatePassword";
import ViewOrders from "./../pages/main/ViewOrders";

import ToPay from "./../pages/orders/ToPay";
import ToShip from "./../pages/orders/ToShip";
import ToReceive from "./../pages/orders/ToReceive";
import Completed from "./../pages/orders/Completed";
import Cancelled from "./../pages/orders/Cancelled";
import ReturnRefund from "./../pages/orders/ReturnRefund";


const main = [
  {
    path: "/add_product/:id",
    element: <AddProduct />,
  },
  {
    path: "/edit_product/:user_id/:acc_id",
    element: <EditProduct />,
  },
  {
    path: "/create_shop/:id",
    element: <CreateShop />,
  },
  {
    path: "/dashboard/:id",
    element: <Dashboard />,
  },
  {
    path: "/inventory/:id",
    element: <Inventory />,
  },
  {
    path: "/product_rating",
    element: <ProductRating />,
  },
  {
    path: "/update_product",
    element: <UpdateProduct />,
  },
  {
    path: "/view_orders/:id",
    element: <ViewOrders />,
  },

];

const auth = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/code/:id",
    element: <Code />,
  },
  {
    path: "/change/:id",
    element: <Change />,
  },
];

const orders = [
  {
    path: "/to_pay_orders/:id",
    element: <ToPay />,
  },
  {
    path: "/to_ship_orders/:id",
    element: <ToShip />,
  },
  {
    path: "/to_receive_orders/:id",
    element: <ToReceive />,
  },
  {
    path: "/completed_orders/:id",
    element: <Completed />,
  },
  {
    path: "/cancelled_orders/:id",
    element: <Cancelled />,
  },
  {
    path: "/return_orders/:id",
    element: <ReturnRefund />,
  },
]


const settings = [
  {
    path: "/update_shop/:id",
    element: <UpdateShop />,
  },
  {
    path: "/update_seller/:id",
    element: <UpdateSeller />,
  },
  {
    path: "/update_pass/:id",
    element: <UpdatePass />,
  },
];

const SellerPageRouter = [...main, ...auth, ...orders, ...settings];

export default SellerPageRouter;
