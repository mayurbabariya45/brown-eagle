import _ from "lodash";
import React, { Component } from "react";
import className from "classnames";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormGroup,
  InputGroup,
  FormControl,
  Collapse
} from "react-bootstrap";
import Button from "../../elements/CustomButton/CustomButton";

class SearchProductCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleSubCategory = this.handleSubCategory.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    this.selectedCategories = this.selectedCategories.bind(this);
    this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    this.handleSearchCategories = this.handleSearchCategories.bind(this);
  }
  handleOnClick(e, category) {
    e.stopPropagation();
    const { selectCategory } = this.props;
    selectCategory(category);
  }
  handleSubCategory(category) {
    const { handleSubCategory } = this.props;
    handleSubCategory(category);
  }
  handleOnMouseOut() {
    this.setState({ category: {} });
  }
  handleOnChangeInput(event) {
    this.setState({ value: event.target.value });
    if (!event.target.value) {
      this.props.flushCategories();
    }
  }
  selectedCategories(val) {
    const { selectCategory } = this.props;
    selectCategory(val);
  }
  handleSearchCategories() {
    const { searchCategories } = this.props;
    const { value } = this.state;
    if (value.length < 1) return false;
    searchCategories(value);
    return true;
  }
  nestedRenderCategories(categories) {
    const { selectedCategory, selectedSubCategory, locale } = this.props;
    return (
      <ul>
        {!_.isEmpty(categories) &&
          _.map(categories, category => (
            <li
              key={category.name}
              onClick={e => this.handleOnClick(e, category)}
              className={className({
                active: selectedCategory.id === category.id
              })}
            >
              <p>{category.nameTranslations[locale]}</p>
              {!_.isEmpty(category.subCategoryList) && (
                <ul>
                  {_.map(category.subCategoryList, subCategory => (
                    <li
                      key={subCategory._id}
                      className={className({
                        active: selectedSubCategory._id === subCategory._id
                      })}
                      onClick={() => this.handleSubCategory(subCategory)}
                    >
                      <p>{subCategory.nameTranslations[locale]}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    );
  }
  render() {
    const {
      translate,
      selectedCategory,
      selectedSubCategory,
      sCategories,
      locale
    } = this.props;
    return (
      <div className="box-search">
        <Row>
          <Col md={6}>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" onChange={this.handleOnChangeInput} />
                <InputGroup.Button>
                  <Button onClick={this.handleSearchCategories}>
                    <i className="fa fa-search" />
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        {sCategories.length > 0 && (
          <div className="box-search-result">
            {this.nestedRenderCategories(sCategories)}
            {!_.isEmpty(selectedCategory) && (
              <div>
                {_.isEmpty(selectedSubCategory) && (
                  <div className="selected-category">
                    <div className="title">{translate("a_selected")} - </div>
                    <div className="category">{selectedCategory.name}</div>
                  </div>
                )}
                {!_.isEmpty(selectedSubCategory) && (
                  <div className="selected-category">
                    <div className="title">{translate("a_selected")} - </div>
                    <div className="category">{selectedSubCategory.name}</div>
                  </div>
                )}
                <div className="selected-category">
                  <div className="title">Commission : </div>
                  <div className="category">{selectedCategory.commission}</div>
                </div>
                <Button
                  bsStyle="link"
                  onClick={() => this.setState({ open: !this.state.open })}
                >
                  Term and Conditions
                </Button>
                <Collapse in={this.state.open}>
                  <div>
                    <div className="selected-category-terms">
                      {selectedCategory.termsAndConditionsTranslations[locale]}
                    </div>
                  </div>
                </Collapse>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

SearchProductCategories.propTypes = {
  translate: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.objectOf(PropTypes.any),
  searchCategories: PropTypes.func.isRequired,
  flushCategories: PropTypes.func.isRequired
};
SearchProductCategories.defaultProps = {
  selectedCategory: {}
};

export default SearchProductCategories;
