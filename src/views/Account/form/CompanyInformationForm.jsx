import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row, Form } from "react-bootstrap";
import { date, numericality, format } from "redux-form-validators";
import BlockUi from "react-block-ui";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import Modal from "../../../components/Modal/Modal";
import GoogleMap from "../../../components/Map/Map";
import {
  required,
  normalizePhone,
  phoneNumber
} from "../../../formValidationRules/FormValidationRules";

class CompanyInformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sameAddress: false,
      activeInput: "registeredAddress"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleHideMap = this.handleHideMap.bind(this);
    this.onDraggableChanged = this.onDraggableChanged.bind(this);
  }
  onDraggableChanged(lat, lng) {
    const { getLocation } = this.props;
    getLocation(lat, lng, this.state.activeInput);
  }
  handleInputFocus(name) {
    const { locationLatLng } = this.state;
    this.setState({
      showMapModal: true,
      loading: true,
      activeInput: name
    });
    this.props.handleInputMap(name);
    if (!_.isEmpty(locationLatLng)) {
      this.setState({ loading: false });
      return false;
    }
    navigator.geolocation.getCurrentPosition(
      p => {
        const LatLngBounds = Object.assign(
          {},
          {
            lat: p.coords.latitude,
            lng: p.coords.longitude
          }
        );
        this.props.getLocation(p.coords.latitude, p.coords.longitude, name);
        this.setState({ locationLatLng: LatLngBounds, loading: false });
      },
      () => {
        const LatLngBounds = {
          lat: 19.230526955858,
          lng: 72.9730803
        };
        this.props.getLocation(19.230526955858, 72.9730803, name);
        this.setState({ locationLatLng: LatLngBounds, loading: false });
      }
    );
    return false;
  }
  handleHideMap() {
    this.setState({ showMapModal: false });
  }
  handleChecked(e, value) {
    const { changeFieldValue, companyInformationForm } = this.props;
    let {
      r_city,
      registeredAddress,
      r_area_code,
      r_country
    } = companyInformationForm;
    if (this.state.sameAddress) {
      r_city = "";
      registeredAddress = "";
      r_area_code = "";
      r_country = "";
    }
    this.setState({ sameAddress: !this.state.sameAddress });
    changeFieldValue("o_city", r_city);
    changeFieldValue("operationalAddress", registeredAddress);
    changeFieldValue("o_area_code", r_area_code);
    changeFieldValue("o_country", r_country);
  }
  handleSubmit(values) {
    const { handleSubmitForm } = this.props;
    const data = {
      ...values,
      registeredAddress: {
        address: values.registeredAddress,
        city: values.r_city,
        country: values.r_country,
        areaCode: values.r_area_code
      },
      operationalAddress: {
        address: values.operationalAddress,
        city: values.o_city,
        country: values.o_country,
        areaCode: values.o_area_code
      }
    };
    delete data.o_area_code;
    delete data.o_city;
    delete data.o_country;
    delete data.r_area_code;
    delete data.r_city;
    delete data.r_country;
    handleSubmitForm(data);
  }
  render() {
    const { translate, loading, handleSubmit } = this.props;
    return (
      <div className="company-information">
        <BlockUi tag="div" blocking={loading}>
          <Col sm={12}>
            <Form onSubmit={handleSubmit(this.handleSubmit)}>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("c_name"),
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
                    label: translate("y_established"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "established",
                    validate: [
                      required,
                      date({
                        format: "yyyy",
                        message: translate("year_validation")
                      })
                    ]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("o_website"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "website",
                    validate: [
                      format({
                        with: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                        message: translate("url_validation"),
                        allowBlank: true
                      })
                    ]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "button",
                    bsStyle: {
                      className: "btn btn-default btn-warning btn-fill",
                      onClick: () => this.handleInputFocus("registeredAddress")
                    },
                    bsText: "Locate Me",
                    label: translate("r_address"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "registeredAddress",
                    // onFocus: this.handleInputFocus,
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: "Country",
                    name: "r_country",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("city"),
                    name: "r_city",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("zip_code"),
                    name: "r_area_code",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    inputGroup: "label_with_checkbox",
                    label: translate("o_address"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "operationalAddress",
                    bsStyle: {
                      className: "btn btn-default btn-warning btn-fill",
                      onClick: () => this.handleInputFocus("operationalAddress")
                    },
                    bsText: "Locate Me",
                   // onFocus: this.handleInputFocus,
                    disabled: this.state.sameAddress,
                    handleChecked: this.handleChecked,
                    validate: [required]
                  }
                ]}
              >
                {translate("label_address")}
              </FormInputs>
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: "Country",
                    name: "o_country",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("city"),
                    name: "o_city",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("zip_code"),
                    name: "o_area_code",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("t_employees"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "employeeCount",
                    validate: [required, numericality({ int: true })]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    label: translate("c_person"),
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "name",
                    placeholder: "Name",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "email",
                    bsClass: "form-control form-control-simple",
                    placeholder: "Email Address",
                    name: "email",
                    validate: [required]
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    bsClass: "form-control form-control-simple",
                    name: "phone",
                    placeholder: "Phone Number",
                    validate: [phoneNumber],
                    normalize: normalizePhone
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                proprieties={[
                  {
                    type: "text",
                    label: translate("about_us"),
                    componentClass: "textarea",
                    bsClass: "form-control form-control-simple",
                    name: "aboutUs",
                    style: { height: 100 },
                    validate: [required]
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
        </BlockUi>
        <Modal
          className="map-modal"
          show={this.state.showMapModal}
          bHeader="Location Search"
          onHide={this.handleHideMap}
          bsSize="large"
          bContent={
            this.state.loading ? (
              <Col className="container-loader">
                <div className="loader">
                  <i className="fa fa-refresh fa-spin" />
                  <h5>Loading map...</h5>
                </div>
              </Col>
            ) : (
              <GoogleMap
                isMarkerShown
                onDrag={this.onDraggableChanged}
                center={this.state.locationLatLng}
              />
            )
          }
        />
      </div>
    );
  }
}

CompanyInformationForm.propTypes = {
  translate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  changeFieldValue: PropTypes.func.isRequired
};

export default CompanyInformationForm;
