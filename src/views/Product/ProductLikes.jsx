import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import defaultImage from "../../assets/img/no-product.png";
import { getCurrency } from "../../variables/Variables";

const preloader = () => <ContentLoader height={300} inFight />;
const ProductLikes = props => (
  <div className="product-likes">
    <div className="product-likes-inner">
      <div className="likes-title">
        <h2>{props.translate("product_like_title")}</h2>
      </div>
      <div className="like-products">
        <ul>
          {_.map(props.products, product => (
            <li key={product.id}>
              <Link to={`/product/${_.kebabCase(product.name)}/${product.id}`}>
                <div className="image-container">
                  <ImageLoader
                    preloader={preloader}
                    src={
                      !_.isEmpty(product.productPictures)
                        ? product.productPictures[0].url
                        : defaultImage
                    }
                    className="img-responsive"
                  />
                </div>
                <div className="product-details">
                  <h3 title={product.name}>{product.name}</h3>
                  <p>
                    {props.translate("product_price")}
                    {getCurrency(product.currency)}{" "}
                    {product.productPrice.toFixed(2)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

ProductLikes.propTypes = {
  translate: PropTypes.func.isRequired
};

export default ProductLikes;
