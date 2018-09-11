import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  ControlLabel,
  FormControl,
  FormGroup
} from "react-bootstrap";
import { Card } from "../../components/Card/Card";
import ShippingAddressForm from "./form/ShippingAddressForm";

const ShippingAddressValues = props => (
  <Row>
    <Col md={12}>
      <Row>
        <Col md={4}>
          <FormGroup>
            <ControlLabel>Name: </ControlLabel>
            <FormControl.Static>
              {`${props.f_name} ${props.l_name}`}
            </FormControl.Static>
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
);
class ShippingAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: _.isEmpty(props.address) || false,
      remarks: ""
    };
    this.handleFormShow = this.handleFormShow.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { address, initialValues, saveAddress } = nextProps;
    if (_.isEmpty(address)) {
      saveAddress({ ...initialValues });
      this.setState({
        showForm: false
      });
    }
  }
  handleFormShow() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    const {
      translate,
      handleSubmit,
      saveAddress,
      address,
      initialValues,
      auth
    } = this.props;
    const { user } = auth;
    return (
      <div className="shipping-address">
        <Row>
          <Col md={12}>
            <Card
              className="card-profile"
              plain
              footer
              header={
                <div className="header card-header-action">
                  <h4 className="title">Shipping Address</h4>
                  <div className="actions-label">
                    {!_.isEmpty(address) && (
                     <div
                        className="action action-link"
                       onClick={this.handleFormShow}
                     >
                        {!this.state.showForm ? "Change" : "Close"}
                     </div>
                    )}
                  </div>
                </div>
              }
              content={
                <div>
                  {((this.state.showForm &&
                    (_.isEmpty(address) &&
                      _.isEmpty(user.operationalAddress))) ||
                    (this.state.showForm && !_.isEmpty(address))) && (
                    <ShippingAddressForm
                      translate={translate}
                      handleSubmit={handleSubmit}
                      saveAddress={saveAddress}
                      handleFormShow={this.handleFormShow}
                      initialValues={initialValues}
                    />
                  )}
                  {!this.state.showForm &&
                    !_.isEmpty(address) && (
                      <ShippingAddressValues {...address} />
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

ShippingAddress.propTypes = {
  translate: PropTypes.func.isRequired
};

export default ShippingAddress;
