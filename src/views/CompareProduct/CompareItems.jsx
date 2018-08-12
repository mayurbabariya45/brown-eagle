import _ from "lodash";
import React from "react";
import CompareItem from "./CompareItem";

const CompareItems = props => (
  <ul className="cd-products-columns" style={{ width: `${props.width}px` }}>
    {_.map(props.products, product => (
      <CompareItem
        key={product.id}
        {...product}
        handleSelectProduct={() => props.handleSelectProduct(product.id)}
      />
    ))}
  </ul>
);

CompareItems.propTypes = {};

export default CompareItems;
