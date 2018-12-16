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
import PlansContainer from "../containers/PlansContainer/PlansContainer";
import CompareProductContainer from "../containers/CompareProductContainer/CompareProductContainer";
import CheckoutContainer from "../containers/CheckoutContainer/CheckoutContainer";
import SellerProfileContainer from "../containers/SellerProfileContainer/SellerProfileContainer";
import FilterSellersContainer from "../containers/FilterSellerContainer/FilterSellerContainer";
import ServicesMembership from "../views/static/ServicesMembership";
import PurchaseRegion from "../views/static/PurchaseRegion";
import HelpCommunity from "../views/static/HelpCommunity";
import AboutUs from "../views/static/AboutUs";
import InvestorDesk from "../views/static/InvestorDesk";
import Advantage from "../views/static/Advantage";
import SellerMembership from "../views/static/SellerMembership";
import TrainingCenter from "../views/static/TrainingCenter";
import Wholesale from "../views/static/Wholesale";
import Verified from "../views/static/Verified";
import RequestQuotation from "../views/static/RequestQuotation";
import MarketTrends from "../views/static/MarketTrends";
import VerifiedBuyers from "../views/static/VerifiedBuyers";
import HelpCenter from "../views/static/HelpCenter";
import ReportAbuse from "../views/static/ReportAbuse";
import Adispute from "../views/static/Adispute";
import PoliciesRules from "../views/static/PoliciesRules";
import AdvertiseWithUs from "../views/static/AdvertiseWithUs";
import TradeAssurance from "../views/static/TradeAssurance";
import BusinessIdentity from "../views/static/BusinessIdentity";
import ThirdServices from "../views/static/ThirdServices";
import LogisticServices from "../views/static/LogisticServices";
import SecurePayment from "../views/static/SecurePayment";
import InspectionService from "../views/static/InspectionService";
import Sitemap from "../views/static/Sitemap";
import ContactUs from "../views/static/ContactUs";

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
  {
    path: "/sellers/:country",
    name: "Sellers",
    component: FilterSellersContainer
  },
  { path: "/cart", name: "Cart", component: CartContainer },
  { path: "/plans", name: "Plans", component: PlansContainer },
  {
    path: "/company_profile/:id",
    name: "Seller Profile",
    component: SellerProfileContainer
  },
  {
    path: "/compare",
    name: "Compare Product",
    component: CompareProductContainer
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: CheckoutContainer
  },
  {
    path: "/services_membership",
    name: "ServicesMembership",
    component: ServicesMembership
  },
  {
    path: "/purchase_region",
    name: "PurchaseRegion",
    component: PurchaseRegion
  },
  {
    path: "/help_community",
    name: "ServicesMembership",
    component: HelpCommunity
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: AboutUs
  },
  {
    path: "/investor-desk",
    name: "investor-desk",
    component: InvestorDesk
  },
  {
    path: "/advantage",
    name: "Advantage",
    component: Advantage
  },
  {
    path: "/seller-membership",
    name: "SellerMembership",
    component: SellerMembership
  },
  {
    path: "/training-center",
    name: "TrainingCenter",
    component: TrainingCenter
  },
  {
    path: "/wholesale",
    name: "Wholesale",
    component: Wholesale
  },
  {
    path: "/verified",
    name: "Verified",
    component: Verified
  },
  {
    path: "/request_quotation",
    name: "RequestQuotation",
    component: RequestQuotation
  },
  {
    path: "/market_trends",
    name: "MarketTrends",
    component: MarketTrends
  },
  {
    path: "/verified_buyers",
    name: "VerifiedBuyers",
    component: VerifiedBuyers
  },
  {
    path: "/help_center",
    name: "HelpCenter",
    component: HelpCenter
  },
  {
    path: "/report_abuse",
    name: "ReportAbuse",
    component: ReportAbuse
  },
  {
    path: "/a_dispute",
    name: "Adispute",
    component: Adispute
  },
  {
    path: "/policies_rules",
    name: "PoliciesRules",
    component: PoliciesRules
  },
  {
    path: "/advertise_with_us",
    name: "AdvertiseWithUs",
    component: AdvertiseWithUs
  },
  {
    path: "/trade_assurance",
    name: "trade_assurance",
    component: TradeAssurance
  },
  {
    path: "/business_identity",
    name: "business_identity",
    component: BusinessIdentity
  },
  {
    path: "/third_services",
    name: "third_services",
    component: ThirdServices
  },
  {
    path: "/logistic_services",
    name: "logistic_services",
    component: LogisticServices
  },
  {
    path: "/secure_payment",
    name: "secure_payment",
    component: SecurePayment
  },
  {
    path: "/inspection_service",
    name: "inspection_service",
    component: InspectionService
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: ContactUs
  },
  {
    path: "/sitemap",
    name: "SiteMap",
    component: Sitemap
  }
];

export default appRoutes;
