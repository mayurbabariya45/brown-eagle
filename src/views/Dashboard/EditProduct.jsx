import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { numericality } from "redux-form-validators";
import {
  Modal,
  Form,
  Row,
  Col,
  FormGroup,
  ControlLabel
} from "react-bootstrap";
import Select from "react-select";
import Dropzone from "react-dropzone";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import { required } from "../../formValidationRules/FormValidationRules";
import Button from "../../elements/CustomButton/CustomButton";
import BlankImg from "../../assets/img/load-image.png";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productImages: [],
      existingImages: [],
      selectedCategory: {},
      selectedSubCategory: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectSubCategoryValue = this.handleSelectSubCategoryValue.bind(
      this
    );
    this.onProductImages = this.onProductImages.bind(this);
    this.removeProductImage = this.removeProductImage.bind(this);
  }
  componentWillMount() {
    const { getCategories } = this.props;
    getCategories();
  }
  componentWillReceiveProps(nextProps) {
    const { initialValues, categories } = nextProps;
    const { productPictures, category, subCategory } = initialValues;
    const images = [];
    _.each(productPictures, value => {
      images.push(value);
    });
    const findCategory = _.find(categories, ["id", category]);
    const categoryValue = !_.isEmpty(findCategory)
      ? { value: findCategory.id, label: findCategory.name }
      : {};
    let subCategoryValue = {};
    if (_.has(findCategory, "subCategoryList")) {
      if (!_.isEmpty(subCategory)) {
        const findSubCategory = _.find(findCategory.subCategoryList, [
          "_id",
          subCategory
        ]);
        subCategoryValue = !_.isEmpty(findSubCategory)
          ? { value: findSubCategory._id, label: findSubCategory.name }
          : {};
      }
    }
    this.setState({
      existingImages: images,
      selectedCategory: categoryValue,
      selectedSubCategory: subCategoryValue
    });
  }
  onProductImages(files) {
    const { productImages, existingImages } = this.state;
    const addedImages = productImages.length + existingImages.length;
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
            formData
          });
        }
        this.setState({
          productImages: productImages
            ? this.state.productImages.concat(filesToPush)
            : filesToPush
        });
      }
    }
  }
  removeProductImage(index, existing) {
    if (
      window.confirm(
        "Are you sure you want to remove this image from product images?"
      )
    ) {
      const { productImages, existingImages } = this.state;
      const images = existing ? existingImages : productImages;
      const itemToDelete = images.splice(index, 1)[0];
      if (existing) {
        const { initialValues } = this.props;
        const { id } = initialValues;
        const toDelete = this.state.existingImagesToDelete || [];
        toDelete.push(itemToDelete);
        this.props.deleteProductImage(id, toDelete[0]._id).then(payload => {
          if (payload.type === "DELETE_PRODUCT_IMAGE_SUCCESS") {
            this.props.showNotification(
              <span data-notify="icon" className="pe-7s-check" />,
              <div>Product Image has been deleted successfully.</div>,
              false
            );
          } else {
            this.props.showNotification(
              <span data-notify="icon" className="pe-7s-shield" />,
              <div>{payload.payload.response.message}</div>,
              true
            );
          }
        });
        this.setState({
          existingImages: images,
          existingImagesToDelete: toDelete
        });
      } else this.setState({ productImages: images });
    }
  }

  handleSelectChange(value) {
    this.setState({ selectedCategory: value, selectedSubCategory: {} });
  }
  handleSelectSubCategoryValue(values) {
    this.setState({
      selectedSubCategory: values
    });
  }
  handleSubmit(values) {
    const {
      updateProduct,
      showNotification,
      id,
      onHide,
      addProductImages
    } = this.props;
    const product = Object.assign({}, values, {
      seller: id,
      category: this.state.selectedCategory.value,
      subCategory: this.state.selectedSubCategory.value
    });
    updateProduct(product, "en").then(payload => {
      if (payload.type === "UPDATE_PRODUCT_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Product has been updated successfully.</div>,
          false
        );
        _.forEach(this.state.productImages, image => {
          addProductImages(image.formData, product.id, "en");
        });
        onHide();
      } else {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>Product has not been changed.</div>,
          true
        );
      }
    });
  }
  render() {
    const {
      showModal,
      onHide,
      translate,
      handleSubmit,
      loading,
      categories,
      locale
    } = this.props;
    const categoriesValue = _.map(categories, category => ({
      value: category.id,
      label: category.nameTranslations[locale]
    }));
    let subCategoriesOption = [];
    if (!_.isEmpty(this.state.selectedCategory)) {
      const findCategory = _.find(categories, [
        "id",
        this.state.selectedCategory.value
      ]);
      if (!_.isEmpty(findCategory)) {
        if (_.has(findCategory, "subCategoryList")) {
          subCategoriesOption = _.map(
            findCategory.subCategoryList,
            subCategory => ({
              label: subCategory.nameTranslations[locale],
              value: subCategory._id
            })
          );
        }
      }
    }
    const countProductImage =
      this.state.existingImages.length + this.state.productImages.length;
    const blankImg = [];
    for (let i = 0; i <= 4 - countProductImage || 0; i++) {
      blankImg.push(
        <div className="preview-box" key={i}>
          <img src={BlankImg} className="img-blank" alt="product-images" />
        </div>
      );
    }
    const existingImages = [];
    _.map(this.state.existingImages, (file, i) =>
      existingImages.push(
        <div key={i} className="preview-box">
          <img src={file.url} className="img-blank" alt="product-images" />
          <span
            className="remove-image"
            onClick={() => {
              this.removeProductImage(i, true);
            }}
          >
            <i className="pe-7s-trash" />
          </span>
        </div>
      )
    );
    const productImages = [];
    if (this.state.productImages.length > 0) {
      _.map(this.state.productImages, (file, i) =>
        productImages.push(
          <div key={i} className="preview-box">
            <img
              src={file.preview}
              className="img-blank"
              alt="product-images"
            />
            <span
              className="remove-image"
              role="presentation"
              onClick={() => {
                this.removeProductImage(i);
              }}
            >
              <i className="pe-7s-trash" />
            </span>
          </div>
        )
      );
    }

    return (
      <Modal show={showModal} onHide={onHide} aria-labelledby="contained-modal">
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Edit Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BlockUi tag="div" blocking={loading}>
              <div className="editProductForm">
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <ControlLabel> {translate("a_selected")}</ControlLabel>
                      <Select
                        value={this.state.selectedCategory}
                        searchable
                        placeholder="Select categories"
                        options={categoriesValue}
                        onChange={this.handleSelectChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {!_.isEmpty(subCategoriesOption) && (
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <ControlLabel> {translate("a_selected")}</ControlLabel>
                        <Select
                          value={this.state.selectedSubCategory}
                          searchable
                          placeholder="Select Sub categories"
                          options={subCategoriesOption}
                          onChange={this.handleSelectSubCategoryValue}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: translate("a_product_name"),
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "name"
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  proprieties={[
                    {
                      label: translate("a_product_price"),
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      name: "productPrice"
                    },
                    {
                      label: translate("a_product_quantity"),
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
                      type: "checkbox",
                      name: "productAvailability",
                      number: "productAvailability"
                    }
                  ]}
                >
                  <b>Product Availability</b>
                </FormInputs>
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: translate("a_product_keyword"),
                      type: "text",
                      bsClass: "form-control form-control-simple",
                      className: "custom-form-group",
                      name: "product_keywords",
                      mutipleFields: true,
                      translate
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-12"]}
                  proprieties={[
                    {
                      label: translate("a_description"),
                      type: "text",
                      componentClass: "textarea",
                      style: { height: 100 },
                      bsClass: "form-control form-control-simple",
                      name: "description",
                      validate: [required]
                    }
                  ]}
                />
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <div className="image-form">
                      <div className="image-input">
                        <Dropzone
                          className="dropzone_product"
                          onDrop={this.onProductImages}
                        >
                          <p>
                            Drop images to upload, or click here to select files
                            to upload.
                          </p>
                          <p>Only images will be accepted</p>
                        </Dropzone>
                      </div>
                      <div className="images-preview">
                        <p>{translate("a_image_text")}</p>
                        <div className="preview">
                          {existingImages}
                          {productImages}
                          {blankImg}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </BlockUi>
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
        </Form>
      </Modal>
    );
  }
}
EditProduct.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteProductImage: PropTypes.func.isRequired,
  addProductImages: PropTypes.func.isRequired,
  id: PropTypes.string,
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired
};
EditProduct.defaultProps = {
  id: ""
};
export default EditProduct;
