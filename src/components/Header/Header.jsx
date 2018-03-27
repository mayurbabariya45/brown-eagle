import React, { Component } from "react";
import PropTypes from "prop-types";
import classname from "classnames";
import { Navbar } from "react-bootstrap";
import HeaderLinks from "./HeaderLinks";
import Logo from "../../assets/img/logo.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLanguage = this.handleLanguage.bind(this);
  }
  handleLanguage(lang) {
    const { setLocale } = this.props;
    setLocale(lang);
  }
  render() {
    const { navLinks } = this.props;
    return (
      <Navbar className={classname({ "navbar-ct": !navLinks })}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/#/">
              <img src={Logo} alt="Brown Eagle" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <HeaderLinks {...this.props} handleLanguage={this.handleLanguage} />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
Header.propTypes = {
  setLocale: PropTypes.func.isRequired
};
export default Header;
