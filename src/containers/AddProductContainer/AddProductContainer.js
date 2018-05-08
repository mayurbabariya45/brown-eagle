import _ from "lodash";
import { connect } from "react-redux";
import AddProduct from "../../views/AddProduct/AddProduct";
import * as a from "../../actions/Product/Product_actions";

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(a.getCategories()),
  addCategory: () => dispatch(a.AddCategory()),
  selectCategory: category => dispatch(a.selectCategory(category)),
  selectLanguage: lang => dispatch(a.selectLanguage(lang)),
  searchCategories: value => dispatch(a.searchCategories(value)),
  handleCategory: value => dispatch(a.handleCategory(value)),
  flushCategories: () => dispatch(a.flushCategories()),
  addProduct: (value, locale) => dispatch(a.addProduct(value, locale)),
  dropProductImages: files => dispatch(a.dropProductImages(files)),
  removeProductImages: files => dispatch(a.removeProductImages(files)),
  flushProductImages: () => dispatch(a.flushProductImages()),
  flushAddProduct: () => dispatch(a.flushAddProduct()),
  addProductImages: (images, id, locale) =>
    dispatch(a.addProductImages(images, id, locale))
});
const mapStateToProps = state => ({
  ...state.product
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  addProduct: (value, locale) => {
    actions.addProduct(value, locale).then(response => {
      if (response.type === "ADD_PRODUCT_SUCCESS") {
        ownProps.success("Product has been created successfully.");
        const productId = response.payload.id;
        _.forEach(state.productImages, image => {
          actions.addProductImages(image.formData, productId, locale);
        });
        return false;
      }
      const { errors, message } = response.payload.response;
      if (errors && errors.length > 0) {
        ownProps.error(errors[0].messages);
        return false;
      }
      ownProps.error(message);
      return false;
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  AddProduct
);
