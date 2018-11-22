import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Tab } from "react-bootstrap";
import { scroller, Element } from "react-scroll";
import PasswordContainer from "../../containers/AuthContainer/PasswordContainer";
import AvatarContainer from "../../containers/AuthContainer/AvatarContainer";
import QuotationContainer from "../../containers/QuotationContainer/SellerQuotationContainer";
import ReferencesContainer from "./References";
import SellerQuotationContainer from "../../containers/QuotationContainer/SellerQuotesContainer";
import ContentLoader from "../../components/Loader/Loader";
import Home from "./Home";
import Profile from "./Profile";
import Products from "./Products";
import Sidebar from "./Sidebar";
import OrdersContainer from "../../containers/DashboardContainer/OrderContainer";
import PaymentContainer from "../../containers/PaymentContainer/PaymentContainer";
import noAvatar from "../../assets/img/no-avatar.png";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyForm: false,
      contactForm: false,
      certificateForm: false
    };
    this.handleEditForm = this.handleEditForm.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleRemoveCertificate = this.handleRemoveCertificate.bind(this);
    this.handleUploadCertificateForm = this.handleUploadCertificateForm.bind(
      this
    );
    this.handleEditCertificateForm = this.handleEditCertificateForm.bind(this);
    this.handleEmailConfirmation = this.handleEmailConfirmation.bind(this);
    this.handleUploadVideo = this.handleUploadVideo.bind(this);
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
  handleEditCertificateForm() {
    this.setState({
      certificateForm: !this.state.certificateForm
    });
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
  handleUploadCertificateForm(values) {
    const {
      uploadCertificate,
      updateCertificate,
      auth,
      resetForm,
      showNotification
    } = this.props;
    const authId = auth.user.id;
    const { file, title } = values;
    uploadCertificate(file, authId).then(payload => {
      if (payload.type === "UPLOAD_CERTIFICATE_SUCCESS") {
        const { id } = payload.payload;
        updateCertificate({ title }, authId, id).then(response => {
          if (response.type === "UPDATE_CERTIFICATE_SUCCESS") {
            this.setState({ certificateForm: false });
            resetForm("sellerCertificateForm");
            showNotification(
              <span data-notify="icon" className="pe-7s-check" />,
              <div>Certificate has been added successfully.</div>,
              false
            );
          } else {
            showNotification(
              <span data-notify="icon" className="pe-7s-shield" />,
              <div>{response.payload.response.message}</div>,
              true
            );
          }
        });
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{payload.payload.response.message}</div>,
          true
        );
      }
    });
  }
  handleRemoveCertificate(id) {
    const { deleteCertificate, auth, showNotification } = this.props;
    const { user } = auth;
    const authId = user.id;
    deleteCertificate(authId, id).then(payload => {
      if (payload.type === "DELETE_CERTIFICATE_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Certificate has been deleted successfully.</div>,
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
  handleUploadVideo(value) {
    const { uploadVideo, auth, showNotification } = this.props;
    const { user } = auth;
    const authId = user.id;
    uploadVideo(value, authId).then(payload => {
      if (payload.type === "UPLOAD_VIDEO_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Video has been uploaded successfully.</div>,
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
  handleSubmitForm(values) {
    const { updateProfile, showNotification, auth, coordinates } = this.props;
    const { user } = auth;
    const authId = user.id;
    const authRole = user.role;
    const mergedValues = Object.assign({}, values, {
      contactPerson: {
        name: values.name,
        email: values.email,
        phone: values.phone
      },
      coordinates
    });
    delete mergedValues.name;
    delete mergedValues.email;
    delete mergedValues.phone;
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
      selectFilters,
      selectedFilter,
      error
    } = this.props;
    const { user, loader, activePlan, references, isLoading } = this.props.auth;
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
                          certificateForm={this.state.certificateForm}
                          handleEditForm={this.handleEditForm}
                          handleRemoveCertificate={this.handleRemoveCertificate}
                          handleEditCertificateForm={
                            this.handleEditCertificateForm
                          }
                          handleSubmitForm={this.handleSubmitForm}
                          handleUploadCertificateForm={
                            this.handleUploadCertificateForm
                          }
                          handleUploadVideo={this.handleUploadVideo}
                          showNotification={error}
                          handleEmailConfirmation={this.handleEmailConfirmation}
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
                          selectFilters={selectFilters}
                          selectedFilter={selectedFilter}
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
                    <Tab.Pane eventKey="twelve">
                      <PaymentContainer
                        translate={translate}
                        showNotification={showNotification}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="five">
                      {!_.isEmpty(user) && (
                        <ReferencesContainer
                          seller={user && user.id}
                          translate={translate}
                          references={user.references}
                          loading={isLoading}
                          locale={locale}
                          showNotification={showNotification}
                        />
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="six">
                      {!_.isEmpty(user) && (
                        <OrdersContainer
                          seller={user && user.id}
                          translate={translate}
                          locale={locale}
                          showNotification={showNotification}
                        />
                      )}
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
                          sellerProducts={products}
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
