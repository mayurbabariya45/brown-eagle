import React, { Component } from "react";
import PropTypes from "prop-types";

class SuggestionCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.suggestion);
  }

  handleMouseMove(event) {
    this.props.onMouseMove(event, this.props.index);
  }
  render() {
    const {
      className,
      suggestion,
      suggestionRenderer,
      searchTerm
    } = this.props;
    return (
      <li
        className={className}
        key={suggestion}
        ref={ref => (this.item = ref)}
        onClick={this.handleClick}
        onMouseMove={this.handleMouseMove}
      >
        {suggestionRenderer(suggestion, searchTerm)}
      </li>
    );
  }
}

SuggestionCategories.propTypes = {
  className: PropTypes.string,
  suggestion: PropTypes.string.isRequired,
  suggestionRenderer: PropTypes.func.isRequired
};
SuggestionCategories.defaultProps = {
  className: "search-bar__suggestion"
};
export default SuggestionCategories;
