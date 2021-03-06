import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import ImageLoader from "../ImageLoader/ImageLoader";
import ContentLoader from "../Loader/Loader";
import Button from "../../elements/CustomButton/CustomButton";
import noImage from "../../assets/img/no-product.png";

const preloader = () => <ContentLoader height={300} inFight />;

const SellerQuotationStatus = props => (
  <div className="quotation-container-button">
    <div className="quotation-button">
      {/* {props.status === "open" && (
        <Button fill bsStyle="warning" className="open">
          {props.translate("q_status_open")}
        </Button>
      )}
      {(props.status === "close" || props.status === "rejected") && (
        <Button fill bsStyle="warning" className="closed">
          {props.status}
        </Button>
      )} */}
      <Button
        fill
        bsStyle="success"
        className="view-quotation"
        onClick={props.handleViewQuotation}
      >
        View Quotation
      </Button>
      {props.status === "open" &&
        !props.isQuoted && (
          <Button
            fill
            bsStyle="warning"
            className="btn-quote"
            onClick={props.opneSubmitQuoteModal}
          >
            {props.translate("q_quote_now")}
          </Button>
        )}
      <div className="quote-count">
        <p>Quotes Left {props.quoteRemianing}</p>
      </div>
    </div>
  </div>
);
const BuyerQuotationStatus = props => (
  <div className="quotation-container-button">
    <div className="quotation-button">
      {/* {props.status === "open" && (
        <Button fill bsStyle="warning" className="open">
          {props.translate("q_status_open")}
        </Button>
      )}
      {(props.status === "close" || props.status === "rejected") && (
        <Button fill bsStyle="warning" className="closed">
          {props.status}
        </Button>
      )} */}
      <Button
        fill
        bsStyle="success"
        className="view-quotation"
        onClick={props.handleViewQuotation}
      >
        View Quotation
      </Button>
      <Button
        fill
        bsStyle="warning"
        className="view-quotes"
        onClick={props.showSellerQuotes}
      >
        View Submmited Quotes
      </Button>
    </div>
  </div>
);
const QuotationItem = props => {
  const {
    quotation,
    locale,
    handleViewQuotation,
    showSellerQuotes,
    buyer,
    translate
  } = props;
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
          <h3>
            {_.capitalize(quotation.titleTranslations[locale])}{" "}
            {quotation.status === "open" && (
              <span className="label label-warning open">
                {props.translate("q_status_open")}
              </span>
            )}
            {(quotation.status === "close" ||
              quotation.status === "rejected") && (
              <span className="label label-warning closed">
                {quotation.status}
              </span>
            )}
          </h3>
        </div>
        <div className="image-container">
          <div className="product-image-container">
            <a
              href="#products"
              onClick={handleViewQuotation}
              className="product photo product-item-photo"
            >
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
              Category: <b>{quotation.category.nameTranslations[locale]}</b>
            </p>
            {_.has(quotation, "subCategory") && (
              <p>
                Sub Category :
                <b>{quotation.subCategory.nameTranslations[locale]}</b>
              </p>
            )}
          </div>
          <div className="quotation-quantity">
            <p>
              {translate("q_quanity_required")}{" "}
              <b>{quotation.purchaseQuantity}</b>
            </p>
            <p>
              Unit Price <b>{quotation.preferredUnitPrice.toFixed(2)}</b>{" "}
            </p>
            <p>
              {translate("q_posted_in")}{" "}
              {_.capitalize(quotation.buyer.location)}
            </p>
          </div>
          {!buyer && (
            <div className="quotation-posted">
              <Button fill bsStyle="warning">
                <i className="pe-7s-mail" /> {translate("q_chat")}
              </Button>
              {quotation.buyer.companyName && (
                <p>
                  <span>CompanyName:</span>
                  {quotation.buyer.companyName}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {!buyer && (
        <SellerQuotationStatus
          status={quotation.status}
          isQuoted={quotation.isQuoted}
          opneSubmitQuoteModal={props.opneSubmitQuoteModal}
          translate={translate}
          quoteRemianing={props.quoteRemianing}
          handleViewQuotation={props.handleViewQuotation}
        />
      )}
      {buyer && (
        <BuyerQuotationStatus
          status={quotation.status}
          translate={translate}
          showSellerQuotes={showSellerQuotes}
          handleViewQuotation={props.handleViewQuotation}
        />
      )}
    </div>
  );
};

QuotationItem.propTypes = {
  opneSubmitQuoteModal: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  handleViewQuotation: PropTypes.func.isRequired,
  locale: PropTypes.string
};

QuotationItem.defaultProps = {
  locale: ""
};

export default QuotationItem;
