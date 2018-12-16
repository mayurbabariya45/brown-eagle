import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { Col, Row, Form, FormGroup } from "react-bootstrap";
import BlockUi from "react-block-ui";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import Button from "../../../elements/CustomButton/CustomButton";
import { required } from "../../../formValidationRules/FormValidationRules";

class SellerCertificateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }
  onImageDrop(files) {
    this.setState({
      files
    });
  }
  removeImage(index) {
    const { files } = this.state;
    files.splice(index, 1);
    this.setState({
      files
    });
  }
  handleSubmit(value) {
    const { showNotification, handleUploadCertificateForm } = this.props;
    const { files } = this.state;
    if (_.size(files) < 1) {
      showNotification(
        <span data-notify="icon" className="pe-7s-shield" />,
        <div>Required Your Certificate.</div>,
        true
      );
      return false;
    }
    const formData = new FormData();
    formData.append("certificate", files[0]);
    handleUploadCertificateForm({ ...value, file: formData });
    return false;
  }
  render() {
    const { loading, translate, handleSubmit } = this.props;
    const files = [];
    if (this.state.files.length > 0) {
      _.map(this.state.files, (file, i) =>
        files.push(
          <div key={i} className="preview-box">
            <a href={file.url} target="blank">
              <i className="fa fa-file-pdf-o" />
            </a>
            <span
              className="remove-image"
              role="presentation"
              onClick={() => {
                this.removeImage(i);
              }}
            >
              <i className="pe-7s-trash" />
            </span>
          </div>
        )
      );
    }
    return (
      <div className="seller-certificate">
        <BlockUi tag="div" blocking={loading}>
          <Row>
            <Col sm={12}>
              <Form onSubmit={handleSubmit(this.handleSubmit)}>
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: "Title",
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "title",
                      validate: [required]
                    }
                  ]}
                />
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Dropzone
                        accept=".pdf"
                        onDrop={this.onImageDrop}
                        multiple={false}
                        className="dropzone-certificate"
                      >
                        Dropping your pdf certificate here
                      </Dropzone>
                    </FormGroup>
                    {_.size(files) > 0 && (
                      <div className="images-preview">
                        <div className="preview">{files}</div>
                      </div>
                    )}
                  </Col>
                </Row>
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

SellerCertificateForm.propTypes = {
  showNotification: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  handleUploadCertificateForm: PropTypes.func.isRequired
};

export default SellerCertificateForm;
