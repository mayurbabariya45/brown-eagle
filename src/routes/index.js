import HomeContainer from "../containers/HomeContainer/HomeContainer";
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
import CartContainer from "../containers/CartContainer/CartContainer";
import QuotationContainer from "../containers/QuotationContainer/QuotationContainer";
import RequestQuotationContainer from "../containers/QuotationContainer/RequestQuotationContainer";

const appRoutes = [
  { path: "/", exact: true, name: "Home", component: HomeContainer },
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
    path: "/seller/product/new",
    name: "AddProduct",
    component: AddProductContainer
  },
  {
    header: {
      navLinks: true,
      showHeader: "myAccount"
    },
    path: "/quotation",
    name: "Quotation",
    component: QuotationContainer
  },
  {
    header: {
      navLinks: true,
      showHeader: "myAccount"
    },
    secure: true,
    type: "buyer",
    path: "/buyer/request_quotation",
    name: "RequestQuotation",
    component: RequestQuotationContainer
  },
  {
    path: "/product/:productName/:productId",
    name: "Product",
    component: ProductContainer
  },
  {
    path: "/products/:category?/:subCategory?",
    name: "Products",
    component: ProductsContainer
  },
  { path: "/cart", name: "Cart", component: CartContainer }
];

export default appRoutes;
