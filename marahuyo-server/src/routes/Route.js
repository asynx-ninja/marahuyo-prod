import Login from "./login/Login.js";
import Change from "./login/Change.js";
import Code from "./login/Code.js";
import Forgot from "./login/Forgot.js";
import Register from "./login/Register.js";

import Dashboard from "./admin/Dashboard.js";
import Users from "./admin/Users.js";

import Cart from "./client/product/Cart.js";
import Feedback from "./client/product/Feedback.js";
import Gallery from "./client/product/Gallery.js";
import Product from "./client/product/Product.js";
import ProductDetails from "./client/product/ProductDetails.js";
import Size from "./client/product/Size.js";
import Variants from "./client/product/Variants.js";
import CategorizedItem from "./client/main/CategorizedItem.js";
import Category from "./client/main/Category.js";
import Store from "./client/main/Store.js";
import Address from "./client/settings/Address.js";
import ChangePass from "./client/settings/ChangePass.js";
import EditAdd from "./client/settings/EditAdd.js";
import Profile from "./client/settings/Profile.js";
import Header from "./client/components/Header.js";
import Sidebar from "./client/components/Sidebar.js";
import OrgList from "./client/main/OrgList.js";
import Checkout from "./client/product/Checkout.js";
import Purchase from "./client/purchase/Purchase.js";

import CreateShop from "./seller/main/CreateShop.js";
import SellerDashboard from "./seller/main/SellerDashboard.js";
import Inventory from "./seller/main/Inventory.js";
import AddProduct from "./seller/main/AddProduct.js";
import EditProduct from "./seller/main/EditProduct.js";

import UpdateShop from "./seller/settings/UpdateShop.js";
import UpdateSeller from "./seller/settings/UpdateSeller.js";
import UpdatePass from "./seller/settings/UpdatePass.js";

import OrderStatus from "./seller/orders/OrderStatus.js"

import PrintOrders from "./seller/print/PrintOrders.js";
const Route = (app, db, hbs, nodemailer) => {
  // Global
  Login(app, db);
  Change(app, db);
  Code(app, db);
  Register(app, db);
  Forgot(app, db, hbs, nodemailer);

  // Admin
  Dashboard(app, db);
  Users(app, db);

  // Customer
  // Components
  Header(app, db);
  Sidebar(app, db);
  
  // Main
  CategorizedItem(app, db);
  Category(app, db);
  Store(app, db);
  OrgList(app, db);

  // Product
  Cart(app, db);
  Feedback(app, db);
  Gallery(app, db);
  Product(app, db);
  ProductDetails(app, db);
  Size(app, db);
  Variants(app, db);
  Checkout(app, db);

  // Purchase
  Purchase(app, db)

  //Settings
  Address(app, db);
  ChangePass(app, db);
  EditAdd(app, db);
  Profile(app, db);

  // Seller
  // Main
  CreateShop(app, db);
  SellerDashboard(app, db);
  Inventory(app,db);
  AddProduct(app, db);
  EditProduct(app,db)
  
  // Settings
  UpdateShop(app, db);
  UpdateSeller(app, db);
  UpdatePass(app, db);

  //Ordes
  OrderStatus(app, db);

  //Print
  PrintOrders(app, db)
};

export default Route;
