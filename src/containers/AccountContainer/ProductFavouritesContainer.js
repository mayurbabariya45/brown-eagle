import { connect } from "react-redux";
import ProductFavourites from "../../views/Account/ProductFavourites";
import * as a from "../../actions/Account/Account_actions";

const mapStateToProps = state => ({
  ...state.account
});

const mapDispatchToProps = dispatch => ({
  getWishList: authId => dispatch(a.getWishList(authId)),
  removeWishListProduct: (authId, productId, locale) =>
    dispatch(a.removeWishListProduct(authId, productId, locale))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFavourites);
