import React, { Component } from "react";
import className from "classnames";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormGroup,
  InputGroup,
  Button,
  FormControl
} from "react-bootstrap";

class SearchProductCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    this.selectedCategories = this.selectedCategories.bind(this);
    this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
  }
  handleOnClick(index) {
    const { handleCategory } = this.props;
    this.setState({ index });
    handleCategory(index);
  }
  handleOnMouseOut() {
    this.setState({ index: "" });
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
  nestedRenderCategories(categories) {
    const { activeCategory } = this.props;
    return (
      <ul>
        {categories.map((cat, index) => (
          <li
            key={cat.name}
            onClick={() =>
              (!cat.children && this.selectedCategories(cat.name)) ||
              this.handleOnClick(index)
            }
            className={className({ active: activeCategory === index })}
          >
            <p>{cat.name}</p>
            {cat.children && this.nestedRenderCategories(cat.children)}
          </li>
        ))}
      </ul>
    );
  }
  render() {
    const {
      translate,
      searchCategories,
      selectedCategory,
      sCategories
    } = this.props;
    const { value } = this.state;
    return (
      <div className="box-search">
        <Row>
          <Col md={6}>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" onChange={this.handleOnChangeInput} />
                <InputGroup.Button>
                  <Button onClick={() => searchCategories(value)}>
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
            {selectedCategory && (
              <div className="selected-category">
                <div className="title">{translate("a_selected")} - </div>
                <div className="category">{selectedCategory}</div>
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
  selectedCategory: PropTypes.string,
  searchCategories: PropTypes.func.isRequired,
  flushCategories: PropTypes.func.isRequired,
  activeCategory: PropTypes.number.isRequired
};
SearchProductCategories.defaultProps = {
  selectedCategory: ""
};

export default SearchProductCategories;
