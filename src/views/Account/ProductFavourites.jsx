import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import BlockUi from "react-block-ui";
import ProductList from "./Products/ProductList";

class ProductFavourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRemoveWishlist = this.handleRemoveWishlist.bind(this);
  }
  componentWillMount() {
    const { getWishList, buyerId } = this.props;
    if (buyerId) {
      getWishList(buyerId);
    }
  }
  handleRemoveWishlist(value) {
    const {
      removeWishListProduct,
      buyerId,
      showNotification,
      locale
    } = this.props;
    removeWishListProduct(buyerId, value, locale).then(response => {
      if (response.type === "REMOVE_WISHLIST_FAILURE") {
        showNotification(
          <span data-notify="icon" className="pe-7s-shield" />,
          <div>{response.payload.response.message}</div>,
          true
        );
      } else if (response.type === "REMOVE_WISHLIST_SUCCESS") {
        showNotification(
          <span data-notify="icon" className="pe-7s-check" />,
          <div>Favourite Product has been deleted successfully.</div>,
          false
        );
      }
    });
  }
  render() {
    const { translate, loading, wishList, locale } = this.props;
    const { products } = wishList;
    return (
      <div className="account-wishlists">
        <Row>
          <Col md={12}>
            <div className="section-header">
              <div className="title">
                <h5>{translate("my_favourites")}</h5>
              </div>
            </div>
          </Col>
        </Row>
        <BlockUi tag="div" blocking={loading}>
          <Row>
            <Col md={12}>
              <div className="wishlist-product">
                <ProductList
                  locale={locale}
                  products={products}
                  handleRemoveWishlist={this.handleRemoveWishlist}
                />
              </div>
            </Col>
          </Row>
        </BlockUi>
      </div>
    );
  }
}

ProductFavourites.propTypes = {
  translate: PropTypes.func.isRequired,
  getWishList: PropTypes.func.isRequired,
  removeWishListProduct: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired
};

export default ProductFavourites;
