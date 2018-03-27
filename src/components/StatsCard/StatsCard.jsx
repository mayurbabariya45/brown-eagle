import React, { Component } from "react";
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

export default StatsCard;
