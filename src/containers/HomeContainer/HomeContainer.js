import _ from "lodash";
import { connect } from "react-redux";
import Home from "../../views/Home/Home";
import * as a from "../../actions/Home/Home_actions";

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(a.getCategories()),
  getProducts: category => dispatch(a.getProducts(category)),
  getTopBanners: () => dispatch(a.getTopBanners()),
  getCenterBanners: () => dispatch(a.getCenterBanners()),
  getBottomBanners: () => dispatch(a.getBottomBanners()),
  getTopSuppliers: () => dispatch(a.getTopSuppliers()),
  getRecentViewProducts: () => dispatch(a.getRecentViewProducts())
});
const mapStateToProps = state => ({
  ...state.home
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  getCategories: () => {
    actions.getCategories().then(response => {
      if (response.type === "GET_CATEGORIES_SUCCESS") {
        const categories = response.payload.category;
        if (!_.isEmpty(categories)) {
          _.map(_.take(categories, 4), category => {
            actions.getProducts(category);
          });
        }
      }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);
