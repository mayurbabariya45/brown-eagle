import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Nav, NavItem, Tab } from "react-bootstrap";
import AvatarContainer from "../../containers/AuthContainer/AvatarContainer";
import PasswordContainer from "../../containers/AuthContainer/PasswordContainer";
import Profile from "./Profile";
import noAvatar from "../../assets/img/no-avatar.png";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      translate,
      logout,
      history,
      loading,
      handleSubmit,
      message,
      success
    } = this.props;
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
                          <i className="pe-7s-lock" />
                          {translate("d_change_password")}
                        </NavItem>
                        <NavItem
                          onClick={e => {
                            e.preventDefault();
                            logout();
                            history.push("/");
                          }}
                        >
                          <i className="pe-7s-users" />
                          {translate("logout")}
                        </NavItem>
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
                      <PasswordContainer
                        translate={translate}
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

Account.propTypes = {};

export default Account;
