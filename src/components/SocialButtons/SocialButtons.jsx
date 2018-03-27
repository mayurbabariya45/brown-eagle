import React, { Component } from 'react';
import {ControlLabel} from 'react-bootstrap';
import Button from '../../elements/CustomButton/CustomButton';
class SocialButtons extends Component{
    render(){
        return(
            <div className="social-buttons">
                <ControlLabel>Share:</ControlLabel>
                <div className="share-button">
                    <Button round social className="btn-facebook"><i className="fa fa-facebook"> </i></Button>
                    <Button round social className="btn-twitter"><i className="fa fa-twitter"> </i></Button>
                    <Button round social className="btn-google"><i className="fa fa-google-plus"> </i></Button>
                </div>
            </div>
        )
    }
}

export default SocialButtons;