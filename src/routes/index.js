import Home from "../views/Home/Home";
import ProductContainer from "../containers/ProductContainer/ProductContainer";
import ProductsContainer from "../containers/ProductsContainer/ProductsContainer";
import RegisterContainer from "../containers/AuthContainer/RegisterContainer";
import LoginContainer from "../containers/AuthContainer/LoginContainer";
import ForgotPasswordContainer from "../containers/AuthContainer/ForgotPasswordContainer";
import DashboardContainer from "../containers/DashboardContainer/DashboardContainer";
import AddProductContainer from "../containers/ProductContainer/AddProductContainer";

const appRoutes = [
  { path: "/", exact: true, name: "Home", component: Home },
  {
    header: { header: true },
    path: "/login",
    name: "Login",
    component: LoginContainer
  },
  {
    header: { header: true },
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPasswordContainer
  },
  {
    header: { navLinks: true, showHeader: "register" },
    path: "/register",
    name: "Register",
    component: RegisterContainer
  },
  {
    header: {
      navLinks: true,
      showHeader: "dashboard"
    },
    secure: true,
    type: "seller",
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardContainer
  },
  {
    header: {
      navLinks: true,
      showHeader: "dashboard"
    },
    path: "/add_product",
    name: "AddProduct",
    component: AddProductContainer
  },
  { path: "/product", name: "Product", component: ProductContainer },
  { path: "/products", name: "Products", component: ProductsContainer }
];

export default appRoutes;
