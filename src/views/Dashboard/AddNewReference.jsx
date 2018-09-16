import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import {
  required,
  normalizePhone,
  phoneNumber,
  email
} from "../../formValidationRules/FormValidationRules";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";

class AddNewReference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    const {
      showNotification,
      onHide,
      locale,
      seller,
      createReference,
      editReference,
      isEdit,
      resetForm
    } = this.props;
    if (!_.isEmpty(values)) {
      const objectValues = {
        ...values,
        client: {
          name: values.name,
          companyName: values.companyName,
          phone: values.phone,
          email: values.email,
          website: values.website
        }
      };
      delete objectValues.name;
      delete objectValues.companyName;
      delete objectValues.phone;
      delete objectValues.email;
      delete objectValues.website;
      if (isEdit) {
        const referenceId = values._id;
        delete objectValues._id;
        if (_.has(objectValues, "id")) {
          delete objectValues.id;
        }
        delete objectValues.updatedAt;
        delete objectValues.createdAt;
        delete objectValues.textTranslations;
        delete objectValues.isEnabled;
        editReference(objectValues, referenceId, seller, locale).then(
          payload => {
            if (payload.type === "EDIT_REFERENCE_SUCCESS") {
              onHide();
              resetForm();
              showNotification(
                <span data-notify="icon" className="pe-7s-check" />,
                <div>Reference has been updated successfully.</div>,
                false
              );
            } else if (payload.type === "ADD_NEW_REFERENCE_FAILURE") {
              showNotification(
                <span data-notify="icon" className="pe-7s-check" />,
                <div>{payload.payload.response.message}</div>,
                true
              );
            }
          }
        );
        return false;
      }
      createReference(objectValues, seller, locale).then(payload => {
        if (payload.type === "ADD_NEW_REFERENCE_SUCCESS") {
          onHide();
          resetForm();
          showNotification(
            <span data-notify="icon" className="pe-7s-check" />,
            <div>Reference has been added successfully.</div>,
            false
          );
        } else if (payload.type === "ADD_NEW_REFERENCE_FAILURE") {
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
      handleSubmit,
      isReferenceLoading,
      isEdit
    } = this.props;
    return (
      <div className="add-reference-form">
        <Modal
          show={showModal}
          onHide={onHide}
          aria-labelledby="contained-modal"
        >
          <Form onSubmit={handleSubmit(this.handleSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                {!isEdit
                  ? translate("add_new_reference_title")
                  : translate("edit_reference_title")}
              </Modal.Title>
            </Modal.Header>
            <BlockUi tag="div" blocking={isReferenceLoading}>
              <Modal.Body>
                <div className="submit-quote-form">
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        label: translate("add_new_reference_name"),
                        type: "text",
                        bsClass: "form-control form-control-simple",
                        name: "name",
                        validate: [required]
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        label: translate("add_new_reference_company_Name"),
                        type: "text",
                        bsClass: "form-control form-control-simple",
                        name: "companyName",
                        validate: [required]
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        label: translate("add_new_reference_phone"),
                        type: "text",
                        bsClass: "form-control form-control-simple",
                        name: "phone",
                        validate: [phoneNumber],
                        normalize: normalizePhone
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        label: translate("add_new_reference_email"),
                        type: "text",
                        bsClass: "form-control form-control-simple",
                        name: "email",
                        validate: [email]
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        label: translate("add_new_reference_website"),
                        type: "text",
                        bsClass: "form-control form-control-simple",
                        name: "website"
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                      {
                        label: translate("add_new_reference_desc"),
                        type: "text",
                        bsClass: "form-control form-control-simple",
                        name: "text",
                        componentClass: "textarea",
                        style: { height: 100 },
                        validate: [required]
                      }
                    ]}
                  />
                </div>
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
      </div>
    );
  }
}

AddNewReference.propTypes = {};

export default AddNewReference;
