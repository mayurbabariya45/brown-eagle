import React,{Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class NewsLetter extends Component{
    render(){
        return(
            <div className="news-letter">
                <Row>
                    <Grid>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            
                        </Col>
                    </Grid>
                </Row>           
            </div>
        )
    }
}
export default NewsLetter;