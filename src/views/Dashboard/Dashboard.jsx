import _ from "lodash";
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
    const mainProduct = props.auth.user.profile;
    this.state = {
      companyForm: false,
      contactForm: false,
      value: mainProduct
        ? _.map(mainProduct.mainProducts, product => ({
            value: product,
            label: product
          }))
        : []
    };
    this.handleEditForm = this.handleEditForm.bind(this);
    this.hanldePasswordForm = this.hanldePasswordForm.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.openFileUploader = this.openFileUploader.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  onChangeFile(event) {
    const { updateAvatar } = this.props;
    const { user } = this.props.auth;
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({ picture: window.URL.createObjectURL(file) });
    const form = new FormData();
    form.append("image", file);
    updateAvatar(form, user.id);
  }
  openFileUploader() {
    this.profileUploader.click();
  }
  handleSelectChange(value) {
    console.log("You have selected: ", value);
    this.setState({ value });
    console.log(_.map(value, "value"));
  }
  handleEditForm(activeForm) {
    if (activeForm === 1) {
      this.setState({ companyForm: !this.state.companyForm });
    } else {
      this.setState({ contactForm: !this.state.contactForm });
    }
  }
  hanldePasswordForm(value) {
    const { changePassword, auth } = this.props;
    const obj = Object.assign(
      {},
      {
        id: auth.user.id,
        password: value.password
      }
    );
    changePassword(obj);
  }
  handleSubmitForm(value, form) {
    const { updateProfile } = this.props;
    const socialLinks = [];
    if (value.facebook) {
      socialLinks.push({
        platform: "facebook",
        link: value.facebook
      });
    }
    if (value.twitter) {
      socialLinks.push({
        platform: "twitter",
        link: value.twitter
      });
    }
    if (value.google) {
      socialLinks.push({
        platform: "google",
        link: value.google
      });
    }
    const profile = {
      mainProducts: _.map(this.state.value, "value"),
      established: value.established,
      website: value.website,
      businessType: value.businessType,
      employeeCount: value.employeeCount,
      registeredAddress: value.registeredAddress,
      operationalAddress: value.operationalAddress,
      aboutUs: value.aboutUs,
      p_selling: value.p_selling
    };
    updateProfile({ ...value, socialLinks, profile });
    if (this.state.companyForm) {
      this.setState({ companyForm: false });
    } else {
      this.setState({ contactForm: false });
    }
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
                        <div className="author" onClick={this.openFileUploader}>
                          <div className="avatar border-gray">
                            <img
                              src={
                                this.state.picture ? this.state.picture : avatar
                              }
                              alt="..."
                            />
                            <p className="text-label">
                              <i className="pe-7s-camera" />
                              Upload Profile Picture
                            </p>
                            <input
                              className="imageUpload"
                              ref={input => {
                                this.profileUploader = input;
                              }}
                              onChange={this.onChangeFile.bind(this)}
                              type="file"
                              name="profile_photo"
                              placeholder="Photo"
                              capture
                            />
                          </div>

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
                        value={this.state.value}
                        handleSubmit={handleSubmit}
                        handleSubmitForm={this.handleSubmitForm}
                        handleSelectChange={this.handleSelectChange}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Password
                        translate={translate}
                        loading={loading}
                        message={message}
                        success={success}
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
  loading: PropTypes.bool.isRequired,
  updateProfile: PropTypes.func.isRequired
};

export default Dashboard;
