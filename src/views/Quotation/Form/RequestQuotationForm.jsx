import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { numericality } from "redux-form-validators";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import Select from "../../../elements/CustomSelect/CustomSelect";
import RequestQuotationImages from "./RequestQuotationImages";
import { required } from "../../../formValidationRules/FormValidationRules";

const RequestQuotationForm = props => {
  const {
    translate,
    handleSubmit,
    hanldeSubmitForm,
    showNotification,
    dropQuotationImages,
    removeQuotationImages,
    handleSelectCategoryValue,
    handleSelectSubCategoryValue,
    selectCategoriesOptions,
    selectSubCategoriesOptions
  } = props;

  return (
    <div className="request_quotation_form">
      <Row>
        <Col md={6} sm={6} xs={12}>
          <div className="form-title">
            <h4>{translate("request_quotation_form_title_1")}</h4>
            <p>{translate("request_quotation_form_description")}</p>
          </div>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit(hanldeSubmitForm)}>
        <Row>
          <Col md={6} sm={6} xs={12}>
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "title",
                  placeholder: translate("request_quotation_form_product_name"),
                  validate: [required]
                }
              ]}
            />
          </Col>
          <Col md={6} sm={6} xs={12}>
            <FormGroup>
              <FormControl.Static>
                {translate("request_quotation_form_name_label")}
              </FormControl.Static>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={6} xs={12}>
            <FormGroup>
              <Row>
                <Col componentClass={ControlLabel} sm={4}>
                  {translate("request_quotation_form_product_categories")}
                </Col>
                <Col sm={8}>
                  <Select
                    handleSelectValue={handleSelectCategoryValue}
                    searchable
                    placeholder={translate(
                      "request_quotation_form_category_placehholder"
                    )}
                    options={selectCategoriesOptions}
                  />
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
        {!_.isEmpty(selectSubCategoriesOptions) && (
          <Row>
            <Col md={6} sm={6} xs={12}>
              <FormGroup>
                <Row>
                  <Col componentClass={ControlLabel} sm={4}>
                    {translate("request_quotation_form_product_sub_categories")}
                  </Col>
                  <Col sm={8}>
                    <Select
                      handleSelectValue={handleSelectSubCategoryValue}
                      searchable
                      placeholder={translate(
                        "request_quotation_form_sub_category_placehholder"
                      )}
                      options={selectSubCategoriesOptions}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
        )}

        <Row>
          <Col md={6} sm={6} xs={12}>
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  type: "text",
                  componentClass: "textarea",
                  style: { height: 100 },
                  bsClass: "form-control form-control-simple",
                  name: "description",
                  placeholder: translate(
                    "request_quotation_form_description_name"
                  ),
                  validate: [required]
                }
              ]}
            />
          </Col>
          <Col md={6} sm={6} xs={12}>
            <FormGroup>
              <FormControl.Static>
                {translate("request_quotation_form_description_label")}
              </FormControl.Static>
            </FormGroup>
          </Col>
        </Row>
        <RequestQuotationImages
          translate={translate}
          showNotification={showNotification}
          dropQuotationImages={dropQuotationImages}
          removeQuotationImages={removeQuotationImages}
        />
        <Row>
          <Col md={6} sm={6}>
            <FormInputs
              ncols={["col-md-8", "col-md-4"]}
              proprieties={[
                {
                  type: "text",
                  bsClass: "form-control form-control-simple",
                  name: "purchaseQuantity",
                  placeholder: translate("request_quotation_form_quality"),
                  validate: [required, numericality({ ">": 0 })]
                },
                {
                  type: "select",
                  bsClass: "form-control form-control-simple",
                  name: "preferredUnitPrice",
                  validate: [required]
                }
              ]}
            >
              <option value="">Pieces</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </FormInputs>
          </Col>
          <Col md={6} sm={6} xs={12}>
            <FormGroup>
              <FormControl.Static>
                {translate("request_quotation_form_quality_label")}
              </FormControl.Static>
            </FormGroup>
          </Col>
        </Row>
        <FormInputs
          proprieties={[
            {
              type: "checkbox",
              name: "quote_condition",
              number: "quote_condition",
              validate: [required]
            }
          ]}
        >
          {translate("request_quotation_form_quote_condition")}
        </FormInputs>
        <FormInputs
          proprieties={[
            {
              type: "checkbox",
              name: "quote_term_condition",
              number: "quote_term_condition",
              validate: [required]
            }
          ]}
        >
          {translate("request_quotation_form_condition")}
        </FormInputs>
        <Row>
          <Col md={6} sm={6} xs={12}>
            <Button bsStyle="warning" type="submit" fill radius block simple>
              {translate("request_quotation_form_submit")}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <div className="form-footer">
              <h4>{translate("request_quotation_form_quote")}</h4>
              <p>
                {translate("request_quotation_form_submit")} /{" "}
                {translate("compare_quotes")} / {translate("contact_suppliers")}
              </p>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

RequestQuotationForm.propTypes = {
  translate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hanldeSubmitForm: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  dropQuotationImages: PropTypes.func.isRequired,
  removeQuotationImages: PropTypes.func.isRequired,
  handleSelectCategoryValue: PropTypes.func.isRequired,
  handleSelectSubCategoryValue: PropTypes.func.isRequired,
  selectCategoriesOptions: PropTypes.arrayOf(PropTypes.any),
  selectSubCategoriesOptions: PropTypes.arrayOf(PropTypes.any)
};

RequestQuotationForm.defaultProps = {
  selectCategoriesOptions: [],
  selectSubCategoriesOptions: []
};

export default RequestQuotationForm;
