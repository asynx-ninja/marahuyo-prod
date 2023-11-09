import Dashboard from './../pages/main/Dashboard';
import Cart from './../pages/main/Cart';
import Checkout from './../pages/main/Checkout';
import Mall from './../pages/main/Mall';
import Marketplace from './../pages/main/Marketplace';
import Product from './../pages/main/Product';
import Store from './../pages/main/Store';
import Login from './../pages/login/Login';
import SignUp from './../pages/login/SignUp';
import Forgot from './../pages/login/Forgot';
import Code from './../pages/login/Code';
import Change from './../pages/login/Change';
import ViewPurchase from './../pages/purchase/ViewPurchase';
import Address from './../pages/settings/Address';
import ChangePass from './../pages/settings/ChangePass';
import Profile from './../pages/settings/Profile';
import AddAddress from './../pages/settings/AddAddress';
import EditAdd from './../pages/settings/EditAdd';

const main = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "/cart/:id",
    element: <Cart />,
  },
  {
    path: "/checkout/:id",
    element: <Checkout />,
  },
  {
    path: "/mall/:id",
    element: <Mall />,
  },
  {
    path: "/marketplace/:id",
    element: <Marketplace />,
  },
  {
    path: "/product/:prod_name",
    element: <Product />,
  },
  {
    path: "/store/:shop_name",
    element: <Store />,
  },
];

const login = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/auth/forgot",
    element: <Forgot />,
  },
  {
    path: "/auth/code/:email",
    element: <Code />,
  },
  {
    path: "/auth/change/:id",
    element: <Change />,
  },
];

const purchase = [
  {
    path: "/view/:id",
    element: <ViewPurchase />,
  },
];

const settings = [
  {
    path: "/address/:id",
    element: <Address />,
  },
  {
    path: "/change_pass/:id",
    element: <ChangePass />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "editadd/:id",
    element: <EditAdd />,
  },
  {
    path: "addaddress/:id",
    element: <AddAddress/>,
  },
];

const ClientPageRouter = [...main, ...login, ...purchase, ...settings];

export default ClientPageRouter;
