import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { debounce, inRange, isNil } from "lodash";
import {
  Col,
  FormGroup,
  InputGroup,
  FormControl,
  DropdownButton,
  MenuItem,
  Glyphicon
} from "react-bootstrap";
import Suggestions from "./SuggestionsCategories";
import Button from "../../elements/CustomButton/CustomButton";

const suggestionRenderer = (suggestion, searchTerm) => (
  <span>
    <span>{searchTerm}</span>
    <strong>{suggestion.name}</strong>
  </span>
);

class SearchCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedSuggestion: null,
      isFocused: false,
      searchTerm: "",
      value: ""
    };
    this.toggleFocus = this.toggleFocus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDebouncedChange = this.handleDebouncedChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setFocusedSuggestion = this.setFocusedSuggestion.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleDebouncedChange = debounce(
      this.handleDebouncedChange,
      props.delay
    );
  }
  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.focus();
    }
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }
  setFocusedSuggestion(movingDown) {
    const { focusedSuggestion: index, searchTerm } = this.state;
    const { suggestions } = this.props;
    const last = suggestions.length - 1;
    let next;
    if (movingDown) {
      next = isNil(index) ? 0 : index + 1;
    } else {
      next = isNil(index) ? last : index - 1;
    }
    this.setState({
      focusedSuggestion: inRange(next, 0, suggestions.length) ? next : null,
      value: suggestions[next].name || searchTerm
    });
  }
  clearSearch() {
    const { onClear } = this.props;
    this.setState({
      focusedSuggestion: null,
      searchTerm: "",
      value: ""
    });
    this.input.focus();
    onClear();
  }
  toggleFocus() {
    this.setState({
      isFocused: !this.state.isFocused
    });
  }

  handleClick(event) {
    if (!this.container.contains(event.target)) {
      this.props.onClear();
    }
  }
  handleDebouncedChange(searchTerm) {
    const { onChange, selectedCategory } = this.props;
    this.setState({
      searchTerm
    });
    onChange(searchTerm, selectedCategory);
  }
  handleChange(event) {
    const { value } = event.target;
    const searchTerm = value.toLowerCase().trim();
    if (!value) {
      this.clearSearch();
      return;
    }
    this.setState({
      focusedSuggestion: null,
      value
    });
    if (searchTerm) {
      this.handleDebouncedChange(searchTerm);
    }
  }
  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
        event.preventDefault();
        this.setFocusedSuggestion(event.key === "ArrowDown");
        break;

      case "Backspace":
        this.handleBackspace();
        break;

      case "Enter":
        this.handleSearch();
        break;

      case "Escape":
        this.handleEscape();
        break;
      default:
        break;
    }
  }
  handleBackspace() {
    this.setState({
      focusedSuggestion: null
    });
  }
  handleSearch() {
    const { selectedCategory } = this.props;
    this.props.onClear();
    this.props.onSearch(this.state.value.trim(), selectedCategory);
  }
  handleEscape() {
    this.setState({
      focusedSuggestion: null,
      searchTerm: ""
    });

    this.input.blur();
    this.props.onClear();
  }
  handleHover(index) {
    this.setState({
      focusedSuggestion: index
    });
  }
  handleSelection(suggestion) {
    this.setState({
      focusedSuggestion: null,
      value: suggestion.name
    });
    this.props.onClear();
    if (this.props.onSelection) {
      this.props.onSelection(suggestion);
    }
  }
  handleDropdown(evt) {
    const { onSelectCategory } = this.props;
    onSelectCategory(evt);
    this.input.focus();
  }
  render() {
    const {
      styles,
      placeholder,
      suggestions,
      selectedCategory,
      categories
    } = this.props;
    const { isFocused, value } = this.state;
    // const renderClearButton = this.state.value && renderClearButton;
    const renderSuggestions = value && suggestions.length > 0;
    const selectCategories = _.map(categories, category => (
      <MenuItem key={category.id} eventKey={category}>
        {category.name}
      </MenuItem>
    ));
    return (
      <Col xs={7}>
        <FormGroup className="base-top">
          <div
            className={styles.wrapper}
            ref={ref => {
              this.container = ref;
            }}
          >
            <div
              className={classNames({
                [styles.field]: true,
                [styles.fieldFocused]: isFocused,
                [styles.hasSuggestions]: suggestions.length > 0
              })}
            >
              <InputGroup>
                <DropdownButton
                  componentClass={InputGroup.Button}
                  className="btn-fill"
                  id="main-categories"
                  onSelect={this.handleDropdown}
                  title={selectedCategory.name}
                >
                  {selectCategories}
                </DropdownButton>
                <FormControl
                  className="form-control-fill"
                  inputRef={ref => {
                    this.input = ref;
                  }}
                  placeholder={placeholder}
                  type="text"
                  value={value}
                  onChange={this.handleChange}
                  onFocus={this.toggleFocus}
                  onBlur={this.toggleFocus}
                  onKeyDown={suggestions && this.handleKeyDown}
                />
                {renderSuggestions && (
                  <Suggestions
                    focusedSuggestion={this.state.focusedSuggestion}
                    onSelection={this.handleSelection}
                    onSuggestionHover={this.handleHover}
                    searchTerm={this.state.searchTerm}
                    styles={styles}
                    suggestions={suggestions}
                    suggestionRenderer={suggestionRenderer}
                  />
                )}
                <InputGroup.Button>
                  <Button fill bsStyle="warning" onClick={this.handleSearch}>
                    <Glyphicon glyph="search" />
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </div>
          </div>
        </FormGroup>
      </Col>
    );
  }
}
SearchCategories.propTypes = {
  translate: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClear: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelection: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  styles: PropTypes.object,
  suggestions: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  selectedCategory: PropTypes.string.isRequired
};
SearchCategories.defaultProps = {
  autoFocus: false,
  delay: 20,
  placeholder: "",
  styles: {
    wrapper: "search-bar__wrapper",
    field: "search-bar__field",
    fieldFocused: "search-bar__field--focused",
    hasSuggestions: "search-bar__field--has-suggestions",
    input: "search-bar__input",
    clearButton: "search-bar__clear",
    submitButton: "search-bar__submit",
    suggestions: "search-bar__suggestions",
    suggestion: "search-bar__suggestion",
    suggestionFocused: "search-bar__suggestion--focused"
  }
};
export default SearchCategories;
