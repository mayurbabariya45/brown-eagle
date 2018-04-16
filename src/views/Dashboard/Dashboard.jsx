import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Nav, NavItem, Tab } from "react-bootstrap";
import PasswordContainer from "../../containers/AuthContainer/PasswordContainer";
import AvatarContainer from "../../containers/AuthContainer/AvatarContainer";
import { countries } from "../../variables/Variables";
import ContentLoader from "../../components/Loader/Loader";
import Home from "./Home";
import Profile from "./Profile";
import Products from "./Products";
import noAvatar from "../../assets/img/no-avatar.png";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const mainProduct = props.auth.user.profile;
    const rCountry = !_.isEmpty(props.auth.user)
      ? _.find(countries, [
          "label",
          props.auth.user.profile.registeredAddress.country
        ])
      : {};
    const oCountry = !_.isEmpty(props.auth.user)
      ? _.find(countries, [
          "label",
          props.auth.user.profile.operationalAddress.country
        ])
      : {};
    this.state = {
      companyForm: false,
      contactForm: false,
      value: mainProduct
        ? _.map(mainProduct.mainProducts, product => ({
            value: product,
            label: product
          }))
        : [],
      rCountry: {
        ...rCountry
      },
      oCountry: {
        ...oCountry
      }
    };
    this.handleEditForm = this.handleEditForm.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleRCountry = this.handleRCountry.bind(this);
    this.handleOCountry = this.handleOCountry.bind(this);
  }

  handleSelectChange(value) {
    this.setState({ value });
  }
  handleRCountry(value) {
    this.props.changeFieldValue("r_country", value.label);
    this.setState({ rCountry: value });
  }
  handleOCountry(value) {
    this.props.changeFieldValue("o_country", value.label);
    this.setState({ oCountry: value });
  }
  handleEditForm(activeForm) {
    if (activeForm === 1) {
      this.setState({ companyForm: !this.state.companyForm });
    } else {
      this.setState({ contactForm: !this.state.contactForm });
    }
  }
  handleChecked(value) {
    let {
      r_city,
      registeredAddress,
      r_area_code,
      r_country
    } = this.props.initialValues;
    let country = this.state.rCountry;
    if (value) {
      r_city = "";
      registeredAddress = "";
      r_area_code = "";
      r_country = "";
      country = {};
    }
    this.props.changeFieldValue("o_city", r_city);
    this.props.changeFieldValue("operationalAddress", registeredAddress);
    this.props.changeFieldValue("o_area_code", r_area_code);
    this.props.changeFieldValue("o_country", r_country);
    this.setState({ oCountry: country });
  }
  handleSubmitForm(value) {
    const { updateProfile, initialValues } = this.props;
    const {
      operationalAddress,
      registeredAddress,
      r_city,
      r_area_code,
      r_country,
      o_city,
      o_area_code,
      o_country
    } = initialValues;
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

      aboutUs: value.aboutUs,
      p_selling: value.p_selling,
      registeredAddress: {
        address: registeredAddress,
        city: r_city,
        country: r_country,
        areaCode: r_area_code
      },
      operationalAddress: {
        address: operationalAddress,
        city: o_city,
        country: o_country,
        areaCode: o_area_code
      }
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
    const { user, loader } = this.props.auth;
    const avatar = user ? (user.picture ? user.picture : noAvatar) : "";
    return (
      <section className="section-dashboard">
        <Grid>
          <Row>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Col md={12}>
                <Col sm={3}>
                  <ContentLoader height={950} inFight={loader}>
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
                            <i className="pe-7s-home" />
                            {translate("home")}
                          </NavItem>
                          {/* <NavItem eventKey="second">
                          <i className="pe-7s-portfolio" />
                          {translate("d_products")}
                        </NavItem> */}
                          <NavItem eventKey="third">
                            <i className="pe-7s-users" />
                            {translate("profile")}
                          </NavItem>
                          <NavItem eventKey="fourth">
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
                  </ContentLoader>
                </Col>
                <Col sm={9}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                      <Home {...this.props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Products {...this.props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Profile
                        {...this.props}
                        contactForm={this.state.contactForm}
                        companyForm={this.state.companyForm}
                        handleEditForm={this.handleEditForm}
                        value={this.state.value}
                        handleSubmit={handleSubmit}
                        handleSubmitForm={this.handleSubmitForm}
                        handleSelectChange={this.handleSelectChange}
                        handleChecked={this.handleChecked}
                        handleOCountry={this.handleOCountry}
                        handleRCountry={this.handleRCountry}
                        oCountry={this.state.oCountry}
                        rCountry={this.state.rCountry}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
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
Dashboard.propTypes = {
  translate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  updateProfile: PropTypes.func.isRequired
};

export default Dashboard;
