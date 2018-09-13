import React from "react";
import PropTypes from "prop-types";
import { ControlLabel, Button } from "react-bootstrap";

const Quantity = props => {
  const { quantity, onIncrement, onDecrement, label, min = 1 } = props;
  return (
    <div className="product-qty">
      {!label && <ControlLabel>Quantity</ControlLabel>}
      <div className="control custom-qty">
        <div className="btn-minus">
          <Button
            disabled={quantity <= min}
            className="btn-radius btn-fill items"
            onClick={onDecrement}
          >
            <i className="fa fa-minus" />
          </Button>
        </div>
        <div className="input-text qty form-control">{quantity}</div>
        <div className="btn-plus">
          <Button className="btn-radius btn-fill items" onClick={onIncrement}>
            <i className="fa fa-plus" />
          </Button>
        </div>
      </div>
    </div>
  );
};
Quantity.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  label: PropTypes.bool
};
Quantity.defaultProps = {
  label: false
};
export default Quantity;
