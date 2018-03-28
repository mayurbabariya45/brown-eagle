import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Row, Col } from "react-bootstrap";

const StatsCard = props => (
  <div
    className={classNames("card card-stats", {
      "border-l": props.broderLeft,
      "card-numbers": props.numbers
    })}
  >
    <div className="content">
      <Row>
        <Col xs={props.fxs}>
          {props.number !== undefined ? (
            <div className="numbers">{props.number}</div>
          ) : (
            ""
          )}
          <div className="icon-big text-right icon-warning">
            {props.bigIcon}
          </div>
        </Col>
        <Col xs={props.lxs}>
          <div className="small-content">
            <p>{props.statsText}</p>
            {props.statsValue}
          </div>
        </Col>
      </Row>
    </div>
  </div>
);
StatsCard.propTypes = {
  fxs: PropTypes.number,
  lxs: PropTypes.number,
  statsText: PropTypes.string,
  statsValue: PropTypes.string,
  bigIcon: PropTypes.object,
  number: PropTypes.number,
  broderLeft: PropTypes.bool,
  numbers: PropTypes.bool
};
StatsCard.defaultProps = {
  fxs: 3,
  lxs: 3,
  statsText: "",
  statsValue: "",
  bigIcon: {},
  number: null,
  broderLeft: false,
  numbers: false
};
export default StatsCard;
