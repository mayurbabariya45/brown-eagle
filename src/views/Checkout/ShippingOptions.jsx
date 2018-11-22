import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Row, Col, FormGroup } from "react-bootstrap";
import { Card } from "../../components/Card/Card";
import Select from "../../elements/CustomSelect/CustomSelect";
import { getCurrency } from "../../variables/Variables";

class ShippingOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionIndex: null,
      selectedValues: false
    };
    this.handleSelectValue = this.handleSelectValue.bind(this);
  }
  handleSelectValue(value) {
    const { shippingOptions } = this.props;
    this.setState({ selectedChargeAmount: value.value, selectedValues: true });
    this.props.selectShippingOption(shippingOptions[value.value]);
  }
  render() {
    const { translate, shippingOptions, selectedShipping } = this.props;
    let options = [];
    const chargeOptions = [];
    options = _.map(shippingOptions, (option, index) => {
      if (!_.isEmpty(option.Charges)) {
        chargeOptions.push(option.Charges.Charge);
        const { ChargeType } = option.Charges.Charge[0];
        return {
          value: index,
          label: ChargeType
        };
      }
    });

    return (
      <div className="order-remarks">
        <Row>
          <Col md={12}>
            <Card
              className="card-profile"
              plain
              footer
              header={
                <div className="header card-header-action">
                  <h4 className="title">
                    {translate("c_shipping_option_label")}
                  </h4>
                </div>
              }
              content={
                <div>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Select
                          searchable
                          options={options.filter(n => n)}
                          handleSelectValue={this.handleSelectValue}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {!_.isEmpty(selectedShipping) && (
                    <Row>
                      <Col md={12}>
                        <div className="shipping-options-charges">
                          <p>
                            <b>Delivery Charge: </b>
                            {getCurrency(
                              (!_.isEmpty(selectedShipping.TotalNet) &&
                              selectedShipping.TotalNet.Currency) ||
                                "EUR"
                            )}
                            {selectedShipping.TotalNet.Amount.toFixed(2)}
                          </p>
                          <p>
                            <b>Delivery Time: </b>
                            {moment(selectedShipping.DeliveryTime).format('DD/MM/YYYY')}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  )}
                </div>
              }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

ShippingOptions.propTypes = {
  translate: PropTypes.func.isRequired
};

export default ShippingOptions;
