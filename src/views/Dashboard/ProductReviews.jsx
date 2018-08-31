import _ from "lodash";
import className from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import Button from "../../elements/CustomButton/CustomButton";
import Pagination from "../../components/Pagination/Pagination";
import ProductRatingContainer from "../../containers/ProductRatingContainer/ProductRatingContainer";

const ProductReviewItems = props => (
  <div className="box-list-items">
    <div className="box-list-item-details">
      <div className="box-list-title">
        <h3>{_.capitalize(props.titleTranslations[props.locale])}</h3>
      </div>
      <div className="box-item-inner">
        <div
          className="action action-status"
          onClick={props.handleProductReviewStatus}
        >
          <i
            className={className("fa", {
              "fa-toggle-on": props.status === "enabled",
              "fa-toggle-off": props.status === "disabled"
            })}
          />
        </div>
        <div
          className="action action-edit"
          onClick={props.handleShowRatingModal}
        >
          <i className="fa fa-pencil-square-o" />
        </div>
      </div>
      <div className="box-list-rating-summary">
        <div
          className="box-list-rating-result"
          title={`${props.rating / 5 * 100}%`}
        >
          <span
            style={{
              width: `${props.rating / 5 * 100}%`
            }}
          >
            <span>{`${props.rating / 5 * 100}%`}</span>
          </span>
        </div>
      </div>
      <div className="box-list-item-detail">
        <div className="box-list-item-desc">
          <p>{props.commentTranslations[props.locale]}</p>
        </div>
      </div>
    </div>
  </div>
);

class ProductReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      showRatingModal: false,
      initialValues: {}
    };
    this.handleProdutRatingModal = this.handleProdutRatingModal.bind(this);
    this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
    this.handleProductReviewStatus = this.handleProductReviewStatus.bind(this);
  }
  componentWillMount() {
    const { getProductReview, id } = this.props;
    if (!_.isEmpty(id)) {
      getProductReview(id, this.state.currentPage);
    }
  }
  onPageChanged = data => {
    const { currentPage } = data;
    const { getProductReview, id } = this.props;
    this.setState({ currentPage });
    if (id) {
      getProductReview(id, currentPage);
    }
    return false;
  };
  handleProdutRatingModal(review) {
    this.setState({ showRatingModal: !this.state.showRatingModal }, () => {
      if (this.state.showRatingModal) {
        this.setState({
          initialValues: {
            title: review.title,
            comment: review.comment,
            rating: review.rating,
            id: review.id
          }
        });
        return false;
      }
      this.setState({ initialValues: {} });
      return false;
    });
  }
  handleProductReviewStatus(review) {
    const {
      changeProductReviewStatus,
      showNotification,
      getProductReview,
      locale,
      id
    } = this.props;
    if (_.isEmpty(id)) return false;
    const status = review.status === "enabled" ? "disabled" : "enabled";
    changeProductReviewStatus(id, review.id, status, locale).then(response => {
      if (response.type === "CHANGE_PRODUCT_STATUS_REVIEW_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{response.payload.response.message}</div>,
          true
        );
      } else if (response.type === "CHANGE_PRODUCT_STATUS_REVIEW_SUCCESS") {
        getProductReview(id, this.state.currentPage, locale);
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>{`Review has been ${status} successfully`}</div>,
          false
        );
      }
    });
    return false;
  }
  handleRatingSubmit(values) {
    const {
      editProductReview,
      getProductReview,
      showNotification,
      id,
      locale
    } = this.props;
    if (_.isEmpty(id)) return false;
    editProductReview(values, id, values.id, locale).then(response => {
      if (response.type === "EDIT_PRODUCT_REVIEW_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{response.payload.response.message}</div>,
          true
        );
      } else if (response.type === "EDIT_PRODUCT_REVIEW_SUCCESS") {
        this.setState({ showRatingModal: false, initialValues: {} });
        getProductReview(id, this.state.currentPage, locale);
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Review has been updated successfully</div>,
          false
        );
      }
    });
    return false;
  }
  render() {
    const {
      translate,
      handleBackButton,
      reviews,
      loading,
      locale
    } = this.props;
    const { currentPage } = this.state;
    const { count, productReview } = reviews;
    const start = (currentPage - 1) * 20 + 1 || 0;
    let end = currentPage * 20 || 0;
    if (end > count) {
      end = count;
    }
    return (
      <div className="dashboard-product-reviews">
        <BlockUi tag="div" blocking={loading}>
          <Row>
            <Col md={12}>
              <div className="section-header">
                <div className="title">
                  <h5>{translate("d_products_review")}</h5>
                </div>
                <div className="product-reviews-button">
                  <Button fill bsStyle="link" onClick={handleBackButton}>
                    <i className="pe-7s-left-arrow" />
                    Back To Products
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="result-showing">
                <p>
                  Showing {start} – {end} review of {count} reviews
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="review-lists box-listings">
                {_.map(productReview, review => (
                  <ProductReviewItems
                    key={review.id}
                    {...review}
                    locale={locale}
                    handleShowRatingModal={() =>
                      this.handleProdutRatingModal(review)
                    }
                    handleProductReviewStatus={() =>
                      this.handleProductReviewStatus(review)
                    }
                  />
                ))}
              </div>
            </Col>
          </Row>
          <Pagination
            totalRecords={count || 0}
            pageLimit={20}
            pageNeighbours={1}
            onPageChanged={this.onPageChanged}
          />
          <ProductRatingContainer
            show={this.state.showRatingModal}
            onHide={this.handleProdutRatingModal}
            handleRatingSubmit={this.handleRatingSubmit}
            translate={translate}
            loader={loading}
            initialValues={this.state.initialValues}
          />
        </BlockUi>
      </div>
    );
  }
}

ProductReviews.propTypes = {
  handleBackButton: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  getProductReview: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  editProductReview: PropTypes.func.isRequired
};

export default ProductReviews;
