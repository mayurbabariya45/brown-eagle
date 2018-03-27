import _ from "lodash";
import React, { Component } from "react";
import { NavDropdown, MenuItem, DropdownButton } from "react-bootstrap";
import { languages } from "../../variables/Variables";

export default class DropdownLanguage extends Component {
  constructor(props) {
    super(props);
    this.handleDropdown = this.handleDropdown.bind(this);
  }
  handleDropdown(evt) {
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
    this.props.handleLanguage(evt);
  }
  render() {
    const { locale, translate, dropdownButton } = this.props;
    const renderLanguages = languages.map(
      ({ key, align, icon }) =>
        locale !== key && (
          <MenuItem key={key} eventKey={key}>
            <img src={icon} alt={key} />
            {translate(key).toUpperCase()}
          </MenuItem>
        )
    );
    const language = (
      <div>
        <i className="fa fa-globe" />
        <span>{translate(locale).toUpperCase()}</span>
        <b className="caret" />
        <p className="hidden-lg hidden-md">Localization</p>
      </div>
    );
    if (dropdownButton) {
      return (
        <DropdownButton
          title={language}
          onSelect={this.handleDropdown}
          noCaret
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
