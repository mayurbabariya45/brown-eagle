import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../../elements/CustomButton/CustomButton";
import QuotationSlider from "../../components/Quotation/QuotationSlider";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import noImage from "../../assets/img/no-product.png";
import { getCurrency } from "../../variables/Variables";

const preloader = () => <ContentLoader height={300} inFight />;

const QuotationItems = props => (
  <div className="quotation-item view-quote-item">
    <div className="quotation-item-details">
      <div className="quotation-product-title">
        <h3>{props.titleTranslations[props.locale]}</h3>
      </div>
      <div className="quotation-item-detail">
        <div className="desc">
          <p>{props.coverLetterTranslations[props.locale]}</p>
        </div>
        <div className="quotation-quantity">
          <p>
            {props.translate("quote_form_quote_price")}{" "}
            <b>{props.quotedPrice}</b>
          </p>
          <p>
            {props.translate("quote_form_quote_quantity")}{" "}
            <b>{props.minQuantity}</b>
          </p>
          <p>
            {props.translate("quote_form_quote_delivery_time")}{" "}
            <b>{props.estimatedDeliveryTime}</b>
          </p>
        </div>
      </div>
    </div>
  </div>
);
const ViewQuotation = props => (
  <div className="quotation-item view-quotes-item">
    <div className="quotation-item-details">
      <div className="quotation-product-title">
        <h3>{_.capitalize(props.titleTranslations[props.locale])}</h3>
      </div>
      <div className="quotation-item-detail">
        <div className="quotation-quantity">
          <p>
            Category: <b>{props.category.nameTranslations[props.locale]}</b>
          </p>
          {_.has(props, "subCategory") && (
            <p>
              Sub Category :
              <b>{props.subCategory.nameTranslations[props.locale]}</b>
            </p>
          )}
        </div>
        <div className="quotation-quantity">
          <p>
            {props.translate("q_quanity_required")} :{" "}
            <b>{props.purchaseQuantity}</b>
          </p>
          <p>
            Unit Price : <b>{props.preferredUnitPrice.toFixed(2)}</b>
          </p>
          {/* <p>
            {props.translate("q_posted_in")} : <b>12/3/2018</b>
          </p> */}
        </div>
        <div className="quotation-posted">
          <Button fill bsStyle="warning">
            <i className="pe-7s-mail" /> {props.translate("q_chat")}
          </Button>
          <p>
            <span>{props.translate("q_availability")}</span> 10
          </p>
        </div>
      </div>
    </div>
    <div className="quotation-container-button">
      <div className="quotation-button">
        {props.status === "open" && (
          <Button fill bsStyle="warning" className="open">
            {props.translate("q_status_open")}
          </Button>
        )}
        {(props.status === "close" || props.status === "rejected") && (
          <Button fill bsStyle="warning" className="closed">
            {props.status}
          </Button>
        )}
      </div>
    </div>
  </div>
);
const ViewQuotationSlider = props => (
  <div className="quotation-item view-quotation-slider-item">
    <div className="slider-title">
      <h3>{props.translate("q_information")}</h3>
    </div>
    <div className="quotation-description">
      <p>{props.descriptionTranslations[props.locale]}</p>
    </div>
    <div className="quotation-product-images">
      <div className="quotation-product-slider">
        <QuotationSlider productImages={props.rfqPictures} />
      </div>
    </div>
  </div>
);
const ViewSellerProduct = props => {
  let productImages;
  let productUrl = "/products";
  if (!_.isEmpty(props.productPictures)) {
    if (!_.isEmpty(props.productPictures)) {
      productImages = props.productPictures[0].url;
    } else {
      productImages = noImage;
    }
  }
  productUrl = `/product/${_.kebabCase(props.name)}/${props._id}`;
  return (
    <div className="quotation-item view-quotation-product">
      <div className="quotation-item-details">
        <div className="quotation-product-title">
          <h3>{props.nameTranslations[props.locale]}</h3>
        </div>
        <div className="image-container">
          <div className="product-image-container">
            <Link to={productUrl} className="product photo product-item-photo">
              <ImageLoader preloader={preloader} src={productImages} />
            </Link>
          </div>
        </div>
        <div className="quotation-item-detail">
          <div className="desc">
            <p>{props.descriptionTranslations[props.locale]}</p>
          </div>
          <div className="quotation-quantity">
            <p>
              {props.translate("quote_form_product_price")}{" "}
              <b>
                {getCurrency(props.currency)}
                {props.productPrice.toFixed(2)}
              </b>
            </p>
            <p>
              {props.translate("quote_form_product_quantity")}{" "}
              <b>{props.minQuantity}</b>
            </p>
            <p>
              {props.translate("quote_form_product_availability")}{" "}
              <b>{props.productAvailability ? "Yes" : "No"}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
class ViewQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleBackButton, translate, quotation, locale } = this.props;
    return (
      <div>
        <div className="go-back-button">
          <Button fill bsStyle="link" onClick={handleBackButton}>
            <i className="pe-7s-left-arrow" />
            {translate("q_back_button")}
          </Button>
        </div>
        <QuotationItems {...quotation} translate={translate} locale={locale} />
        <ViewQuotation
          {...quotation.rfq}
          translate={translate}
          locale={locale}
        />
        {_.has(quotation, "product") && (
          <ViewSellerProduct
            {...quotation.product}
            translate={translate}
            locale={locale}
          />
        )}
        <ViewQuotationSlider
          {...quotation.rfq}
          translate={translate}
          locale={locale}
        />
      </div>
    );
  }
}

ViewQuote.propTypes = {
  handleBackButton: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
};

export default ViewQuote;
