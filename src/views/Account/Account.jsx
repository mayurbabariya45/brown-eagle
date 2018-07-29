import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Nav, NavItem, Tab } from "react-bootstrap";
import { Confirm } from "../../components/Confirm/Confirm";
import AvatarContainer from "../../containers/AuthContainer/AvatarContainer";
import PasswordContainer from "../../containers/AuthContainer/PasswordContainer";
import QuotationContainer from "../../containers/AccountContainer/QuotationContainer";
import Profile from "./Profile";
import noAvatar from "../../assets/img/no-avatar.png";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const { removeAll } = this.props;
    removeAll();
  }
  render() {
    const { translate, logout, history, showNotification, locale } = this.props;
    const { user } = this.props.auth;
    const avatar = user ? (user.picture ? user.picture : noAvatar) : "";
    return (
      <section className="section-dashboard">
        <Grid>
          <Row>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Col md={12}>
                <Col sm={3}>
                  <div className="sidebar">
                    <div className="sidebar-user">
                      <div className="image" />
                      <div className="content">
                        <AvatarContainer
                          avatar={avatar}
                          translate={translate}
                          showNotification={showNotification}
                          id={user ? user.id : ""}
                          name={user && `${user.firstName} ${user.lastName}`}
                        />
                      </div>
                    </div>
                    <div className="sidebar-nav">
                      <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="first">
                          <i className="pe-7s-users" />
                          {translate("profile")}
                        </NavItem>
                        <NavItem eventKey="second">
                          <i className="pe-7s-users" />
                          {translate("my_quotations")}
                        </NavItem>
                        <NavItem eventKey="third">
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
                  </div>
                </Col>
                <Col sm={9}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                      <Profile {...this.props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      {!_.isEmpty(user) && (
                        <QuotationContainer
                          buyerId={user.id}
                          locale={locale}
                          translate={translate}
                          showNotification={showNotification}
                        />
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <PasswordContainer
                        translate={translate}
                        showNotification={showNotification}
                        hanldePasswordForm={this.hanldePasswordForm}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Col>
            </Tab.Container>
          </Row>
        </Grid>
      </section>
    );
  }
}

Account.propTypes = {
  translate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired
};

export default Account;
