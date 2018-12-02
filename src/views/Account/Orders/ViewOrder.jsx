import _ from "lodash";
import className from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import moment from "moment";
import BlockUi from "react-block-ui";
import Time from "react-time";
import Button from "../../../elements/CustomButton/CustomButton";
import { Card } from "../../../components/Card/Card";
import Payment from "./Payment";
import ImageLoader from "../../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../../components/Loader/Loader";
import noImage from "../../../assets/img/no-product.png";

const preloader = () => <ContentLoader height={300} inFight />;

const OrderStatus = props => (
  <div className="next-step next-step-circle next-step-horizontal">
    <div
      className={className(
        "next-step-item next-step-item-first next-step-item-read-only",
        {
          "next-step-item-process": props.status === "pending",
          "next-step-item-wait": props.status !== "pending"
        }
      )}
    >
      <div className="next-step-item-tail">
        <div className="next-step-item-tail-underlay">
          <div className="next-step-item-tail-overlay" />
        </div>
      </div>
      <div className="next-step-item-container">
        <div className="next-step-item-node">
          <div className="next-step-item-node-circle">1</div>
        </div>
        <div className="next-step-item-title">
          {props.translate("o_start_order")}
        </div>
      </div>
    </div>
    <div
      className={className("next-step-item next-step-item-read-only", {
        "next-step-item-process": props.status === "confirmed",
        "next-step-item-wait": props.status !== "confirmed"
      })}
    >
      <div className="next-step-item-tail">
        <div className="next-step-item-tail-underlay">
          <div className="next-step-item-tail-overlay" />
        </div>
      </div>
      <div className="next-step-item-container">
        <div className="next-step-item-node">
          <div className="next-step-item-node-circle">2</div>
        </div>
        <div className="next-step-item-title">
          {props.translate("o_seller_confirm")}
        </div>
      </div>
    </div>
    <div
      className={className("next-step-item next-step-item-read-only", {
        "next-step-item-process": props.status === "payment_pending",
        "next-step-item-wait": props.status !== "payment_pending"
      })}
    >
      <div className="next-step-item-tail">
        <div className="next-step-item-tail-underlay">
          <div className="next-step-item-tail-overlay" />
        </div>
      </div>
      <div className="next-step-item-container">
        <div className="next-step-item-node">
          <div className="next-step-item-node-circle">3</div>
        </div>
        <div className="next-step-item-title">
          {props.translate("o_payment")}
        </div>
      </div>
    </div>
    <div
      className={className("next-step-item next-step-item-read-only", {
        "next-step-item-process": props.status === "shipped",
        "next-step-item-wait": props.status !== "shipped"
      })}
    >
      <div className="next-step-item-tail">
        <div className="next-step-item-tail-underlay">
          <div className="next-step-item-tail-overlay" />
        </div>
      </div>
      <div className="next-step-item-container">
        <div className="next-step-item-node">
          <div className="next-step-item-node-circle">4</div>
        </div>
        <div className="next-step-item-title">
          {props.translate("o_shipment")}
        </div>
      </div>
    </div>
    <div
      className={className(
        "next-step-item next-step-item-last next-step-item-read-only",
        {
          "next-step-item-process": props.status === "delivered",
          "next-step-item-wait": props.status !== "delivered"
        }
      )}
    >
      <div className="next-step-item-tail">
        <div className="next-step-item-tail-underlay">
          <div className="next-step-item-tail-overlay" />
        </div>
      </div>
      <div className="next-step-item-container">
        <div className="next-step-item-node">
          <div className="next-step-item-node-circle">5</div>
        </div>
        <div className="next-step-item-title">
          {props.translate("o_success")}
        </div>
      </div>
    </div>
  </div>
);

const Introduce = () => (
  <div className="introduce-block">
    {/* <div className="introduce-title">Draft Trade Assurance Order</div> */}
    <div className="introduce-list">
      <div className="feature">
        <i className="icon-static icon-checked" />
        <span>Payment Security</span>
      </div>
      <div className="feature">
        <i className="icon-static icon-checked" />
        <span>Quality of Product</span>
      </div>
      <div className="feature">
        <i className="icon-static icon-checked" />
        <span>Deliver on time</span>
      </div>
    </div>
  </div>
);
const ProductDetails = props => {
  const { product, grandTotal, shippingCharges, createdAt } = props;
  const { seller } = product;
  const { companyName } = seller;
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
    <Card
      className="card-profile"
      plain
      header={
        <div className="header card-header-action">
          <h4 className="title">
            {props.translate("o_product_details_label")}
          </h4>
        </div>
      }
      content={
        <div className="product-infromation">
          <div className="seller-infromation">
            <div className="seller-company-name">
              <p>{companyName}</p>
            </div>
            <div className="chat-button">
              <Link to="#" className="btn btn-fill btn-warning">
                Chat
              </Link>
            </div>
          </div>
          <div className="product-details">
            <div className="image-container">
              <Link to={productUrl} className="photo product-item-photo">
                <ImageLoader preloader={preloader} src={productImages} />
              </Link>
            </div>
            <div className="product">
              <div className="product-label">{props.product.name}</div>
              <div className="product-name">
                {`${props.price.currency} ${props.price.value} x ${
                  props.quantity
                } Units`}
              </div>
            </div>
          </div>
          <div className="product-total">
            <p>
              <span>Total: </span>
              {props.price.currency} {props.total}
            </p>
          </div>
          <div className="product-total">
            <p>
              <span>Grand Total: </span>
              {(!_.isEmpty(grandTotal) && grandTotal.currency) || "EUR"}{" "}
              {(!_.isEmpty(grandTotal) && grandTotal.value) || "0"}
            </p>
          </div>
          <div className="product-total">
            <p>
              <span>Shipping Charge: </span>
              {(!_.isEmpty(shippingCharges) && shippingCharges.currency) ||
                "EUR"}{" "}
              {(!_.isEmpty(shippingCharges) && shippingCharges.value) || "0"}
            </p>
          </div>
          <div className="product-total">
            <p>
              <span>Date: </span>
              {!_.isEmpty(createdAt) &&
                moment(createdAt).format("DD/MM/YYYY")}{" "}
            </p>
          </div>
        </div>
      }
    />
  );
};

const PaymentMethod = props => (
  <Card
    className="card-profile"
    plain
    header={
      <div className="header card-header-action">
        <h4 className="title">{props.translate("o_payment_title")}</h4>
      </div>
    }
    content={<Payment {...props} />}
  />
);
const ShippingAddress = props => (
  <Card
    className="card-profile"
    plain
    header={
      <div className="header card-header-action">
        <h4 className="title">{props.translate("o_shipping_address")}</h4>
      </div>
    }
    content={
      <div>
        <Row>
          <Col md={12}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <ControlLabel>Name: </ControlLabel>
                  <FormControl.Static>{props.contactName}</FormControl.Static>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <ControlLabel>House No: </ControlLabel>
                  <FormControl.Static>{props.house}</FormControl.Static>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <ControlLabel>Street: </ControlLabel>
                  <FormControl.Static>{props.street}</FormControl.Static>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <ControlLabel>Landmark: </ControlLabel>
                  <FormControl.Static>{props.Landmark}</FormControl.Static>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <ControlLabel>City: </ControlLabel>
                  <FormControl.Static>{props.city}</FormControl.Static>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <ControlLabel>State: </ControlLabel>
                  <FormControl.Static>{props.state}</FormControl.Static>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <ControlLabel>Country: </ControlLabel>
                  <FormControl.Static>{props.country}</FormControl.Static>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <ControlLabel>Zipcode: </ControlLabel>
                  <FormControl.Static>{props.zipCode}</FormControl.Static>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <ControlLabel>Phone: </ControlLabel>
                  <FormControl.Static>{props.phone}</FormControl.Static>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    }
  />
);
const ShippingOptions = props => {
  if (_.isEmpty(props.shippingMethod)) return null;
  const { TotalNet, Charges, DeliveryTime } = props.shippingMethod;
  return (
    <Card
      className="card-profile"
      plain
      header={
        <div className="header card-header-action">
          <h4 className="title">{props.translate("o_shipping_options")}</h4>
        </div>
      }
      content={
        <div>
          <Row>
            <Col md={12}>
              <Row>
                {!_.isEmpty(Charges) && (
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Selected Shipping: </ControlLabel>
                      <FormControl.Static>
                        {Charges.Charge[0].ChargeType}
                      </FormControl.Static>
                    </FormGroup>
                  </Col>
                )}
                {!_.isEmpty(Charges) && (
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Selected Shipping Charge: </ControlLabel>
                      <FormControl.Static>
                        {Charges.Currency || "EUR"}{" "}
                        {Charges.Charge[0].ChargeAmount}
                      </FormControl.Static>
                    </FormGroup>
                  </Col>
                )}
                <Col md={6}>
                  <FormGroup>
                    <ControlLabel>Delivery Charge:</ControlLabel>
                    <FormControl.Static>
                      {TotalNet && TotalNet.Currency}{" "}
                      {TotalNet && TotalNet.Amount}
                    </FormControl.Static>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <ControlLabel>Delivery Date: </ControlLabel>
                    <FormControl.Static>
                      {moment(DeliveryTime).format("DD/MM/YYYY")}
                    </FormControl.Static>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      }
    />
  );
};
const OrderDetails = props => (
  <Card
    className="card-profile"
    plain
    header={
      <div className="header card-header-action">
        <h4 className="title">{props.translate("o_order_details")}</h4>
      </div>
    }
    content={
      <div className="order-details">
        <Row>
          <Col md={12}>
            <div className="order-remark">
              <p>{props.remarks || "----"}</p>
            </div>
          </Col>
        </Row>
      </div>
    }
  />
);
const OrderStatusText = ({ status, translate }) => (
  <Card
    className="card-profile"
    plain
    header={
      <div className="header card-header-action">
        <h4 className="title">{translate("o_order_status")}</h4>
      </div>
    }
    content={<div>Waiting for supplier to confirm order</div>}
  />
);

const OrderButtons = props => (
  <Card
    className="card-text"
    plain
    content={
      <div className="order-action-buttons">
        <Button fill radius bsStyle="warning">
          CANCEL
        </Button>
        <Button fill radius pullRight bsStyle="warning">
          TRACK
        </Button>
      </div>
    }
  />
);
const OrderTransactions = props => (
  <Card
    className="card-profile"
    plain
    header={
      <div className="header card-header-action">
        <h4 className="title">{props.translate("o_transactions")}</h4>
      </div>
    }
    content={
      <div>
        <div className="tracking-list">
          {_.map(props.transactions, (transaction, index) => (
            <div className="tracking-item">
              <div className="tracking-icon status-intransit">
                <svg
                  className="svg-inline--fa fa-circle fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                  />
                </svg>
              </div>
              <div className="tracking-date">
                <Time value={transaction.createdAt} format="MMM DD, Y" />
                <span>
                  <Time value={transaction.createdAt} format="hh:mm A" />
                </span>
              </div>
              <div className="tracking-content">{transaction.text}</div>
            </div>
          ))}
        </div>
      </div>
    }
  />
);
class ViewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const {
      getOrderTransactions,
      getTermAndCondition,
      order,
      location,
      buyerId
    } = this.props;
    if (!_.isEmpty(order)) {
      const { id } = order;
      getOrderTransactions(buyerId, id);
      getTermAndCondition(location);
    }
  }
  render() {
    const {
      translate,
      handleBackButton,
      handlePaymentMethod,
      order,
      payment,
      showNotification,
      transactions,
      isLoading,
      termsAndConditions
    } = this.props;
    const {
      status,
      product,
      total,
      price,
      quantity,
      remarks,
      shippingAddress,
      grandTotal,
      shippingCharges,
      shippingMethod,
      createdAt
    } = order;
    return (
      <div>
        <div className="go-back-button">
          <Button fill bsStyle="link" onClick={handleBackButton}>
            <i className="pe-7s-left-arrow" />
            {translate("q_back_button")}
          </Button>
        </div>
        <OrderStatus status={status} translate={translate} />
        <Introduce />
        <OrderStatusText translate={translate} />
        <ProductDetails
          translate={translate}
          product={product}
          total={total}
          price={price}
          createdAt={createdAt}
          quantity={quantity}
          grandTotal={grandTotal}
          shippingCharges={shippingCharges}
        />
        <ShippingAddress translate={translate} {...shippingAddress} />
        <ShippingOptions
          translate={translate}
          shippingMethod={shippingMethod || {}}
        />
        <OrderDetails translate={translate} remarks={remarks} />
        {status === "payment_pending" && (
          <PaymentMethod
            translate={translate}
            payment={payment}
            orderId={order.id}
            showNotification={showNotification}
            handlePaymentMethod={handlePaymentMethod}
            termsAndConditions={termsAndConditions}
          />
        )}
        {/* <OrderButtons /> */}
        <BlockUi tag="div" blocking={isLoading}>
          <OrderTransactions
            translate={translate}
            transactions={transactions}
          />
        </BlockUi>
      </div>
    );
  }
}

ViewOrder.propTypes = {
  handleBackButton: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  payment: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  getOrderTransactions: PropTypes.func.isRequired,
  handlePaymentMethod: PropTypes.func.isRequired
};

export default ViewOrder;
