import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import Button from "../../elements/CustomButton/CustomButton";
import QuotationSlider from "../../components/Quotation/QuotationSlider";

class ViewQuotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { quotation, locale, handleBackButton, translate } = this.props;
    if (_.isEmpty(quotation)) return null;
    return (
      <div>
        <div className="go-back-button">
          <Button fill bsStyle="link" onClick={handleBackButton}>
            <i className="pe-7s-left-arrow" />
            {translate("q_back_button")}
          </Button>
        </div>
        <div className="quotation-item view-quotation-item">
          <div className="quotation-item-details">
            <div className="quotation-product-title">
              <h3>{_.capitalize(quotation.titleTranslations[locale])}</h3>
            </div>
            <div className="quotation-item-detail">
              <div className="quotation-quantity">
                <p>
                  {translate("q_preferred_price")} :{" "}
                  <b>{quotation.preferredUnitPrice}</b>
                </p>
                <p>
                  {translate("q_quanity_required")} :{" "}
                  <b>{quotation.purchaseQuantity}</b>
                </p>
                <p>
                  {translate("q_date_posted")} : <b>12/3/2018</b>
                </p>
              </div>
              <div className="quotation-posted">
                <p>
                  <span>{translate("q_availability")}</span> 10
                </p>
              </div>
            </div>
          </div>
          <div className="quotation-container-button">
            <div className="quotation-button">
              {quotation.status === "open" && (
                <Button fill bsStyle="warning" className="open">
                  {translate("q_status_open")}
                </Button>
              )}
              {(quotation.status === "close" ||
                quotation.status === "rejected") && (
                <Button fill bsStyle="warning" className="closed">
                  {quotation.status}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="quotation-item view-quotation-slider-item">
          <div className="slider-title">
            <h3>{translate("q_information")}</h3>
          </div>
          <div className="quotation-description">
            <p>{quotation.descriptionTranslations[locale]}</p>
          </div>
          <div className="quotation-product-images">
            <div className="quotation-product-slider">
              <QuotationSlider productImages={quotation.rfqPictures} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewQuotation.propTypes = {
  handleBackButton: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  quotation: PropTypes.objectOf(PropTypes.any),
  locale: PropTypes.string
};

ViewQuotation.defaultProps = {
  locale: "",
  quotation: {}
};

export default ViewQuotation;
