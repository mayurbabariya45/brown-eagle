import React, {Component} from 'react';
import {Carousel, Grid, Row} from 'react-bootstrap';
import Img1 from '../../assets/img/carousel/anniversary_banner_d.jpg';
class Carousels extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelect = this
            .handleSelect
            .bind(this);
        this.state = {
            index: 0,
            direction: null
        };
    }
    handleSelect(selectedIndex, e) {
        this.setState({index: selectedIndex, direction: e.direction});
    }
    render() {
        const {index, direction} = this.state;
        return (
            <Grid fluid>
                <Row>
                    <Carousel
                        activeIndex={index}
                        direction={direction}
                        onSelect={this.handleSelect}
                        controls={false}>
                        <Carousel.Item>
                            <img alt="900x500" src={Img1}/>
                        </Carousel.Item>
                    </Carousel>
                </Row>
            </Grid>
        )
    }
}
export default Carousels;