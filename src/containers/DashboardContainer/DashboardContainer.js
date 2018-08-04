import _ from "lodash";
import { connect } from "react-redux";
import Dashboard from "../../views/Dashboard/Dashboard";
import * as a from "../../actions/Auth/Auth_actions";
import * as d from "../../actions/Dashboard/Dashboard_actions";

const mapStateToProps = state => ({
  ...state.dashboard
});
const mapDispatchToProps = dispatch => ({
  updateProfile: (value, profileId, profileRole) =>
    dispatch(a.updateProfile(value, profileId, profileRole)),
  getProducts: (id, page) => dispatch(d.getProducts(id, page)),
  getProduct: product => dispatch(d.getProduct(product)),
  getProductImage: (id, token) => dispatch(d.getProductImage(id, token)),
  deleteProduct: id => dispatch(d.deleteProduct(id)),
  getProductReview: (id, page, locale) =>
    dispatch(d.getProductReview(id, page, locale)),
  editProductReview: (values, productId, reviewId, locale) =>
    dispatch(d.editProductReview(values, productId, reviewId, locale))
});

const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  getProducts: (id, token) => {
    actions.getProducts(id, token).then(response => {
      if (response.type === "GET_PRODUCTS_SUCCESS") {
        const { products } = response.payload;
        _.forEach(products, product => actions.getProductImage(product.id));
      }
    });
  },

  deleteProduct: id => {
    actions.deleteProduct(id).then(response => {
      if (response.type === "DELETE_PRODUCT_SUCCESS") {
        ownProps.success("Product has been deleted successfully.");
      } else if (response.type === "DELETE_PRODUCT_FAILURE") {
        ownProps.error(response.payload.response.message);
      }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Dashboard
);
