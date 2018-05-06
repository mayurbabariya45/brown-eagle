import Home from "../views/Home/Home";
import ProductContainer from "../containers/ProductContainer/ProductContainer";
import ProductsContainer from "../containers/ProductsContainer/ProductsContainer";
import RegisterContainer from "../containers/AuthContainer/RegisterContainer";
import LoginContainer from "../containers/AuthContainer/LoginContainer";
import ForgotPasswordContainer from "../containers/AuthContainer/ForgotPasswordContainer";
import PasswordResetContainer from "../containers/AuthContainer/PasswordResetContainer";
import DashboardContainer from "../containers/DashboardContainer/DashboardContainer";
import AddProductContainer from "../containers/AddProductContainer/AddProductContainer";
import verificationContainer from "../containers/AuthContainer/VerificationEmailContainer";
import AccountContainer from "../containers/AccountContainer/AccountContainer";

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
    path: "/reset-password",
    name: "PasswordReset",
    component: PasswordResetContainer
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
    header: { navLinks: true, showHeader: "register" },
    path: "/verification-email",
    name: "Verification Email",
    component: verificationContainer
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
      showHeader: "myAccount"
    },
    secure: true,
    type: "buyer",
    path: "/my_account",
    name: "My Account",
    component: AccountContainer
  },
  {
    header: {
      navLinks: true,
      showHeader: "dashboard"
    },
    secure: true,
    type: "seller",
    path: "/add_product",
    name: "AddProduct",
    component: AddProductContainer
  },
  { path: "/product", name: "Product", component: ProductContainer },
  { path: "/products", name: "Products", component: ProductsContainer }
];

export default appRoutes;
