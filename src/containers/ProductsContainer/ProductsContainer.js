import _ from "lodash";
import { connect } from "react-redux";
import Products from "../../views/Products/Products";
import * as a from "../../actions/Product/Product_actions";

const mapDispatchToProps = dispatch => ({
  getProducts: (categoryId, subCategoryId, page) =>
    dispatch(a.getProducts(categoryId, subCategoryId, page)),
  getCategories: () => dispatch(a.getCategories()),
  selectedCategory: category => dispatch(a.selectedCategory(category))
});
const mapStateToProps = state => ({
  ...state.product,
  categories: state.categories.categories
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
            actions.getProducts(categoryId, subCategoryId, 1).then(data => {
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
