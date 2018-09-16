import { connect } from "react-redux";
import { reset } from "redux-form";
import Dashboard from "../../views/Dashboard/Dashboard";
import * as a from "../../actions/Auth/Auth_actions";
import * as d from "../../actions/Dashboard/Dashboard_actions";

const mapStateToProps = state => ({
  ...state.dashboard
});
const mapDispatchToProps = dispatch => ({
  updateProfile: (value, profileId, profileRole) =>
    dispatch(a.updateProfile(value, profileId, profileRole)),
  uploadCertificate: (value, profileId) =>
    dispatch(a.uploadCertificate(value, profileId)),
  updateCertificate: (value, profileId, certificateId) =>
    dispatch(a.updateCertificate(value, profileId, certificateId)),
  uploadVideo: (value, profileId) => dispatch(a.uploadVideo(value, profileId)),
  deleteCertificate: (profileId, certificateId) =>
    dispatch(a.deleteCertificate(profileId, certificateId)),
  getProducts: (id, status, page) => dispatch(d.getProducts(id, status, page)),
  getProduct: product => dispatch(d.getProduct(product)),
  getProductImage: (id, token) => dispatch(d.getProductImage(id, token)),
  deleteProduct: id => dispatch(d.deleteProduct(id)),
  getProductReview: (id, page, locale) =>
    dispatch(d.getProductReview(id, page, locale)),
  editProductReview: (values, productId, reviewId, locale) =>
    dispatch(d.editProductReview(values, productId, reviewId, locale)),
  changeProductReviewStatus: (productId, reviewId, status, locale) =>
    dispatch(d.changeProductReviewStatus(productId, reviewId, status, locale)),
  resendEmail: (email, locale) => dispatch(d.resendEmail(email, locale)),
  resetForm: formName => dispatch(reset(formName)),
  selectFilters: value => dispatch(d.selectFilters(value))
});

const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
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
