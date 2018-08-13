import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import Dropzone from "react-dropzone";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import Button from "../../../elements/CustomButton/CustomButton";
import BlankImg from "../../../assets/img/load-image.png";

class ProductImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productImages: [],
      existingImages: []
    };
    this.renderField = this.renderField.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.removeProductImage = this.removeProductImage.bind(this);
    this.removeProductImages = this.removeProductImages.bind(this);
  }
  onImageDrop(files) {
    const { dropProductImages } = this.props;
    const { productImages } = this.state;
    const addedImages = productImages.length;
    if (addedImages >= 5) {
      this.props.showNotification(
        <span data-notify="icon" className="pe-7s-check" />,
        <div>Sorry, only 5 images allowed per product</div>,
        true
      );
    } else {
      let allowed = 5 - addedImages;
      if (files.length < allowed) allowed = files.length;
      if (addedImages >= 5) {
        this.props.showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Sorry, only 5 images allowed per product</div>,
          true
        );
        return;
      }
      const filesToPush = [];
      if (allowed > 0) {
        for (let i = 0; i < allowed; i++) {
          const formData = new FormData();
          formData.append("image", files[i]);
          filesToPush.push({
            ...files[i],
            name: files[i].name,
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
            dropProductImages(this.state.productImages);
          }
        );
      }
    }
  }
  removeProductImages() {
    if (
      window.confirm(
        "Are you sure you want to remove these images from product images?"
      )
    ) {
      const { flushProductImages } = this.props;
      this.setState({ productImages: [] });
      flushProductImages();
    }
  }
  removeProductImage(index, existing) {
    if (
      window.confirm(
        "Are you sure you want to remove this image from product images?"
      )
    ) {
      const { removeProductImages } = this.props;
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
      removeProductImages(this.state.productImages);
    }
  }
  renderField({ label }) {
    const { translate } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <Dropzone
          accept="image/jpeg, image/png,.avi,.wmv,.mkv,.mp4"
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
          {translate("a_browse")}
        </Button>
      </FormGroup>
    );
  }
  render() {
    const { translate } = this.props;
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
      <div className="box">
        <div className="box-header">
          <div className="title">{translate("a_product_info")}</div>
        </div>
        <div className="box-content">
          <div className="image-form">
            <div className="image-input">
              <Field
                name="product"
                label={translate("a_image_label")}
                type="file"
                component={this.renderField}
              />
              <div className="action-buttons">
                {/* <div
                  className="selected-links"
                  onClick={this.removeProductImages}
                >
                  {translate("a_selected_image")}
                </div> */}
                {/* <div
                  className="remove-links"
                  onClick={this.removeProductImages}
                >
                  {translate("a_removed_link")}
                </div> */}
              </div>
            </div>
          </div>
          <div className="images-preview">
            <p>{translate("a_image_text")}</p>
            <div className="preview">
              {images}
              {blankImg}
            </div>
          </div>
          <div className="static-content">
            <FormGroup>
              <ControlLabel>{translate("a_image_label")} -</ControlLabel>
              <FormControl.Static>
                {translate("a_image_text")}
              </FormControl.Static>
            </FormGroup>
          </div>
          <Row>
            <Col md={12}>
              <Button
                bsStyle="warning"
                type="submit"
                pullRight
                fill
                radius
                simple
              >
                {translate("r_next")}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
ProductImageForm.propTypes = {
  translate: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  flushProductImages: PropTypes.func.isRequired,
  dropProductImages: PropTypes.func.isRequired,
  removeProductImages: PropTypes.func.isRequired
};
export default reduxForm({ form: "ProductImageForm" })(ProductImageForm);
