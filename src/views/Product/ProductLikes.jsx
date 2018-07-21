import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import product1 from "../../assets/img/products/product1.png";

const preloader = () => <ContentLoader height={300} inFight />;
const staticProducts = [
    {
      id: "1",
      name: "Safescan 2210 Banknote Counter",
      productPictures: [product1],
      productPrice: 10,
      totalRatingsCount: 1
    },
    {
      id: "2",
      name: "Safescan 2210 Banknote Counter",
      productPictures: [product1],
      productPrice: 10,
      totalRatingsCount: 1
    },
    {
      id: "3",
      name: "Safescan 2210 Banknote Counter",
      productPictures: [product1],
      productPrice: 10,
      totalRatingsCount: 1
    },
    {
      id: "4",
      name: "Safescan 2210 Banknote Counter",
      productPictures: [product1],
      productPrice: 10,
      totalRatingsCount: 1
    },
    {
      id: "5",
      name: "Safescan 2210 Banknote Counter",
      productPictures: [product1],
      productPrice: 10,
      totalRatingsCount: 1
    },
    {
      id: "6",
      name: "Safescan 2210 Banknote Counter",
      productPictures: [product1],
      productPrice: 10,
      totalRatingsCount: 1
    },
    {
      id: "7",
      name: "Safescan 2210 Banknote Counter",
      productPictures: [product1],
      productPrice: 10,
      totalRatingsCount: 1
    }
  ];
const ProductLikes = props => (
  <div className="product-likes">
    <div className="product-likes-inner">
      <div className="likes-title">
        <h2>{props.translate("product_like_title")}</h2>
      </div>
      <div className="like-products">
        <ul>
            {
                _.map(staticProducts, (product) => {
                    return(
                        <li key={product.id}>
                            <Link to="/">
                                <div className="image-container">
                                    <ImageLoader
                                        preloader={preloader}
                                        src={product.productPictures[0]}
                                        className="img-responsive"
                                    />
                                </div>
                                <div className="product-details">
                                    <h3 title={product.name}>{product.name}</h3>
                                    <p>{props.translate("product_price")}€ {product.productPrice.toFixed(2)}</p>
                                </div>
                            </Link>
                        </li>
                    )
                })
            }
            
        </ul>
      </div>
    </div>
  </div>
);

ProductLikes.propTypes = {
  translate: PropTypes.func.isRequired
};

export default ProductLikes;
