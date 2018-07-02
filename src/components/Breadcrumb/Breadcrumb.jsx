import _ from "lodash";
import React from "react";
import { Breadcrumb } from "react-bootstrap";

const Breadcrumbs = props => (
  <Breadcrumb>
    <Breadcrumb.Item href="/#/">Home</Breadcrumb.Item>
    {_.map(props.breadcrumb, (breadcrumb, index) => (
      <Breadcrumb.Item
        key={index}
        href={breadcrumb.pathname}
        active={props.breadcrumb.length - 1 === index}
      >
        {breadcrumb.name}
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
);
export default Breadcrumbs;
