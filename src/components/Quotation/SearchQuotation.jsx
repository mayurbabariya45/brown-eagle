import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  DropdownButton,
  MenuItem,
  FormControl,
  FormGroup,
  InputGroup
} from "react-bootstrap";
import Button from "../../elements/CustomButton/CustomButton";

class SearchQuotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  onChangeInput(event) {
    const { value } = event.target;
    this.setState({ value });
    if (value.length < 1) {
      this.props.flushSearchQuery();
      this.props.getSellerQuotations(
        this.props.seller,
        _.lowerCase(this.props.selectedFilter)
      );
      return false;
    }
    return false;
  }
  handleKeyDown(event) {
    switch (event.key) {
      case "Enter":
        this.handleSearchButton();
        break;
      default:
        break;
    }
  }
  handleDropdown(evt) {
    const { onSelectCategory } = this.props;
    onSelectCategory(evt);
  }
  handleSearchButton() {
    const {
      selectedCategory,
      searchQuotation,
      clearViewQuotation,
      selectedFilter,
      flushSearchQuery,
      getSellerQuotations,
      seller
    } = this.props;
    const { value } = this.state;
    clearViewQuotation();
    if (value.length < 1) {
      flushSearchQuery();
      getSellerQuotations(seller, _.lowerCase(selectedFilter));
      return false;
    }
    searchQuotation({
      category: selectedCategory.id,
      search: value,
      status: _.lowerCase(selectedFilter),
      page: 1
    });
    return true;
  }
  render() {
    const { categories, selectedCategory } = this.props;
    const categorieTitle = (
      <div>
        <i className="fa fa-bars" />
        {!_.isEmpty(selectedCategory) ? selectedCategory.name : "Categories"}
      </div>
    );
    const selectCategories = _.map(categories, category => (
      <MenuItem key={category.id} eventKey={category.name}>
        {category.name}
      </MenuItem>
    ));
    return (
      <div className="quotaion-search quotaion-search-form">
        <FormGroup>
          <InputGroup>
            <DropdownButton
              componentClass={InputGroup.Button}
              id="main-categories"
              onSelect={this.handleDropdown}
              title={categorieTitle}
              noCaret
            >
              {selectCategories}
            </DropdownButton>
            <FormControl
              bsClass="form-control form-control-simple"
              placeholder="Type a keyword to search RFQs"
              value={this.state.value}
              onChange={this.onChangeInput}
              onKeyDown={this.handleKeyDown}
            />
            <InputGroup.Button>
              <Button
                fill
                radius
                bsStyle="warning"
                onClick={this.handleSearchButton}
              >
                <span className="pe-7s-search" /> Search
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}

SearchQuotation.propTypes = {
  onSelectCategory: PropTypes.func,
  searchQuotation: PropTypes.func,
  clearViewQuotation: PropTypes.func.isRequired,
  flushSearchQuery: PropTypes.func.isRequired,
  getSellerQuotations: PropTypes.func.isRequired,
  seller: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedCategory: PropTypes.objectOf(PropTypes.any),
  selectedFilter: PropTypes.string.isRequired
};

SearchQuotation.defaultProps = {
  onSelectCategory: () => {},
  searchQuotation: () => {},
  selectedCategory: {}
};

export default SearchQuotation;
