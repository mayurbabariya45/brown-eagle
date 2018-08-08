import _ from "lodash";
import React from "react";

const ProductOverview = props => (
  <div>
    {_.map(props.quickDetails, (value, index) => {
      return (
        <dl className="do-entry-item" key={index}>
          <dt className="do-entry-item">
            <span>{_.keys(value)[0]}:</span>
          </dt>
          <dd className="do-entry-item-val">
            <div className="ellipsis" title="New, new">
              {_.trim(value[_.keys(value)[0]])}
            </div>
          </dd>
        </dl>
      )
    })}
  </div>
);

ProductOverview.propTypes = {};

export default ProductOverview;
