import React from "react";

const ProductOverview = () => (
  <div>
    <dl className="do-entry-item">
      <dt className="do-entry-item">
        <span>Condition:</span>
      </dt>
      <dd className="do-entry-item-val">
        <div className="ellipsis" title="New, new">
          New, new
        </div>
      </dd>
    </dl>
    <dl className="do-entry-item">
      <dt className="do-entry-item">
        <span className="attr-name J-attr-name">Place of Origin:</span>
      </dt>
      <dd className="do-entry-item-val">
        <div className="ellipsis">France</div>
      </dd>
    </dl>
    <dl className="do-entry-item">
      <dt className="do-entry-item">
        <span className="attr-name J-attr-name">Brand Name:</span>
      </dt>
      <dd className="do-entry-item-val">
        <div className="ellipsis" title="GC">
          GC
        </div>
      </dd>
    </dl>
    <dl className="do-entry-item">
      <dt className="do-entry-item">
        <span className="attr-name J-attr-name">Model Number:</span>
      </dt>
      <dd className="do-entry-item-val">
        <div className="ellipsis" title="QDB-300">
          QDB-300
        </div>
      </dd>
    </dl>
    <dl className="do-entry-item">
      <dt className="do-entry-item">
        <span>Application:</span>
      </dt>
      <dd className="do-entry-item-val">
        <div>Candy</div>
      </dd>
    </dl>
  </div>
);

ProductOverview.propTypes = {};

export default ProductOverview;
