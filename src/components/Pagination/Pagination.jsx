import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Col, Row, Pagination} from 'react-bootstrap';

class Paginations extends Component {
    render() {
        let items = [];
        for (var i = 1; i <= 10; i++) {
            items.push(
                <Pagination.Item key={i} active={ i === 5 ? true:false}>{i}</Pagination.Item>
            )
        }
        return (
            <div className="paginations">
                <Row>
                    <Col sm={12}>
                        <span className="pager">
                            <span>Page 34 of 154</span>
                        </span>
                        <div className="previous">
                            <Link to="#">
                                <span>Previous</span>
                            </Link>
                        </div>
                        <Pagination>
                            {items}
                        </Pagination>
                        <div className="next">
                            <Link
                                to="#">
                                <span>Next</span>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Paginations;