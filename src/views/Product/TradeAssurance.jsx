import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

const TradeAssurance = props => (
  <div className="trade-assurance">
    <div className="trade-assurance-inner">
      <div className="trade-title">
        <h2>{props.translate("trade_anssurance")}</h2>
      </div>
      <div className="trade-assurance-inner-row">
        <div className="trade-row">
          <span className="yrs">
            <i className="icon-static icon-yrs" />0 Yrs
          </span>
          {/* <h3>
            {!_.isEmpty(props.seller) &&
              _.capitalize(
                `${props.seller.firstName} ${props.seller.lastName}`
              )}
          </h3> */}
          <p className="trade-txt">
            {props.seller && props.seller.companyName}
          </p>
        </div>
        <div className="trade-row">
          <p>
            {props.translate("product_transaction_level")}{" "}
            {/* <i className="icon-static icon-diamond" />
            <i className="icon-static icon-diamond" />
            <i className="icon-static icon-diamond" /> */}
          </p>
          <p>
            {props.translate("product_supplier_assessments")}
            <i className="icon-static icon-assets" />
          </p>
        </div>
        <div className="trade-row">
          <p>
            0 {props.translate("product_transactions")} £ <b>0</b>
          </p>
        </div>
        <div className="trade-row border-bottom-row">
          <p>
            {props.translate("product_response_time")}{" "}
            <i className="fa fa-clock-o" /> <b> &lt; 24h </b>
          </p>
          <p>
            {props.translate("product_response_rate")}{" "}
            <i className="fa fa-share" /> <b> 0.4% </b>
          </p>
        </div>
      </div>
    </div>
  </div>
);

TradeAssurance.propTypes = {
  translate: PropTypes.func.isRequired
};

export default TradeAssurance;
