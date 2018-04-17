import _ from "lodash";
import { connect } from "react-redux";
import AddProduct from "../../views/Dashboard/AddProduct";
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
      const productId = response.payload.id;
      _.forEach(state.productImages, image => {
        const form = new FormData();
        form.append("image", image);
        actions.addProductImages(form, productId, locale);
      });
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  AddProduct
);
