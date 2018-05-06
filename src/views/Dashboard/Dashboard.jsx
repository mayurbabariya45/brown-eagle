import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Nav, NavItem, Tab } from "react-bootstrap";
import { scroller, Element } from "react-scroll";
import { Confirm } from "../../components/Confirm/Confirm";
import PasswordContainer from "../../containers/AuthContainer/PasswordContainer";
import AvatarContainer from "../../containers/AuthContainer/AvatarContainer";
import ContentLoader from "../../components/Loader/Loader";
import Home from "./Home";
import Profile from "./Profile";
import Products from "./Products";
import noAvatar from "../../assets/img/no-avatar.png";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyForm: false,
      contactForm: false
    };
    this.handleEditForm = this.handleEditForm.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
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
  handleSubmitForm(values) {
    const { updateProfile, showNotification } = this.props;
    updateProfile(values).then(payload => {
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
    const {
      translate,
      logout,
      history,
      loading,
      showNotification,
      getProducts,
      getProduct,
      deleteProduct,
      products,
      upldateProductLoading
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
                            role={user && user.role}
                            id={user ? user.id : ""}
                            showNotification={showNotification}
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
                          <NavItem eventKey="second">
                            <i className="pe-7s-portfolio" />
                            {translate("d_products")}
                          </NavItem>
                          <NavItem eventKey="third">
                            <i className="pe-7s-users" />
                            {translate("profile")}
                          </NavItem>
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
                    </div>
                  </ContentLoader>
                </Col>
                <Col sm={9}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                      <Home {...this.props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Products
                        translate={translate}
                        loading={loading}
                        upldateProductLoading={upldateProductLoading}
                        id={user.id}
                        getProducts={getProducts}
                        getProduct={getProduct}
                        deleteProduct={deleteProduct}
                        showNotification={showNotification}
                        products={products}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Element name="myScrollToElement">
                        <Profile
                          {...this.props}
                          loading={loading}
                          contactForm={this.state.contactForm}
                          companyForm={this.state.companyForm}
                          handleEditForm={this.handleEditForm}
                          handleSubmitForm={this.handleSubmitForm}
                        />
                      </Element>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      <PasswordContainer
                        translate={translate}
                        hanldePasswordForm={this.hanldePasswordForm}
                        showNotification={showNotification}
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
  loading: PropTypes.bool.isRequired,
  upldateProductLoading: PropTypes.bool.isRequired,
  updateProfile: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired
};

export default Dashboard;
