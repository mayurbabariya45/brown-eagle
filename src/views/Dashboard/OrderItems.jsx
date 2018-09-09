import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import BlockUi from "react-block-ui";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import Button from "../../elements/CustomButton/CustomButton";
import noImage from "../../assets/img/no-product.png";
import { getCurrency } from "../../variables/Variables";
import Modal from "../../components/Modal/Modal";

const preloader = () => <ContentLoader height={300} inFight />;
const status = [
  "pending",
  "confirmed",
  "payment_pending",
  "shipped",
  "delivered",
  "rejected",
  "cancelled"
];
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
  let productUrl;
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
              {!_.isEmpty(props.buyer.companyName) &&
                `Buyer: ${props.buyer.companyName}`}
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
              <span>Order remarks</span>:
              {props.remarks}
            </p>
          </div>
        </div>
      </div>
      <OrderStatus
        status={props.status}
        showOrderStatusModal={props.showOrderStatusModal}
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
                showOrderStatusModal={() =>
                  props.showOrderStatusModal(order.id)
                }
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
    <Modal
      show={props.showModal}
      onHide={props.showOrderStatusModal}
      bHeader="Order Status"
      bContent={
        <BlockUi tag="div" blocking={props.loading}>
          <div className="change-order-status">
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Order Status</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={props.handleChangeOrderStatus}
              >
                <option value="select">Change Status</option>
                {_.map(status, value => (
                  <option key={value} value={value}>
                    {_.capitalize(value)}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
          </div>
        </BlockUi>
      }
    />
  </div>
);

OrderItems.propTypes = {
  onPageChanged: PropTypes.func.isRequired
};

export default OrderItems;
