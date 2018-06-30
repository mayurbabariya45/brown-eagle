import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import { Field } from "redux-form";
import Dropzone from "react-dropzone";
import Button from "../../../elements/CustomButton/CustomButton";
import BlankImg from "../../../assets/img/load-image.png";

class RequestQuotationImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productImages: [],
      existingImages: []
    };
    this.renderField = this.renderField.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.removeProductImage = this.removeProductImage.bind(this);
  }
  renderField({ meta: { touched, error, warning, active } }) {
    return (
      <FormGroup>
        <Dropzone
          accept="image/jpeg, image/png"
          className="request_quotation_dropzone"
          ref={node => {
            this.dropzoneRef = node;
          }}
          onDrop={this.onImageDrop}
        />
        <Button
          fill
          simple
          className="btn-browse"
          onClick={() => {
            this.dropzoneRef.open();
          }}
        >
          <i className="fa fa-cloud-upload" />
          <p>upload pictures</p>
        </Button>
      </FormGroup>
    );
  }
  onImageDrop(files) {
    const { showNotification, dropQuotationImages } = this.props;
    const { productImages } = this.state;
    const addedImages = productImages.length;
    if (addedImages >= 5) {
      showNotification(
        <span data-notify="icon" className="pe-7s-check" />,
        <div>Sorry, only 5 images allowed per product</div>,
        true
      );
    } else {
      let allowed = 5 - addedImages;
      if (files.length < allowed) allowed = files.length;
      if (addedImages >= 5) {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Sorry, only 5 images allowed per product</div>,
          true
        );
        return false;
      }
      const filesToPush = [];
      if (allowed > 0) {
        for (let i = 0; i < allowed; i++) {
          const formData = new FormData();
          formData.append("image", files[i]);
          filesToPush.push({
            ...files[i],
            formData
          });
        }
        this.setState(
          {
            productImages: productImages
              ? this.state.productImages.concat(filesToPush)
              : filesToPush
          },
          () => {
            dropQuotationImages(this.state.productImages);
          }
        );
      }
    }
    return true;
  }
  removeProductImage(index, existing) {
    const { removeQuotationImages } = this.props;
    if (
      window.confirm(
        "Are you sure you want to remove this image from product images?"
      )
    ) {
      const { productImages, existingImages } = this.state;
      const images = existing ? existingImages : productImages;
      const itemToDelete = images.splice(index, 1)[0];
      if (existing) {
        const toDelete = this.state.existingImagesToDelete || [];
        toDelete.push(itemToDelete);
        this.setState({
          existingImages: images,
          existingImagesToDelete: toDelete
        });
      } else {
        this.setState({ productImages: images });
      }
      removeQuotationImages(this.state.productImages);
    }
  }
  render() {
    const { productImages } = this.state;
    const blankImg = [];
    for (let i = 0; i <= 4 - productImages.length; i++) {
      blankImg.push(
        <div className="preview-box" key={i}>
          <img src={BlankImg} className="img-blank" alt="product-images" />
        </div>
      );
    }
    const images = [];
    productImages.map((f, i) =>
      images.push(
        <div key={i} className="preview-box">
          <img src={f.preview} className="img-blank" alt="product-images" />
          <span
            className="remove-image"
            onClick={() => {
              this.removeProductImage(i);
            }}
          >
            <i className="pe-7s-trash" />
          </span>
        </div>
      )
    );
    return (
      <Row>
        <Col md={6} sm={12} xs={12}>
          <div className="image-form">
            <div className="image-input">
              <Field
                name="request_quotation_images"
                type="file"
                component={this.renderField}
              />
            </div>
          </div>
          <div className="images-preview">
            <div className="preview">
              {images}
              {blankImg}
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

RequestQuotationImages.propTypes = {
  showNotification: PropTypes.func.isRequired,
  dropQuotationImages: PropTypes.func.isRequired,
  removeQuotationImages: PropTypes.func.isRequired
};

export default RequestQuotationImages;
