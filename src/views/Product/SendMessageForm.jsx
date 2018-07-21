import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";

const SendMessageForm = props => (
  <div className="send-message-form">
    <div className="form-horizontal-box">
      <FormInputs
        ncols={["col-md-8"]}
        proprieties={[
          {
            inputGroup: "horizontal",
            xsLabel: 2,
            xsInput: 10,
            label: props.translate("product_message"),
            type: "text",
            componentClass: "textarea",
            style: { height: 100 },
            bsClass: "form-control form-control-simple",
            name: "description"
          }
        ]}
      />
      <FormInputs
        ncols={["col-md-5", "col-md-3"]}
        proprieties={[
          {
            inputGroup: "horizontal",
            xsLabel: 4,
            xsInput: 8,
            label: props.translate("product_quantity"),
            type: "text",
            bsClass: "form-control form-control-simple",
            name: "quantity"
          },
          {
            type: "select",
            bsClass: "form-control form-control-simple",
            name: "description"
          }
        ]}
      >
        <option>select</option>
      </FormInputs>

      <Row>
        <Col sm={12}>
          <FormInputs
            proprieties={[
              {
                type: "checkbox",
                name: "rember",
                number: "rember"
              }
            ]}
          >
            {props.translate("product_message_label")}
          </FormInputs>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FormInputs
            proprieties={[
              {
                type: "checkbox",
                name: "bussine-card",
                number: "bussine-card"
              }
            ]}
          >
            {props.translate("product_message_label_1")}
          </FormInputs>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Button bsStyle="warning" type="submit" fill radius simple>
            {props.translate("product_message_send")}
          </Button>
        </Col>
      </Row>
    </div>
  </div>
);

SendMessageForm.propTypes = {};

export default SendMessageForm;
