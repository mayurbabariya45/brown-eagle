import _ from "lodash";
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
import Time from "react-time";
import BlockUi from "react-block-ui";
import moment from "moment";
import { Confirm } from "../../components/Confirm/Confirm";
import Button from "../../elements/CustomButton/CustomButton";
import { Card } from "../../components/Card/Card";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import noImage from "../../assets/img/no-product.png";

const preloader = () => <ContentLoader height={300} inFight />;
const OrderQuantity = ({
  quantity,
  price,
  handlePrice,
  handleQuantity,
  quantityError,
  priceError
}) => (
  <div>
    <Row>
      <Col md={6}>
        <FormGroup validationState={quantityError ? "error" : ""}>
          <ControlLabel>Quantity</ControlLabel>
          <FormControl
            type="number"
            defaultValue={quantity}
            bsClass="form-control form-control-simple"
            onChange={handleQuantity}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup validationState={priceError ? "error" : ""}>
          <ControlLabel>Unit price</ControlLabel>
          <FormControl
            type="number"
            defaultValue={price}
            bsClass="form-control form-control-simple"
            onChange={handlePrice}
          />
        </FormGroup>
      </Col>
    </Row>
  </div>
);
const ProductDetails = props => {
  const { buyer } = props;
  const { companyName, isProfileApproved } = buyer;
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
            {props.translate("o_seller_product_details_label")}
          </h4>
        </div>
      }
      content={
        <div className="product-infromation">
          <div className="seller-infromation">
            <div className="seller-company-name">
              <p>
                {companyName}{" "}
                {isProfileApproved === "pending" ? (
                  <span className="profile-pending label label-warning">
                    <i className="fa fa-clock-o" />{" "}
                    {props.translate("d_verify")}
                  </span>
                ) : (
                  <div>
                    <i className="icon-static icon-checked" />{" "}
                    <span>{props.translate("d_approved")}</span>
                  </div>
                )}
              </p>
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
              <div className="product-label">
                {_.capitalize(props.product.nameTranslations[props.locale])}
              </div>
              <div className="product-name">
                {`${props.price.currency} ${props.price.value} x ${
                  props.quantity
                } Units`}
                {/* <OrderQuantity
                  quantity={props.quantity}
                  price={props.price.value}
                  handleQuantity={props.handleQuantity}
                  handlePrice={props.handlePrice}
                  priceError={props.priceError}
                  quantityError={props.quantityError}
                /> */}
              </div>
            </div>
          </div>
          <div className="product-total">
            <p>
              <span>Commission: </span>
              {props.price.currency} {props.commission.toFixed(2)}
            </p>
            <p>
              <span>Seller Share: </span>
              {props.price.currency} {props.sellerShare.toFixed(2)}
            </p>
            <p>
              <span>Order Total: </span>
              {props.price.currency} {props.total.toFixed(2)}
            </p>
          </div>
        </div>
      }
    />
  );
};
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
              <p>{props.remark || "----"}</p>
            </div>
          </Col>
        </Row>
      </div>
    }
  />
);
const OrderButtons = props => (
  <Card
    className="card-text"
    plain
    content={
      <div className="order-action-buttons">
        {props.status === "pending" && (
          <Confirm
            onConfirm={() => props.handleOrderStatus("confirmed")}
            title={props.translate("confirm_title")}
            body={props.translate("confirm_confired_order_title")}
            confirmBSStyle="danger"
            confirmText={props.translate("confirm_button_yes")}
            cancelText={props.translate("confirm_cancelText")}
          >
            <Button fill radius bsStyle="warning">
              CONFIRM
            </Button>
          </Confirm>
        )}
        {props.status !== "rejected" && (
          <Confirm
            onConfirm={() => props.handleOrderStatus("rejected")}
            title={props.translate("confirm_title")}
            body={props.translate("confirm_rejected_order_title")}
            confirmBSStyle="danger"
            confirmText={props.translate("confirm_button_yes")}
            cancelText={props.translate("confirm_cancelText")}
          >
            <Button fill radius pullRight bsStyle="warning">
              REJECT
            </Button>
          </Confirm>
        )}
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
    this.state = {
      quantity: props.order.quantity,
      price: props.order.price.value,
      total: props.order.total,
      quantityError: false,
      priceError: false,
      touched: false
    };
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
  }
  componentWillMount() {
    const { getOrderTransactions, order, seller } = this.props;
    if (!_.isEmpty(order)) {
      const { id } = order;
      getOrderTransactions(id, seller);
    }
  }
  handleQuantity(e) {
    const value = e.target.value;
    if (value < 1) {
      this.setState({
        quantityError: true
      });
      return false;
    }
    const total = value * this.state.price;
    this.setState({
      quantity: value,
      total,
      quantityError: false,
      touched: true
    });
    return false;
  }
  handlePrice(e) {
    const value = e.target.value;
    if (value < 1) {
      this.setState({
        priceError: true
      });
      return false;
    }
    const total = value * this.state.quantity;
    this.setState({
      price: value,
      total,
      priceError: false,
      touched: true
    });
    return false;
  }
  render() {
    const {
      translate,
      handleBackButton,
      order,
      handleOrderStatus,
      locale,
      loading,
      transactions,
      isLoading
    } = this.props;
    const {
      status,
      product,
      price,
      remarks,
      shippingAddress,
      shippingMethod,
      buyer,
      commission,
      sellerShare
    } = order;
    return (
      <div className="seller-order-view">
        <div className="go-back-button">
          <Button fill bsStyle="link" onClick={handleBackButton}>
            <i className="pe-7s-left-arrow" />
            {translate("q_back_button")}
          </Button>
        </div>
        <BlockUi tag="div" blocking={loading}>
          <div>
            <ProductDetails
              translate={translate}
              product={product}
              buyer={buyer}
              total={this.state.total}
              price={price}
              commission={commission}
              sellerShare={sellerShare}
              productPrice={this.state.price}
              quantity={this.state.quantity}
              locale={locale}
              handlePrice={this.handlePrice}
              handleQuantity={this.handleQuantity}
              priceError={this.state.priceError}
              quantityError={this.state.quantityError}
            />
            <ShippingAddress translate={translate} {...shippingAddress} />
            <ShippingOptions
              translate={translate}
              shippingMethod={shippingMethod || {}}
            />
            <OrderDetails translate={translate} remark={remarks} />
            <BlockUi tag="div" blocking={isLoading}>
              <OrderTransactions
                translate={translate}
                transactions={transactions}
              />
            </BlockUi>
            {status !== "rejected" && (
              <OrderButtons
                status={status}
                handleOrderStatus={handleOrderStatus}
                priceError={this.state.priceError}
                quantityError={this.state.quantityError}
                translate={translate}
              />
            )}
          </div>
        </BlockUi>
      </div>
    );
  }
}

ViewOrder.propTypes = {
  handleBackButton: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  payment: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired
};

export default ViewOrder;
