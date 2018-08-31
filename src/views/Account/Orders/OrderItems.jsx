import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import Pagination from "../../../components/Pagination/Pagination";
import ImageLoader from "../../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../../components/Loader/Loader";
import Button from "../../../elements/CustomButton/CustomButton";
import noImage from "../../../assets/img/no-product.png";
import { getCurrency } from "../../../variables/Variables";

const preloader = () => <ContentLoader height={300} inFight />;

const OrderStatus = props => (
  <div className="box-container-button">
    <div className="box-button">
      <Button fill bsStyle="warning" className="open">
        {props.status}
      </Button>
    </div>
  </div>
);

const OrderItem = props => {
  let productImages;
  if (!_.isEmpty(props.product)) {
    const { productPictures } = props.product;
    if (!_.isEmpty(productPictures)) {
      productImages = productPictures[0].url;
    } else {
      productImages = noImage;
    }
  }
  return (
    <div className="box-list-items">
      <div className="box-list-item-details">
        <div className="box-list-title">
          <h3>{_.capitalize(props.product.nameTranslations[props.locale])}</h3>
        </div>
        {/* <div className="box-list-rating-summary">
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
        </div> */}
        <div className="image-container">
          <div className="product-image-container">
            <a
              href="#products"
              className="product photo product-item-photo"
            >
              <ImageLoader preloader={preloader} src={productImages} />
            </a>
          </div>
        </div>
        <div className="box-list-item-detail">
          <div className="box-list-item-desc">
            <p>
              <span>Seller</span>: {props.seller.companyName}
            </p>
            <p>
              <span>Total</span>: {getCurrency(props.price.currency)}
              {props.total}
            </p>
            <p>
              <span>Quantity</span>:
              {props.quantity}
            </p>
          </div>
        </div>
      </div>
      <OrderStatus status={props.status} />
    </div>
  );
}

const OrderItems = props => (
  <div>
    <Row>
      <Col md={12}>
        <BlockUi tag="div" blocking={props.loading}>
          <div>
            {_.map(props.orders, order => (
              <OrderItem key={order.id} {...order} locale={props.locale} />
            ))}
          </div>
        </BlockUi>
      </Col>
    </Row>
    <Pagination
      totalRecords={props.count || 0}
      pageLimit={20}
      pageNeighbours={1}
      onPageChanged={props.onPageChanged}
    />
  </div>
);

OrderItems.propTypes = {
  onPageChanged: PropTypes.func.isRequired
};

export default OrderItems;
