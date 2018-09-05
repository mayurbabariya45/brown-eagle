import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, Collapse } from "react-bootstrap";
import { Confirm } from "../../components/Confirm/Confirm";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: { orders: false, contacts: false, quotation: false }
    };
    this.handleCollpased = this.handleCollpased.bind(this);
  }
  handleCollpased(e, key) {
    e.preventDefault();
    const { collapse } = this.state;
    _.forEach(collapse, (value, index) => {
      if (index === key) {
        _.assignIn(collapse, { [index]: !value });
      } else {
        _.assignIn(collapse, { [index]: false });
      }
    });
    this.setState({ collapse });
  }
  render() {
    const { translate, logout, history } = this.props;
    return (
      <div
        className="sidebar-nav"
        ref={element => {
          this.sidebarNav = element;
        }}
      >
        <Nav bsStyle="pills" stacked>
          <NavItem eventKey="first">
            <i className="pe-7s-home" />
            {translate("home")}
          </NavItem>
          <NavItem eventKey="second">
            <i className="pe-7s-users" />
            {translate("profile")}
          </NavItem>
          <NavItem eventKey="third">
            <i className="pe-7s-portfolio" />
            {translate("d_products")}
          </NavItem>
          <NavItem eventKey="five">
            <i className="pe-7s-chat" />
            {translate("d_messages")}
          </NavItem>
          <li>
            <a
              href="/#/"
              role="tab"
              data-toggle="collapse"
              aria-expanded={this.state.collapse.orders}
              onClick={e => this.handleCollpased(e, "orders")}
            >
              <i className="pe-7s-portfolio" />
              {translate("d_orders")}
              <span className="pe-7s-angle-right" />
            </a>
            <Collapse in={this.state.collapse.orders}>
              <div>
                <Nav>
                  <NavItem eventKey="six">{translate("d_all_orders")}</NavItem>
                </Nav>
              </div>
            </Collapse>
          </li>
          <li>
            <a
              href="/#/"
              role="tab"
              data-toggle="collapse"
              aria-expanded={this.state.collapse.contacts}
              onClick={e => this.handleCollpased(e, "contacts")}
            >
              <i className="pe-7s-users" />
              {translate("d_contacts")}
              <span className="pe-7s-angle-right" />
            </a>
            <Collapse in={this.state.collapse.contacts}>
              <div>
                <Nav>
                  <NavItem>All Orders</NavItem>
                </Nav>
              </div>
            </Collapse>
          </li>
          <li>
            <a
              href="/#/"
              role="tab"
              data-toggle="collapse"
              aria-expanded={this.state.collapse.quotation}
              onClick={e => this.handleCollpased(e, "quotation")}
            >
              <i className="pe-7s-portfolio" />
              {translate("d_quotations")}
              <span className="pe-7s-angle-right" />
            </a>
            <Collapse in={this.state.collapse.quotation}>
              <div>
                <Nav>
                  <NavItem eventKey="ten">{translate("d_my_quotes")}</NavItem>
                  <NavItem eventKey="eleven">
                    {translate("request_for_quotation")}
                  </NavItem>
                </Nav>
              </div>
            </Collapse>
          </li>
          <NavItem eventKey="fourth">
            <i className="pe-7s-lock" />
            {translate("d_change_password")}
          </NavItem>
          <Confirm
            onConfirm={() => {
              logout();
              history.push("/");
            }}
            title={translate("confirm_title")}
            body={translate("confirm_logout")}
            confirmBSStyle="danger"
            confirmText={translate("confirm_button_yes")}
            cancelText={translate("confirm_cancelText")}
          >
            <NavItem>
              <i className="pe-7s-users" />
              {translate("logout")}
            </NavItem>
          </Confirm>
        </Nav>
      </div>
    );
  }
}
Sidebar.propTypes = {
  translate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
export default Sidebar;
