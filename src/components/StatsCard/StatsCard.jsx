import React, { Component } from 'react';
import Classnames from 'classnames'
import { Row, Col } from 'react-bootstrap';

class StatsCard extends Component{
    render(){
        return(
            <div className={Classnames('card card-stats',{'border-l':this.props.broderLeft})}>
                <div className="content">
                    <Row>
                        <Col xs={3}>
                            <div className="icon-big text-right icon-warning">
                                {this.props.bigIcon}
                            </div>
                        </Col>
                        <Col xs={9}>
                            <div className="small-content">
                                <p>{this.props.statsText}</p>
                                {this.props.statsValue}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default StatsCard