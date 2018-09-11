import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import BlockUi from "react-block-ui";
import { Row, Col, Form, FormGroup, ControlLabel } from "react-bootstrap";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import {
  required,
  normalizePhone,
  phoneNumber
} from "../../../formValidationRules/FormValidationRules";
import Select from "../../../elements/CustomSelect/CustomSelect";
import { countries } from "../../../variables/Variables";
import Button from "../../../elements/CustomButton/CustomButton";

class ShippingAddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: ""
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    const { saveAddress, handleFormShow } = this.props;
    if (!_.isEmpty(values)) {
      saveAddress(
        Object.assign({}, values, {
          country: this.state.country
        })
      );
      handleFormShow();
    }
  }
  handleLocation(values) {
    this.setState({
      country: values.label
    });
  }
  render() {
    const { loading, handleSubmit, translate } = this.props;
    return (
      <div className="shipping-address-form">
        <BlockUi tag="div" blocking={loading}>
          <Row>
            <Col sm={12}>
              <Form onSubmit={handleSubmit(this.handleSubmit)}>
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  proprieties={[
                    {
                      label: "First Name",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "f_name",
                      validate: [required]
                    },
                    {
                      label: "Last Name",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "l_name",
                      validate: [required]
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  proprieties={[
                    {
                      label: "House No",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "house",
                      validate: [required]
                    },
                    {
                      label: "Street",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "street",
                      validate: [required]
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-4", "col-md-4", "col-md-4"]}
                  proprieties={[
                    {
                      label: "City",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "city",
                      validate: [required]
                    },
                    {
                      label: "State",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "state",
                      validate: [required]
                    },
                    {
                      label: "ZipCode",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "zipCode",
                      validate: [required]
                    }
                  ]}
                />
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <ControlLabel>Country</ControlLabel>
                      <Select
                        searchable
                        options={countries}
                        handleCountry={this.handleLocation}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  proprieties={[
                    {
                      label: "Landmark",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "Landmark"
                    },
                    {
                      label: "Phone",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "phone",
                      validate: [required, phoneNumber],
                      normalize: normalizePhone
                    }
                  ]}
                />
                <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <Button
                      radius
                      fill
                      bsStyle="warning"
                      className="text-capitalize"
                      type="submit"
                    >
                      {translate("d_submit")}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </BlockUi>
      </div>
    );
  }
}

ShippingAddressForm.propTypes = {
  saveAddress: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFormShow: PropTypes.func.isRequired
};

export default ShippingAddressForm;
