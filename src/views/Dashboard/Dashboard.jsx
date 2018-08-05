import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Tab } from "react-bootstrap";
import { scroller, Element } from "react-scroll";
import PasswordContainer from "../../containers/AuthContainer/PasswordContainer";
import AvatarContainer from "../../containers/AuthContainer/AvatarContainer";
import QuotationContainer from "../../containers/QuotationContainer/SellerQuotationContainer";
import SellerQuotationContainer from "../../containers/QuotationContainer/SellerQuotesContainer";
import ContentLoader from "../../components/Loader/Loader";
import Home from "./Home";
import Profile from "./Profile";
import Products from "./Products";
import Sidebar from "./Sidebar";
import Orders from "./Orders";
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
    const {
      translate,
      logout,
      history,
      locale,
      loading,
      showNotification,
      getProducts,
      getProduct,
      deleteProduct,
      getProductReview,
      products,
      product,
      upldateProductLoading,
      productReviews,
      editProductReview,
      changeProductReviewStatus,
      getSellerActivePlans,
      error
    } = this.props;
    const { user, loader, activePlan } = this.props.auth;
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
                      <Sidebar
                        translate={translate}
                        logout={logout}
                        history={history}
                      />
                    </div>
                  </ContentLoader>
                </Col>
                <Col sm={9}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                      <Home {...this.props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Element name="myScrollToElement">
                        <Profile
                          {...this.props}
                          loading={loading}
                          contactForm={this.state.contactForm}
                          companyForm={this.state.companyForm}
                          handleEditForm={this.handleEditForm}
                          handleSubmitForm={this.handleSubmitForm}
                          showNotification={error}
                        />
                      </Element>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      {!_.isEmpty(user) && (
                        <Products
                          translate={translate}
                          loading={loading}
                          upldateProductLoading={upldateProductLoading}
                          id={user.id}
                          getProducts={getProducts}
                          getProduct={getProduct}
                          deleteProduct={deleteProduct}
                          showNotification={showNotification}
                          myProducts={products}
                          locale={locale}
                          product={product}
                          productReviews={productReviews}
                          getProductReview={getProductReview}
                          editProductReview={editProductReview}
                          changeProductReviewStatus={changeProductReviewStatus}
                        />
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      <PasswordContainer
                        translate={translate}
                        hanldePasswordForm={this.hanldePasswordForm}
                        showNotification={showNotification}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="six">
                      <Orders />
                    </Tab.Pane>
                    <Tab.Pane eventKey="ten">
                      {!_.isEmpty(user) && (
                        <SellerQuotationContainer
                          seller={user && user.id}
                          translate={translate}
                          locale={locale}
                        />
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="eleven">
                      {!_.isEmpty(user) && (
                        <QuotationContainer
                          seller={user && user.id}
                          activePlan={activePlan}
                          translate={translate}
                          showNotification={showNotification}
                          getSellerActivePlans={getSellerActivePlans}
                          locale={locale}
                        />
                      )}
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
