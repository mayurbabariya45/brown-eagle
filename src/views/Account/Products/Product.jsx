import _ from "lodash";
import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageLoader from "../../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../../components/Loader/Loader";
import defaultImage from "../../../assets/img/no-product.png";

const preloader = () => <ContentLoader height={300} inFight />;

const Product = ({ product, handleRemoveWishlist, locale }) => (
  <Col key={product.id} md={4}>
    <div className="product">
      <ImageLoader
        preloader={preloader}
        src={
          !_.isEmpty(product.productPictures)
            ? product.productPictures[0].url
            : defaultImage
        }
        alt={product.name}
      />
      <div className="image_overlay" />
      <div className="view_details" onClick={handleRemoveWishlist}>
        Remove
      </div>
      <div className="stats">
        <div className="stats-container">
          <span className="product_price">{product.price}</span>
          <Link
            to={`/product/${_.kebabCase(product.name)}/${product._id}`}
            className="product_name"
          >
            {product.nameTranslations[locale]}
          </Link>
          <p>{product.descriptionTranslations[locale].substr(0, 20)}</p>
        </div>
      </div>
    </div>
  </Col>
);

Product.propTypes = {};

export default Product;
