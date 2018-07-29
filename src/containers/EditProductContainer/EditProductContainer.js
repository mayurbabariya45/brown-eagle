import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import EditProduct from "../../views/Dashboard/EditProduct";
import * as d from "../../actions/Dashboard/Dashboard_actions";
import * as a from "../../actions/Product/Product_actions";

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(a.getCategories()),
  updateProduct: (product, locale) =>
    dispatch(d.updateProduct(product, locale)),
  addProductImages: (images, id, locale) =>
    dispatch(a.addProductImages(images, id, locale)),
  deleteProductImage: (productId, imageId) =>
    dispatch(d.deleteProductImage(productId, imageId))
});
const mapStateToProps = state => {
  const productKeywords = !_.isEmpty(state.dashboard.product)
    ? state.dashboard.product.keywords
    : [];
  const newKeywords = [];
  let setKeyword = "";
  if (!_.isEmpty(productKeywords)) {
    setKeyword = productKeywords[0];
    if (productKeywords.length > 1) {
      productKeywords.map((keyword, index) => {
        if (index !== 0) {
          newKeywords.push(keyword);
        }
      });
    }
  }
  return {
    categories: state.dashboard.categories,
    initialValues: {
      name: state.dashboard.product.name,
      id: state.dashboard.product.id,
      productAvailability: state.dashboard.product.productAvailability,
      category: !_.isEmpty(state.dashboard.product.category)
        ? state.dashboard.product.category._id
        : "",
      subCategory: !_.isEmpty(state.dashboard.product.subCategory)
        ? state.dashboard.product.subCategory._id
        : "",
      productPrice: state.dashboard.product.productPrice,
      minQuantity: state.dashboard.product.minQuantity,
      description: state.dashboard.product.description,
      productPictures: state.dashboard.product.productPictures,
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
