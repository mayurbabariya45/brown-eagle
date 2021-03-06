import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { numericality } from "redux-form-validators";
import BlockUi from "react-block-ui";
import { required } from "../../formValidationRules/FormValidationRules";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";
import CustomReduxSelect from "../../elements/CustomReduxSelect/CustomReduxSelect";

class SubmitQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    const {
      submitQuote,
      showNotification,
      getSellerActivePlans,
      getSellerQuotations,
      currentPage,
      onHide,
      locale,
      seller,
      quotationId,
      selectedFilter
    } = this.props;
    if (!_.isEmpty(values)) {
      submitQuote(
        {
          ...values,
          seller,
          id: quotationId
        },
        locale
      ).then(payload => {
        if (payload.type === "SUBMIT_QUOTE_SUCCESS") {
          onHide();
          getSellerActivePlans(seller);
          getSellerQuotations(seller, _.lowerCase(selectedFilter), currentPage);
          showNotification(
            <span data-notify="icon" className="pe-7s-check" />,
            <div>Quote has been sent successfully.</div>,
            false
          );
        } else if (payload.type === "SUBMIT_QUOTE_FAILURE") {
          showNotification(
            <span data-notify="icon" className="pe-7s-check" />,
            <div>{payload.payload.response.message}</div>,
            true
          );
        }
      });
    }
  }
  render() {
    const {
      translate,
      showModal,
      onHide,
      locale,
      quoteRemianing,
      sellerProducts,
      handleSubmit,
      submitQuoteLoading
    } = this.props;
    const { products } = sellerProducts;
    const productOptions = _.map(products, product => ({
      label: product.nameTranslations[locale],
      value: product.id
    }));
    return (
      <div className="submit-quote">
        <Modal
          show={showModal}
          onHide={onHide}
          aria-labelledby="contained-modal"
        >
          <Form onSubmit={handleSubmit(this.handleSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                {translate("submit_quote_title")}
              </Modal.Title>
            </Modal.Header>
            <BlockUi tag="div" blocking={submitQuoteLoading}>
              <Modal.Body>
                {quoteRemianing < 1 && (
                  <div className="upgrade-plans text-center">
                    <p>Please upgrade your plans to submit a quotation</p>
                  </div>
                )}
                {quoteRemianing > 0 && (
                  <div className="submit-quote-form">
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: translate("quote_form_name"),
                          type: "text",
                          bsClass: "form-control form-control-simple",
                          name: "title",
                          validate: [required]
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: translate("quote_form_quote_price"),
                          type: "text",
                          bsClass: "form-control form-control-simple",
                          name: "quotedPrice",
                          validate: [required, numericality({ ">": 0 })]
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: translate("quote_form_quote_quantity"),
                          type: "number",
                          bsClass: "form-control form-control-simple",
                          name: "minQuantity",
                          validate: [required, numericality({ ">": 0 })]
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: translate("quote_form_quote_delivery_time"),
                          type: "number",
                          bsClass: "form-control form-control-simple",
                          name: "estimatedDeliveryTime",
                          validate: [required, numericality({ ">": 0 })]
                        }
                      ]}
                    />
                    <Field
                      name="product"
                      label={translate("quote_form_quote_product")}
                      options={productOptions}
                      component={CustomReduxSelect}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: translate("quote_form_description"),
                          type: "text",
                          componentClass: "textarea",
                          style: { height: 100 },
                          bsClass: "form-control form-control-simple",
                          name: "coverLetter",
                          validate: [required]
                        }
                      ]}
                    />
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    {quoteRemianing > 0 && (
                      <Button
                        radius
                        fill
                        bsStyle="warning"
                        className="text-capitalize"
                        type="submit"
                      >
                        {translate("d_submit")}
                      </Button>
                    )}
                    {quoteRemianing < 1 && (
                      <Link
                        to="/plans"
                        className="text-capitalize btn btn-warning btn-fill btn-radius"
                      >
                        Upgrade Plan
                      </Link>
                    )}
                  </Col>
                </Row>
              </Modal.Footer>
            </BlockUi>
          </Form>
        </Modal>
      </div>
    );
  }
}

SubmitQuote.propTypes = {
  submitQuoteLoading: PropTypes.bool,
  showModal: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  submitQuote: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  locale: PropTypes.string,
  seller: PropTypes.string,
  quotationId: PropTypes.string
};

SubmitQuote.defaultProps = {
  submitQuoteLoading: false,
  locale: "en",
  seller: "",
  quotationId: ""
};
export default SubmitQuote;
