import _ from "lodash";
import React from "react";
import { Row } from "react-bootstrap";
import Product from "./Product";

const ProductList = props => (
  <Row>
    {_.map(props.products, product => (
      <Product
        key={product.id}
        locale={props.locale}
        product={product.product}
        handleRemoveWishlist={() =>
          props.handleRemoveWishlist(product.product._id)
        }
      />
    ))}
  </Row>
);

ProductList.propTypes = {};

export default ProductList;
