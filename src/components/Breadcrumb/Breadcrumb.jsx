import React, {Component} from 'react';
import {Breadcrumb} from 'react-bootstrap';

class Breadcrumbs extends Component {
    render() {
        return (
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                    Mobile Phone Accessories 
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Light Equipment Tools</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

export default Breadcrumbs;