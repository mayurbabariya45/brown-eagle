import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Table } from "react-bootstrap";

class CompareProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="compare-product-section">
        <Grid>
          <Row>
            <Col md={12}>
              <div className="compare-title">
                <h1>
                  Compare Box <small>Selected 0/5</small>
                </h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="product-compare-table">
                <Row>
                  <Col md={12}>
                    <div className="product-table-header">
                      <h2>Compare result</h2>
                    </div>
                  </Col>
                </Row>
                <div className="product-table-view">
                  <Table responsive>
                    <tbody>
                      <tr></tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

CompareProduct.propTypes = {};

export default CompareProduct;
