import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { NavItem, Nav, NavDropdown, MenuItem, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchCategories from "../../containers/SearchCategoriesContainer/SearchCategoriesContainer";
import Categories from "../Categories/Categories";
import Languages from "../Languages/Languages";

const HeaderLinks = props => {
  const { translate, showHeader } = props;
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
                <MenuItem eventKey={1.1} href="/#/logout">
                  {translate("logout")}
                </MenuItem>
              )}
            </NavDropdown>
            <NavItem eventKey={2} href="#">
              <i className="pe-7s-shopbag" />
              {translate("cart")}
            </NavItem>
            <Languages {...props} />
          </Nav>
          <div className="clearfix" />
          <Row>
            <Nav>
              <LinkContainer to="/home" className="header-category-trigger">
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
                  <Categories />
                </li>
              </LinkContainer>
              <NavItem eventKey={2} href="#">
                {translate("services_membership")}
              </NavItem>
              <NavItem eventKey={2} href="#">
                {translate("purchase_region")}
              </NavItem>
              <NavItem eventKey={2} href="#">
                {translate("help_community")}
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
