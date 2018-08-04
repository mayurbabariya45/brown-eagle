import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import Tabs from "./Tabs";

class Plans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const { getPlans, getServices } = this.props;
    getPlans();
    getServices();
  }
  render() {
    const {
      translate,
      plans,
      plansNames,
      services,
      servicesLoading,
      plansLoading,
      locale
    } = this.props;
    return (
      <section className="section-plans">
        <Grid>
          <Row>
            <Col md={12}>
              <div className="section-page-header">
                <h5>{translate("p_title_text")}</h5>
              </div>
              <Tabs
                translate={translate}
                headers={plansNames}
                locale={locale}
                plans={plans}
              />
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

Plans.propTypes = {
  translate: PropTypes.func.isRequired,
  getPlans: PropTypes.func.isRequired,
  getServices: PropTypes.func.isRequired,
  servicesLoading: PropTypes.bool.isRequired,
  plansLoading: PropTypes.bool.isRequired
};

export default Plans;
