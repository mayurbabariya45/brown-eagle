import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Nav, NavItem, Tab } from "react-bootstrap";
import Home from "./Home";
import Profile from "./Profile/Profile";
import Password from "./Profile/Password";
import noAvatar from "../../assets/img/no-avatar.png";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyForm: false,
      contactForm: false
    };
    this.handleEditForm = this.handleEditForm.bind(this);
    this.hanldePasswordForm = this.hanldePasswordForm.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  hanldePasswordForm(value) {
    const { changePassword, auth } = this.props;
    const obj = Object.assign(
      {},
      {
        email: auth.user.email,
        password: value.password
      }
    );
    changePassword(obj);
  }
  handleEditForm(activeForm) {
    if (activeForm === 1) {
      this.setState({ companyForm: !this.state.companyForm });
    } else {
      this.setState({ contactForm: !this.state.contactForm });
    }
  }
  handleSubmitForm(value) {
    const { updateProfile } = this.props;
    updateProfile(value);
    this.setState({ contactForm: false });
  }
  render() {
    const { translate, logout, history, loading, handleSubmit } = this.props;
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
                        <div className="author">
                          <img
                            className="avatar border-gray"
                            src={avatar}
                            alt="..."
                          />
                          <h4 className="title">
                            {user && `${user.firstName} ${user.lastName}`}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar-nav">
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
                      <Home {...this.props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Profile
                        {...this.props}
                        contactForm={this.state.contactForm}
                        companyForm={this.state.companyForm}
                        handleEditForm={this.handleEditForm}
                        handleSubmit={handleSubmit}
                        handleSubmitForm={this.handleSubmitForm}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Password
                        translate={translate}
                        loading={loading}
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
Dashboard.propTypes = {
  translate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Dashboard;
