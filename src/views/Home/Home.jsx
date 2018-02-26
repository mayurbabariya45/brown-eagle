import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap';
import Carousels from '../../components/Carousels/Carousels';
import StatsCard from '../../components/StatsCard/StatsCard';
class Home extends Component {
    render() {
        return (
            <div className="home">
                <Carousels/>
                <Grid>
                    <Row>
                        <div className="service-block">
                            <Col lg={3} sm={6}>
                                <StatsCard
                                    broderLeft={true}
                                    bigIcon={<i className = "pe-7s-note2" > </i>}
                                    statsText="Get Quotes"
                                    statsValue="Multiple Request"/>
                            </Col>
                            <Col lg={3} sm={6}>
                                <StatsCard
                                    broderLeft={true}
                                    bigIcon={<i className = "pe-7s-server" > </i>}
                                    statsText="Find"
                                    statsValue="Right Suppliers"/>
                            </Col>
                            <Col lg={3} sm={6}>
                                <StatsCard
                                    broderLeft={true}
                                    bigIcon={<i className = "pe-7s-server" > </i>}
                                    statsText="Money Guarantee"
                                    statsValue="30 Day Money Back"/>
                            </Col>
                            <Col lg={3} sm={6}>
                                <StatsCard
                                    bigIcon={<i className = "pe-7s-server" > </i>}
                                    statsText="Online Support 24/7"
                                    statsValue="Technical Support 24/7"/>
                            </Col>
                        </div>
                    </Row>
                </Grid>
            </div>
        )
    }
}
export default Home;