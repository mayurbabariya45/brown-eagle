import React from "react";
import {
  Row,
  Col,
  ControlLabel,
  FormControl,
  FormGroup
} from "react-bootstrap";
import { Card } from "../../components/Card/Card";

const Profile = props => {
  const { translate } = props;
  const { user, loading } = props.auth;
  return (
    <div className="profile">
      <Row>
        <Col md={12}>
          <Row>
            <Card
              className="card-profile"
              plain
              footer
              header={
                <div className="header card-header-action">
                  <h4 className="title">
                    {user && `${user.firstName} ${user.lastName}`}
                  </h4>
                  <div className="actions-label">
                    <div className="action">IN</div>
                  </div>
                </div>
              }
              content={
                <Row>
                  <Col md={6} xs={12}>
                    <FormGroup>
                      <ControlLabel>at</ControlLabel>
                      <FormControl.Static>
                        {user && `${user.firstName} ${user.lastName}`}
                      </FormControl.Static>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Email</ControlLabel>
                      <FormControl.Static>
                        {user && user.email}{" "}
                        {user.isEmailVerified && (
                          <span className="label label-info">verified</span>
                        )}
                        {!user.isEmailVerified && (
                          <span className="label label-warning">pending</span>
                        )}
                      </FormControl.Static>
                    </FormGroup>
                  </Col>
                  <Col md={6} xs={12}>
                    <FormGroup>
                      <ControlLabel>Joined BrownEgle.com in</ControlLabel>
                      <FormControl.Static>2018</FormControl.Static>
                    </FormGroup>
                  </Col>
                </Row>
              }
            />
          </Row>
        </Col>
      </Row>
      {/* <Row>
        <Col md={12}>
          <Row>
            <Card
              className="card-profile"
              plain
              header={
                <div className="header card-header-action">
                  <h4 className="title">{translate("a_billing_address")}</h4>
                  <div className="actions-label">
                    <div className="action action-link">
                      {translate("edit")}
                    </div>
                  </div>
                </div>
              }
            />
          </Row>
        </Col>
      </Row> */}
    </div>
  );
};

export default Profile;
