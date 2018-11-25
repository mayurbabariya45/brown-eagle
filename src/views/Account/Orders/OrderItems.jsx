import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import moment from "moment";
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
      <Button
        fill
        bsStyle="warning"
        className="view-order"
        onClick={props.handleViewOrder}
      >
        View Order
      </Button>
    </div>
  </div>
);

const OrderItem = props => {
  let productImages;
  let productUrl = "/products";
  if (!_.isEmpty(props.product)) {
    const { productPictures } = props.product;
    if (!_.isEmpty(productPictures)) {
      productImages = productPictures[0].url;
    } else {
      productImages = noImage;
    }
    productUrl = `/product/${_.kebabCase(props.product.name)}/${
      props.product._id
    }`;
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
            <Link to={productUrl} className="product photo product-item-photo">
              <ImageLoader preloader={preloader} src={productImages} />
            </Link>
          </div>
        </div>
        <div className="box-list-item-detail">
          <div className="box-list-item-desc">
            <p>
              <span>Seller</span>: {props.seller && props.seller.companyName}
            </p>
            <p>
              <span>Total</span>: {getCurrency(props.price.currency)}
              {props.total}
            </p>
            <p>
              <span>Quantity</span>:
              {props.quantity}
            </p>
            <p>
              <span>Date</span>:
              {moment(props.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
      </div>
      <OrderStatus
        status={props.status}
        handleViewOrder={props.handleViewOrder}
      />
    </div>
  );
};

const OrderItems = props => (
  <div>
    <Row>
      <Col md={12}>
        <BlockUi tag="div" blocking={props.loading}>
          <div>
            {_.map(props.orders, order => (
              <OrderItem
                key={order.id}
                {...order}
                locale={props.locale}
                handleViewOrder={() => props.handleViewOrder(order)}
              />
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
