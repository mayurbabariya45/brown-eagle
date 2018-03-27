import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import FormInputs from '../FormInputs/FormInputs';
import {email, required} from '../../formValidationRules/FormValidationRules';
class NewsLetter extends Component {
    render() {
        const {translate,handleSubmit, submitting } = this.props;
        return (
            <section className="news-letter">
                <Grid>
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <div className='card card-stats'>
                                <div className="content">
                                    <Row>
                                        <Col xs={1}>
                                            <div className="icon-big">
                                                <i className="pe-7s-mail-open-file"></i>
                                            </div>
                                        </Col>
                                        <Col xs={10}>
                                            <div className="small-content">
                                                {translate("sign_up_to")}
                                                <h4>{translate("newsletter")}</h4>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <form onSubmit={handleSubmit}>
                                <FormInputs
                                    ncols={["col-md-12"]}
                                    proprieties={[{
                                        inputGroup: "button",
                                        type: "email",
                                        bsClass: "form-control",
                                        placeholder: "Enter your Email",
                                        name: "new_letter",
                                        validate: [
                                            email, required
                                        ],
                                        bsStyle: {
                                            bsStyle: "warning",
                                            fill: true,
                                            type:'submit',
                                            disabled:submitting
                                        },
                                        bsText: "Subscribe"
                                    }
                                ]}/>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
}
export default NewsLetter;