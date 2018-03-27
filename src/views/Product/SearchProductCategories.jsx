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

const data = [
  { name: "Agriculture" },
  { name: "Apparel" },
  { name: "Automobile & Motorcycle" },
  { name: "Beauty & Personal Care" },
  { name: "Bussiness" },
  { name: "Chemicals" },
  { name: "Constructions" },
  { name: "Consumer" }
];
class SearchProductCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    this.selectedCategories = this.selectedCategories.bind(this);
  }
  handleOnClick(index) {
    this.setState({ index });
  }
  handleOnMouseOut() {
    this.setState({ index: "" });
  }
  selectedCategories(val) {
    this.setState({ selected: val });
  }
  render() {
    const { translate } = this.props;
    return (
      <div className="box-search">
        <Row>
          <Col md={6}>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" />
                <InputGroup.Button>
                  <Button>
                    <i className="fa fa-search" />
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <div className="box-search-result">
          <ul className="categories">
            {data.map((cat, index) => (
              <li
                key={index}
                onClick={() => this.handleOnClick(index)}
                className={className({ active: this.state.index === index })}
              >
                <a href="javascript:void(0);">{cat.name}</a>
                <ul key={index}>
                  {data.map((cat, index) => (
                    <li
                      key={index}
                      onClick={() => this.selectedCategories(cat.name)}
                      className={className({
                        active: this.state.selected === cat.name
                      })}
                    >
                      <a href="javascript:void(0);">{cat.name}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          {this.state.selected && (
            <div className="selected-category">
              <div className="title">{translate("a_selected")} - </div>
              <div className="category">{this.state.selected}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

SearchProductCategories.propTypes = {};

export default SearchProductCategories;
