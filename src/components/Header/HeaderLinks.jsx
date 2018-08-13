import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { NavItem, Nav, NavDropdown, MenuItem, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchCategories from "../../containers/SearchCategoriesContainer/SearchCategoriesContainer";
import CategoriesContainer from "../../containers/CategoriesContainer/CategoriesContainer";
import Languages from "../Languages/Languages";

const HeaderLinks = props => {
  const { translate, showHeader, logout, history, cartProductTotal } = props;
  const { user } = props.auth;
  const orders = (
    <div>
      {user.firstName ? (
        <small>{translate("sign_in_f", { username: user.firstName })}</small>
      ) : (
        <small>{translate("sign_in_h")}</small>
      )}
      <br />
      <span>{translate("your_orders")}</span>
      <b className="caret" />
    </div>
  );
  const categories = (
    <div>
      <i className="fa fa-bars" />
      {translate("categories")}
      <b className="caret" />
    </div>
  );
  switch (showHeader) {
    case "register":
      return (
        <Nav pullRight>
          <NavItem eventKey={1} href="/#/login">
            {translate("sign_in")}
          </NavItem>
          <NavItem eventKey={1} href="#">
            {translate("help")}
          </NavItem>
          <Languages {...props} />
        </Nav>
      );
    case "myAccount":
      return (
        <Nav pullRight>
          <NavItem className="content-link" eventKey={3} href="#">
            <i className="pe-7s-user" />
          </NavItem>
          <NavDropdown
            eventKey={2}
            title={translate("help")}
            id="help-nav-right"
          >
            <MenuItem eventKey={1.1} href="/#/login">
              {translate("help")}
            </MenuItem>
          </NavDropdown>
          <Languages {...props} />
        </Nav>
      );
    case "dashboard":
      return (
        <Nav pullRight>
          <NavItem className="content-link" eventKey={3} href="#">
            <i className="pe-7s-user" />
          </NavItem>
          <NavDropdown
            eventKey={2}
            title={translate("help")}
            id="help-nav-right"
          >
            <MenuItem eventKey={1.1} href="/#/login">
              {translate("help")}
            </MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#">
            {translate("trade_anssurance")}
          </NavItem>
          <Languages {...props} />
        </Nav>
      );
    default:
      return (
        <div>
          <SearchCategories {...props} />
          <Nav pullRight>
            <NavDropdown
              eventKey={1}
              title={orders}
              noCaret
              className="a"
              id="basic-nav-dropdown-right"
            >
              {_.isEmpty(user) && (
                <MenuItem eventKey={1.1} href="/#/login">
                  {translate("login")}
                </MenuItem>
              )}
              {_.isEmpty(user) && (
                <MenuItem eventKey={1.1} href="/#/register">
                  {translate("register")}
                </MenuItem>
              )}
              {!_.isEmpty(user) && (
                <MenuItem
                  eventKey={1.1}
                  href={
                    user.role === "buyer" ? "/#/my_account" : "/#/dashboard"
                  }
                >
                  {translate("my_account")}
                </MenuItem>
              )}
              {!_.isEmpty(user) && (
                <MenuItem
                  eventKey={1.1}
                  href="/#/logout"
                  onClick={e => {
                    e.preventDefault();
                    logout();
                    history.push("/");
                  }}
                >
                  {translate("logout")}
                </MenuItem>
              )}
            </NavDropdown>
            <NavItem eventKey={2} href="/#/cart" className="cart-link">
              <i className="icon-shopping-bag" />
              <span className="cart-total">{cartProductTotal}</span>
              {translate("cart")}
            </NavItem>
            <Languages {...props} />
          </Nav>
          <div className="clearfix" />
          <Row>
            <Nav>
              <LinkContainer to="/#/" className="header-category-trigger">
                <li
                  role="presentation"
                  className={classNames(
                    "header-category-wrapper trigger-active"
                  )}
                >
                  <Link
                    to="#"
                    role="button"
                    className="header-category-trigger"
                  >
                    {categories}
                  </Link>
                  <CategoriesContainer />
                </li>
              </LinkContainer>
              <NavItem eventKey={3} href="/#/services_membership">
                {translate("services_membership")}
              </NavItem>
              <NavItem eventKey={4} href="/#/purchase_region">
                {translate("purchase_region")}
              </NavItem>
              <NavItem eventKey={5} href="/#/help_community">
                {translate("help_community")}
              </NavItem>
              <NavItem eventKey={8} href="/#/compare">
                Compare Products
              </NavItem>
            </Nav>
          </Row>
        </div>
      );
  }
};
HeaderLinks.propTypes = {
  translate: PropTypes.func.isRequired,
  nav_links: PropTypes.bool
};
HeaderLinks.defaultProps = {
  nav_links: false
};
export default HeaderLinks;
