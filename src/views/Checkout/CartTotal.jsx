import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import BlockUi from "react-block-ui";
import { Row, Col } from "react-bootstrap";
import { Card } from "../../components/Card/Card";
import { getCurrency } from "../../variables/Variables";

const CartTotal = props => {
  const {
    translate,
    loading,
    cartItems,
    cartProductTotal,
    cartTotalPrice,
    price,
    selectedShipping
  } = props;
  const cardTotal = !_.isEmpty(selectedShipping)
    ? selectedShipping.TotalNet.Amount + cartTotalPrice
    : cartTotalPrice;
  return (
    <Row>
      <Col md={12}>
        <div className="cart">
          <Card
            className="card-text"
            plain
            content={
              <BlockUi tag="div" blocking={loading}>
                <Row>
                  <Col md={cartProductTotal > 0 ? 9 : 12}>
                    <div className="cart-items">{cartItems}</div>
                  </Col>
                  {cartProductTotal > 0 && (
                    <Col md={3}>
                      <div className="cart-details">
                        <div className="cart-details-header">
                          <h4>{translate("cart_details")}</h4>
                        </div>
                        <div className="cart-detail">
                          <ul>
                            <li>
                              <span>Price ({cartProductTotal} item)</span>
                              <span>
                                {getCurrency(
                                  (!_.isEmpty(price) && price.currency) || "EUR"
                                )}{" "}
                                {cartTotalPrice.toFixed(2)}
                              </span>
                            </li>

                            <li>
                              <span>Amount Payable</span>
                              <span>
                                {getCurrency(
                                  (!_.isEmpty(price) && price.currency) || "EUR"
                                )}{" "}
                                {cardTotal.toFixed(2)}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="cart-details-footer">
                          {/* <p>{translate("cart_total_label")}</p> */}
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </BlockUi>
            }
          />
        </div>
      </Col>
    </Row>
  );
};

CartTotal.propTypes = {
  translate: PropTypes.func.isRequired
};

export default CartTotal;
