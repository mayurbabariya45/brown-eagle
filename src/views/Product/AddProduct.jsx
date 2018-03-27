import React from "react";
import className from "classnames";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import Tabs from "./Tabs";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hanldeSubmitForm = this.hanldeSubmitForm.bind(this);
  }
  hanldeSubmitForm(value) {}
  render() {
    const { translate } = this.props;
    return (
      <section className="add-product-wrapper">
        <Grid>
          <Row>
            <div className="add-product">
              <Col md={12}>
                <div className="section-header">
                  <h5>{translate("a_new_product")}</h5>
                </div>
                <Tabs
                  {...this.props}
                  hanldeSubmitForm={this.hanldeSubmitForm}
                />
              </Col>
            </div>
          </Row>
        </Grid>
      </section>
    );
  }
}

AddProduct.propTypes = {};

export default AddProduct;
