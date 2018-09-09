import { connect } from "react-redux";
import SellerProfile from "../../views/SellerProfile/SellerProfile";
import * as a from "../../actions/SellerProfile/Seller_Profile";

const mapStateToProps = state => ({
  ...state.companyProfile
});

const mapDispatchToProps = dispatch => ({
  getCompanyProfile: sellerId => dispatch(a.getCompanyProfile(sellerId)),
  getProducts: sellerId => dispatch(a.getProducts(sellerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfile);
