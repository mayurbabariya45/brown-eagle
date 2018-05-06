import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import EditProduct from "../../views/Dashboard/EditProduct";
import * as d from "../../actions/Dashboard/Dashboard_actions";
import * as a from "../../actions/Product/Product_actions";

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(a.getCategories()),
  updateProduct: product => dispatch(d.updateProduct(product)),
  addProductImages: (images, id, locale) =>
    dispatch(a.addProductImages(images, id, locale)),
  deleteProductImage: (productId, imageId) =>
    dispatch(d.deleteProductImage(productId, imageId))
});
const mapStateToProps = state => {
  const { keywords } = state.dashboard.product;
  const newKeywords = [];
  let setKeyword = "";
  if (keywords) {
    setKeyword = keywords[0];
    if (keywords.length > 1) {
      keywords.map((keyword, index) => {
        if (index !== 0) {
          newKeywords.push(keyword);
        }
      });
    }
  }
  return {
    categories: state.dashboard.categories,
    initialValues: {
      ...state.dashboard.product,
      keywords: newKeywords,
      product_keywords: setKeyword
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "EditProductForm",
    enableReinitialize: true,
    destroyOnUnmount: true
  })(EditProduct)
);
