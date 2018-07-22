import React, { Component } from "react";
import PropTypes from "prop-types";
import Rating from "react-rating";
import BlockUi from "react-block-ui";
import { Field } from "redux-form";
import { Modal, Row, Col, FormGroup, Form } from "react-bootstrap";
import { FormInputs } from "../FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";
import { required } from "../../formValidationRules/FormValidationRules";

class ProductRating extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  changeRate(name, value) {
    this.props.change(name, value);
  }
  render() {
    const {
      show,
      onHide,
      translate,
      handleRatingSubmit,
      handleSubmit,
      loader,
      rating
    } = this.props;
    return (
      <Modal
        show={show}
        onHide={onHide}
        className="product-rating-modal"
        aria-labelledby="contained-modal"
      >
        <Form onSubmit={handleSubmit(handleRatingSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title id="product-rating-modal">
              {translate("product_rating_modal")}
            </Modal.Title>
          </Modal.Header>
          <BlockUi tag="div" blocking={loader}>
            <Modal.Body>
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Row>
                      <Col xs={2} componentClass="label">
                        {translate("product_rating_label_modal")}
                      </Col>
                      <Col xs={10}>
                        <Field name="rating" component="input" type="hidden" />
                        <Rating
                          initialRating={rating}
                          emptySymbol="fa fa-star-o fa-2x"
                          fullSymbol="fa fa-star fa-2x"
                          fractions={2}
                          onChange={value => {
                            this.changeRate("rating", value);
                          }}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
              <FormInputs
                proprieties={[
                  {
                    label: translate("product_review_title_label_modal"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("product_review_title_placeholder"),
                    name: "title",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                proprieties={[
                  {
                    label: translate("product_review_modal"),
                    type: "text",
                    componentClass: "textarea",
                    style: { height: 100 },
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("product_review_placeholder"),
                    name: "comment",
                    validate: [required]
                  }
                ]}
              />
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
          </BlockUi>
        </Form>
      </Modal>
    );
  }
}

ProductRating.propTypes = {
  translate: PropTypes.func.isRequired,
  handleRatingSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  loader: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired
};

export default ProductRating;
