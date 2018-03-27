import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Nav, NavItem, Tab } from "react-bootstrap";
import Home from "./Home";
import Profile from "./Profile/Profile";
import noAvatar from "../../assets/img/no-avatar.png";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { translate } = this.props;
    const { user } = this.props.auth;
    const avatar = user ? (user.picture ? user.picture : noAvatar) : "";
    return (
      <section className="section-dashboard">
        <Grid>
          <Row>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Col md={12}>
                <Col sm={3}>
                  <div className="sidebar">
                    <div className="sidebar-user">
                      <div className="image" />
                      <div className="content">
                        <div className="author">
                          <img
                            className="avatar border-gray"
                            src={avatar}
                            alt="..."
                          />
                          <h4 className="title">
                            {user && `${user.firstName} ${user.lastName}`}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar-nav">
                      <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="first">
                          <i className="pe-7s-home" />
                          {translate("home")}
                        </NavItem>
                        <NavItem eventKey="second">
                          <i className="pe-7s-users" />
                          {translate("profile")}
                        </NavItem>
                      </Nav>
                    </div>
                  </div>
                </Col>
                <Col sm={9}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                      <Home {...this.props} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Profile {...this.props} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Col>
            </Tab.Container>
          </Row>
        </Grid>
      </section>
    );
  }
}
Dashboard.propTypes = {
  translate: PropTypes.func.isRequired
};

export default Dashboard;
