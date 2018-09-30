import _ from "lodash";
import React from "react";
import classname from "classnames";
import { getCurrency } from "../../variables/Variables";
import ImageLoader from "../../components/ImageLoader/ImageLoader";
import ContentLoader from "../../components/Loader/Loader";
import defaultImage from "../../assets/img/no-product.png";
import Button from "../../elements/CustomButton/CustomButton";

const preloader = () => <ContentLoader height={300} inFight />;

const CompareItem = props => (
  <li className={classname("product", { selected: props.selected })}>
    <div className="top-info">
      <div className="check" onClick={props.handleSelectProduct} />
      <div className="action-delete" onClick={props.handleRemoveProduct}>
        <i className="pe-7s-trash" />
      </div>
      <ImageLoader
        preloader={preloader}
        src={
          !_.isEmpty(props.productPictures)
            ? props.productPictures[0].url
            : defaultImage
        }
        className="img-responsive"
      />
      <h3>{props.name}</h3>
    </div>
    <ul className="cd-features-list">
      <li>
        {getCurrency(props.currency)}
        {props.productPrice.toFixed(2)}
      </li>
      <li className="rate">
        <div className="rating-result" title={`${props.rating / 5 * 100}%`}>
          <span
            style={{
              width: `${props.rating / 5 * 100}%`
            }}
          >
            <span>{`${props.rating / 5 * 100}%`}</span>
          </span>
        </div>
      </li>
      <li>{props.totalRatingsCount}</li>
      <li>{props.keywords.join(",")}</li>
      <li>{props.minQuantity}</li>
      <li>{props.productAvailability ? "YES" : "NO"}</li>
    </ul>
  </li>
);

CompareItem.propTypes = {};

export default CompareItem;
