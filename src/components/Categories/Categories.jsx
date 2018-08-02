import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const { getCategories } = this.props;
    getCategories();
  }
  render() {
    const { categories } = this.props;
    const renderCategories = _.map(categories, category => (
      <li key={category.id}>
        <div className="title">
          <Link to={`/products/${_.kebabCase(category.name)}`}>
            {category.name}
          </Link>
          {!_.isEmpty(category.subCategoryList) && (
            <i className="pe-7s-angle-right" />
          )}
        </div>
        <div className="level-one-list">
          <div className="level-one-inner">
            <div className="level-one">
              <Link
                to={`/products/${_.kebabCase(category.name)}`}
                className="level-one-title"
              >
                {category.name}
              </Link>
              {!_.isEmpty(category.subCategoryList) &&
                _.map(category.subCategoryList, subCategory => (
                  <div className="level-two-list" key={subCategory._id}>
                    <Link
                      to={`/products/${_.kebabCase(
                        category.name
                      )}/${_.kebabCase(subCategory.name)}`}
                      className="level-two-title"
                    >
                      {subCategory.name}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </li>
    ));
    return (
      <div className="header-category">
        <ul className="component-list">
          {!_.isEmpty(renderCategories) && renderCategories}
        </ul>
      </div>
    );
  }
}

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired
};

export default Categories;
