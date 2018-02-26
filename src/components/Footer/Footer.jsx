import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import footerBottom from '../../assets/img/footer/bottom.png';
class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                    <Grid>
                        <div className="footers">
                            <Row>
                                <Col lg={3} md={3} sm={3} xs={3}>
                                    <h3 className="title">
                                        information
                                    </h3>
                                    <nav>
                                        <ul>
                                            <li>
                                                <a href="#">about us</a>
                                            </li>
                                            <li>
                                                <a href="#">contact us</a>
                                            </li>
                                            <li>
                                                <a href="#">all collectio</a>
                                            </li>
                                            <li>
                                                <a href="#">privacy policy</a>
                                            </li>
                                            <li>
                                                <a href="#">terms & condition</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </Col>
                                <Col lg={3} md={3} sm={3} xs={3}>
                                    <h3 className="title">custom links</h3>
                                    <nav>
                                        <ul>
                                            <li>
                                                <a href="#">phones and tablets</a>
                                            </li>
                                            <li>
                                                <a href="#">home entertainment</a>
                                            </li>
                                            <li>
                                                <a href="#">video games & toys</a>
                                            </li>
                                            <li>
                                                <a href="#">cameras & drones</a>
                                            </li>
                                            <li>
                                                <a href="#">homes,kitchen & tools</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </Col>
                                <Col lg={3} md={3} sm={3} xs={3}>
                                    <h3 className="title"> my account </h3>
                                    <nav>
                                        <ul>
                                            <li><a href="#">my orders</a></li>
                                            <li><a href="#">my credit slips</a></li>
                                            <li><a href="#">my addresses</a></li>
                                            <li><a href="#">my personal info</a></li>
                                            <li><a href="#">my vouchers</a></li>
                                        </ul>
                                    </nav>
                                </Col>
                                <Col lg={3} md={3} sm={3} xs={3}>
                                    <h3 className="title">why choose us</h3>
                                    <nav>
                                        <ul>
                                            <li><a href="#">about us</a></li>
                                            <li><a href="#">blog</a></li>
                                            <li><a href="#">company</a></li>
                                            <li><a href="#">investor relations</a></li>
                                            <li><a href="#">typography</a></li>
                                        </ul>
                                    </nav>
                                </Col>
                            </Row>
                        </div>
                        <div className="copyright">
                            <Row>    
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <p>Copyright &copy; {(new Date()).getFullYear()} xxxxxxx all rights reserved. Powered by xxxxxxx</p>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <img src={footerBottom}  alt="payment-method"/>
                                </Col>
                            </Row>
                        </div>
                    </Grid>
                  </footer>
        )
    }
}
export default Footer;