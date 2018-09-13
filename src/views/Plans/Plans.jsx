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
  componentWillUnmount(){
    const { flushPlans } = this.props;
    flushPlans();
  }
  render() {
    const {
      translate,
      plans,
      plansNames,
      handleSubmit,
      locale,
      activeTabs,
      selectedPlans,
      selectedPlan,
      payment,
      showNotification,
      auth
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
                activeTabs={activeTabs}
                handleSubmit={handleSubmit}
                translate={translate}
                headers={plansNames}
                locale={locale}
                plans={plans}
                selectedPlans={selectedPlans}
                selectedPlan={selectedPlan}
                payment={payment}
                seller={auth.user ? auth.user.id : ""}
                showNotification={showNotification}
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
  selectedPlans: PropTypes.func.isRequired
};

export default Plans;
