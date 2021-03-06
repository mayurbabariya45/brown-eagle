import _ from "lodash";
import { connect } from "react-redux";
import Products from "../../views/Products/Products";
import * as a from "../../actions/Product/Product_actions";
import * as c from "../../actions/Cart/Cart_actions";

const mapDispatchToProps = dispatch => ({
  getProducts: (categoryId, subCategoryId, page) =>
    dispatch(a.getProducts(categoryId, subCategoryId, page)),
  getCategories: () => dispatch(a.getCategories()),
  selectedCategory: category => dispatch(a.selectedCategory(category)),
  handleSortFilter: value => dispatch(a.handleSortFilter(value)),
  handleCategoryFilter: value => dispatch(a.handleCategoryFilter(value)),
  handlePriceFilter: value => dispatch(a.handlePriceFilter(value)),
  handleRatingFilter: value => dispatch(a.handleRatingFilter(value)),
  searchProducts: (values, page) => dispatch(a.searchProducts(values, page)),
  addToCart: (item, buyer) => dispatch(c.addToCart(item, buyer)),
  removeCartItem: item => dispatch(c.removeCartItem(item)),
  addToWishlistProduct: (product, authId, locale) =>
    dispatch(a.addToWishlistProduct(product, authId, locale))
});
const mapStateToProps = state => ({
  ...state.product,
  categories: state.categories.categories,
  auth: state.auth
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  getCategories: () =>
    new Promise((resolve, reject) => {
      actions.getCategories().then(response => {
        if (response.type === "GET_CATEGORIES_SUCCESS") {
          const { category, subCategory } = ownProps.match.params;
          const categories = response.payload.category;
          const findCategory = _.find(
            categories,
            cat => _.kebabCase(cat.name) === category
          );
          if (!_.isEmpty(findCategory)) {
            const categoryId = findCategory.id;
            let subCategoryId;
            if (subCategory) {
              const findSubCategory = _.find(
                findCategory.subCategoryList,
                subCat => _.kebabCase(subCat.name) === subCategory
              );
              subCategoryId = findSubCategory._id;
            }
            actions.selectedCategory(findCategory);
            actions.handleCategoryFilter({
              category: categoryId,
              subCategory: subCategoryId || ""
            });
            actions
              .searchProducts(
                {
                  ...state.filter,
                  category: { category: categoryId, subCategory: subCategoryId ? subCategoryId : "" }
                },
                1
              )
              .then(data => {
                if (data.type === "GET_CATEGORY_PRODUCTS_SUCCESS") {
                  resolve({ categoryId, subCategoryId });
                } else {
                  reject();
                }
              });
          }
        }
      });
    })
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Products
);
