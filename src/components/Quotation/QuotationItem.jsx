import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import ImageLoader from "../ImageLoader/ImageLoader";
import ContentLoader from "../Loader/Loader";
import Button from "../../elements/CustomButton/CustomButton";
import noImage from "../../assets/img/no-product.png";

const preloader = () => <ContentLoader height={300} inFight />;

const QuotationItem = props => {
  const { quotation, locale } = props;
  let productImages;
  if (!_.isEmpty(quotation)) {
    const { rfqPictures } = quotation;
    if (!_.isEmpty(rfqPictures)) {
      productImages = rfqPictures[0].url;
    } else {
      productImages = noImage;
    }
  }
  return (
    <div className="quotation-item">
      <div className="quotation-item-details">
        <div className="quotation-product-title">
          <h3>{_.capitalize(quotation.titleTranslations[locale])}</h3>
        </div>
        <div className="image-container">
          <div className="product-image-container">
            <a href="#products" className="product photo product-item-photo">
              <ImageLoader preloader={preloader} src={productImages} />
            </a>
          </div>
        </div>
        <div className="quotation-item-detail">
          <div className="desc">
            <p>{quotation.descriptionTranslations[locale]}</p>
          </div>
          <div className="quotation-quantity">
            <p>
              Quanity Required <b>{quotation.purchaseQuantity}</b> pieces
            </p>
            <p>Posted in {_.capitalize(quotation.buyer.location)}</p>
          </div>
          <div className="quotation-posted">
            <Button fill bsStyle="warning">
              <i className="pe-7s-mail" /> CHAT
            </Button>
          </div>
        </div>
      </div>
      <div className="quotation-container-button">
        <div className="quotation-button">
          <Button
            fill
            radius
            bsStyle="warning"
            onClick={props.opneSubmitQuoteModal}
          >
            Quote Now
          </Button>
          {/* <Button
            fill
            bsStyle="warning"
            className="open"
            onClick={props.opneSubmitQuoteModal}
          >
            Open
          </Button>
          <Button
            fill
            bsStyle="warning"
            className="closed"
            onClick={props.opneSubmitQuoteModal}
          >
            Close
          </Button> */}
        </div>
      </div>
    </div>
  );
};

QuotationItem.propTypes = {
  opneSubmitQuoteModal: PropTypes.func.isRequired,
  locale: PropTypes.string,
};

QuotationItem.defaultProps = {
  locale: ""
};

export default QuotationItem;
