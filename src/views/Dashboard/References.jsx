import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import BlockUi from "react-block-ui";
import Button from "../../elements/CustomButton/CustomButton";
import AddNewReferenceContainer from "../../containers/DashboardContainer/AddNewReferenceContainer";
import { Card } from "../../components/Card/Card";

function ValidURL(link) {
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(link)) {
    return `http://${link}`;
  }
  return link;
}

class References extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isEdit: false,
      reference: {}
    };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleEditForm = this.handleEditForm.bind(this);
  }
  handleShowModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  handleEditForm(reference) {
    if (!_.isEmpty(reference)) {
      this.setState({
        showModal: true,
        isEdit: true,
        reference: {
          ...reference,
          ...reference.client
        }
      });
    }
  }
  render() {
    const {
      translate,
      loading,
      showNotification,
      references,
      seller,
      locale
    } = this.props;
    return (
      <div className="dashboard-references">
        <Row>
          <Col md={12}>
            <div className="section-header">
              <div className="title">
                <h5>{translate("d_my_references")}</h5>
              </div>
              <div className="product-add-button">
                <Button
                  radius
                  fill
                  bsStyle="warning"
                  className="text-capitalize"
                  onClick={this.handleShowModal}
                >
                  Add New Reference
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <BlockUi tag="div" blocking={loading}>
          {_.map(references, reference => (
            <Row key={reference._id}>
              <Col md={12}>
                <Card
                  className="card-profile"
                  plain
                  footer
                  header={
                    <div className="header card-header-action">
                      <h4 className="title">
                        {_.has(reference, "client") &&
                          reference.client.companyName}
                      </h4>
                      <div
                        className="action action-edit"
                        onClick={() => this.handleEditForm(reference)}
                      >
                        <i className="fa fa-pencil-square-o" />
                      </div>
                    </div>
                  }
                  content={
                    <Row>
                      {_.has(reference, "client") && (
                        <Col md={6} xs={12}>
                          <FormGroup>
                            <ControlLabel>
                              {translate("add_new_reference_name")}:
                            </ControlLabel>
                            <FormControl.Static>
                              {_.has(reference, "client") &&
                                reference.client.name}
                            </FormControl.Static>
                          </FormGroup>
                        </Col>
                      )}
                      {_.has(reference, "client") && (
                        <Col md={6} xs={12}>
                          <FormGroup>
                            <ControlLabel>
                              {translate("add_new_reference_email")}:
                            </ControlLabel>
                            <FormControl.Static>
                              {_.has(reference, "client") &&
                                reference.client.email}
                            </FormControl.Static>
                          </FormGroup>
                        </Col>
                      )}
                      {_.has(reference, "client") && (
                        <Col md={6} xs={12}>
                          <FormGroup>
                            <ControlLabel>
                              {translate("add_new_reference_phone")}:
                            </ControlLabel>
                            <FormControl.Static>
                              {_.has(reference, "client") &&
                                reference.client.phone}
                            </FormControl.Static>
                          </FormGroup>
                        </Col>
                      )}
                      {_.has(reference, "client") && (
                        <Col md={6} xs={12}>
                          <FormGroup>
                            <ControlLabel>
                              {translate("add_new_reference_website")}:
                            </ControlLabel>
                            <FormControl.Static>
                              <a href={ValidURL(reference.client.website)}>
                                {reference.client.website}
                              </a>
                            </FormControl.Static>
                          </FormGroup>
                        </Col>
                      )}
                      {_.has(reference, "client") && (
                        <Col md={12} xs={12}>
                          <FormGroup>
                            <ControlLabel>
                              {translate("add_new_reference_desc")}:
                            </ControlLabel>
                            <FormControl.Static>
                              {(_.has(reference, "textTranslations") &&
                                reference.textTranslations[locale]) ||
                                reference.text}
                            </FormControl.Static>
                          </FormGroup>
                        </Col>
                      )}
                    </Row>
                  }
                />
              </Col>
            </Row>
          ))}
        </BlockUi>
        <AddNewReferenceContainer
          isReferenceLoading={loading}
          seller={seller}
          locale={locale}
          isEdit={this.state.isEdit}
          initialValues={this.state.reference}
          translate={translate}
          showModal={this.state.showModal}
          onHide={this.handleShowModal}
          showNotification={showNotification}
        />
      </div>
    );
  }
}

References.propTypes = {
  translate: PropTypes.func.isRequired
};

export default References;
