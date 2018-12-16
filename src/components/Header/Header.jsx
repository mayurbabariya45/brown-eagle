import React, { Component } from "react";
import PropTypes from "prop-types";
import classname from "classnames";
import { Navbar } from "react-bootstrap";
import HeaderLinks from "./HeaderLinks";
import Logo from "../../assets/img/logo.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarExists: false
    };
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
  }
  handleLanguage(lang) {
    const { setLocale } = this.props;
    setLocale(lang);
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
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
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
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
