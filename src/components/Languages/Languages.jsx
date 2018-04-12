import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavDropdown, MenuItem, DropdownButton } from "react-bootstrap";
import { languages } from "../../variables/Variables";

class DropdownLanguage extends Component {
  constructor(props) {
    super(props);
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  componentWillMount() {
    const { locale, selectLanguage } = this.props;
    selectLanguage && selectLanguage(locale);
  }

  handleDropdown(evt) {
    const { handleLanguage, selectLanguage } = this.props;
    const currentLang = _.find(languages, { key: evt });
    if (_.isObject(currentLang)) {
      switch (currentLang.align) {
        case "left":
          document.body.classList.remove("rtl-active");
          break;
        case "right":
          document.body.classList.add("rtl-active");
          break;
        default:
          document.body.classList.add("rtl-active");
          break;
      }
    }
    selectLanguage && selectLanguage(evt);
    handleLanguage && handleLanguage(evt);
  }
  render() {
    const {
      locale,
      translate,
      dropdownButton,
      selectedLang,
      className,
      dropup
    } = this.props;
    const selectedLanguage = selectedLang || locale;
    const renderLanguages = languages.map(
      ({ key, icon }) =>
        selectedLanguage !== key && (
          <MenuItem key={key} eventKey={key}>
            <img src={icon} alt={key} />
            {translate(key).toUpperCase()}
          </MenuItem>
        )
    );
    const language = (
      <div>
        <i className="fa fa-globe" />
        <span>{translate(selectedLanguage).toUpperCase()}</span>
        <b className="caret" />
      </div>
    );
    if (dropdownButton) {
      return (
        <DropdownButton
          title={language}
          onSelect={this.handleDropdown}
          noCaret
          dropup={dropup}
          className={className}
          id="langauge-dropdown"
        >
          {renderLanguages}
        </DropdownButton>
      );
    }
    return (
      <NavDropdown
        eventKey={2}
        title={language}
        noCaret
        onSelect={this.handleDropdown}
        id="basic-nav-dropdown"
      >
        {renderLanguages}
      </NavDropdown>
    );
  }
}

DropdownLanguage.propTypes = {
  locale: PropTypes.string,
  selectedLang: PropTypes.string,
  dropdownButton: PropTypes.bool,
  translate: PropTypes.func.isRequired,
  selectLanguage: PropTypes.func,
  handleLanguage: PropTypes.func,
  className: PropTypes.string,
  dropup: PropTypes.bool
};

DropdownLanguage.defaultProps = {
  locale: "",
  selectedLang: "",
  selectLanguage: () => {},
  handleLanguage: () => {},
  dropdownButton: false,
  className: "",
  dropup: false
};
export default DropdownLanguage;
