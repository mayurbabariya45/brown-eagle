import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Nav, NavItem, Tab } from "react-bootstrap";
import { scroller } from "react-scroll";
import { Confirm } from "../../components/Confirm/Confirm";
import ContentLoader from "../../components/Loader/Loader";
import AvatarContainer from "../../containers/AuthContainer/AvatarContainer";
import PasswordContainer from "../../containers/AuthContainer/PasswordContainer";
import QuotationContainer from "../../containers/AccountContainer/QuotationContainer";
import OrdersContainer from "../../containers/AccountContainer/OrdersContainer";
import ProductFavouritesContainer from "../../containers/AccountContainer/ProductFavouritesContainer";
import Profile from "./Profile";
import noAvatar from "../../assets/img/no-avatar.png";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyForm: false,
      contactForm: false
    };
    this.handleEditForm = this.handleEditForm.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleEmailConfirmation = this.handleEmailConfirmation.bind(this);
  }
  componentWillMount() {
    const { removeAll } = this.props;
    removeAll();
  }
  handleEditForm(activeForm) {
    if (activeForm === 1) {
      this.setState({
        companyForm: !this.state.companyForm,
        contactForm: false
      });
      if (!this.state.companyForm) {
        scroller.scrollTo("myScrollToElement", { offset: 300, smooth: true });
      } else {
        scroller.scrollTo("myScrollToElement", { offset: -100, smooth: true });
      }
    } else {
      this.setState({
        companyForm: false,
        contactForm: !this.state.contactForm
      });
      if (!this.state.contactForm) {
        scroller.scrollTo("myScrollToElement", { offset: 120, smooth: true });
      } else {
        scroller.scrollTo("myScrollToElement", { offset: -100, smooth: true });
      }
    }
  }
  handleEmailConfirmation() {
    const {
      resendEmail,
      locale,
      auth,
      showNotification,
      translate
    } = this.props;
    const { user } = auth;
    if (!_.isEmpty(user)) {
      resendEmail(user.email, locale).then(payload => {
        if (payload.type === "VERIFY_EMAIL_SUCCESS") {
          showNotification(
            <span data-notify="icon" className="pe-7s-check" />,
            <div>{translate("notification_resend_email")}</div>,
            false
          );
        } else {
          showNotification(
            <span data-notify="icon" className="pe-7s-shield" />,
            <div>{payload.payload.response.message}</div>,
            true
          );
        }
      });
    }
  }
  handleSubmitForm(values) {
    const { updateProfile, showNotification, auth } = this.props;
    const { user } = auth;
    const authId = user.id;
    const authRole = user.role;
    const mergedValues = Object.assign({}, values, {
      contactPerson: {
        name: values.name,
        email: values.email,
        phone: values.phone
      }
    });
    delete values.name;
    delete values.email;
    delete values.phone;
    updateProfile(mergedValues, authId, authRole).then(payload => {
      if (payload.type === "UPDATE_PROFILE_SUCCESS") {
        window.scrollTo(0, 0);
        if (this.state.companyForm) {
          showNotification(
            <span data-notify="icon" className="pe-7s-check" />,
            <div>Company information has been saved.</div>,
            false
          );
          this.setState({ companyForm: false });
        } else {
          showNotification(
            <span data-notify="icon" className="pe-7s-check" />,
            <div>Contact information has been saved.</div>,
            false
          );
          this.setState({ contactForm: false });
        }
      } else if (payload.type === "UPDATE_PROFILE_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{payload.payload.response.message}</div>,
          true
        );
      }
    });
  }
  render() {
    const { translate, logout, history, showNotification, locale } = this.props;
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
                            Orders
                          </NavItem>
                          <NavItem eventKey="third">
                            <i className="pe-7s-users" />
                            {translate("my_quotations")}
                          </NavItem>
                          <NavItem eventKey="fourth">
                            <i className="pe-7s-like" />
                            {translate("my_favourites")}
                          </NavItem>
                          <NavItem eventKey="fifth">
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
                  </ContentLoader>
                </Col>
                <Col sm={9}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                      <Profile
                        {...this.props}
                        contactForm={this.state.contactForm}
                        companyForm={this.state.companyForm}
                        handleEditForm={this.handleEditForm}
                        handleSubmitForm={this.handleSubmitForm}
                        handleEmailConfirmation={this.handleEmailConfirmation}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      {!_.isEmpty(user) && (
                        <OrdersContainer
                          buyerId={user.id}
                          locale={locale}
                          translate={translate}
                          showNotification={showNotification}
                        />
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      {!_.isEmpty(user) && (
                        <QuotationContainer
                          buyerId={user.id}
                          locale={locale}
                          translate={translate}
                          showNotification={showNotification}
                        />
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      {!_.isEmpty(user) && (
                        <ProductFavouritesContainer
                          buyerId={user.id}
                          locale={locale}
                          translate={translate}
                          showNotification={showNotification}
                        />
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
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
