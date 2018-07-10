import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isNil } from "lodash";
import Suggestion from "./SuggestionCategories";

class SuggestionCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.setFocusedSuggestion = this.setFocusedSuggestion.bind(this);
  }
  componentDidUpdate() {
    if (!isNil(this.props.focusedSuggestion)) {
      this.scrollToSuggestion();
    }
  }
  setFocusedSuggestion(ref) {
    this.focusedSuggestion = ref && ref.item;
  }

  scrollToSuggestion() {
    const { focusedSuggestion, list } = this;
    const listRect = list.getBoundingClientRect();
    const suggestionRect = focusedSuggestion.getBoundingClientRect();

    if (suggestionRect.bottom > listRect.bottom) {
      list.scrollTop =
        focusedSuggestion.offsetTop +
        focusedSuggestion.clientHeight -
        list.clientHeight;
    } else if (suggestionRect.top < listRect.top) {
      list.scrollTop = focusedSuggestion.offsetTop;
    }
  }

  handleMouseMove(event, index) {
    const { movementX, movementY } = event.nativeEvent;

    if (movementX || movementY) {
      this.props.onSuggestionHover(index);
    }
  }

  handleMouseLeave() {
    this.props.onSuggestionHover(null);
  }

  renderSuggestion(suggestion, index) {
    const {
      focusedSuggestion,
      searchTerm,
      onSelection,
      styles,
      suggestionRenderer
    } = this.props;
    const isFocused = focusedSuggestion === index;
    return (
      <Suggestion
        className={classNames({
          [styles.suggestion]: true,
          [styles.suggestionFocused]: isFocused
        })}
        index={index}
        key={suggestion.id}
        onClick={onSelection}
        onMouseMove={this.handleMouseMove}
        ref={isFocused && this.setFocusedSuggestion}
        searchTerm={searchTerm}
        suggestion={suggestion}
        suggestionRenderer={suggestionRenderer}
      />
    );
  }
  render() {
    return (
      <ul
        className={this.props.styles.suggestions}
        ref={ref => {
          this.list = ref;
        }}
        onMouseLeave={this.handleMouseLeave}
      >
        {_.map(this.props.suggestions, this.renderSuggestion)}
      </ul>
    );
  }
}
SuggestionCategories.defaultProps = {
  styles: {
    suggestions: "search-bar__suggestions",
    suggestion: "search-bar__suggestion",
    suggestionFocused: "search-bar__suggestion--focused"
  }
};
SuggestionCategories.propTypes = {
  focusedSuggestion: PropTypes.number,
  onSelection: PropTypes.func.isRequired,
  onSuggestionHover: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  styles: PropTypes.object,
  suggestions: PropTypes.array.isRequired
};

export default SuggestionCategories;
