import React, { Component } from 'react';
import className from 'classnames';
class CustomRadio extends Component {
    render() {
        const {number,inline,label,...rest} = this.props;
        return (
            <div className={className('radio',{'radio-inline':inline})}>
                <input id={number} {...rest} />
                <label htmlFor={number}>
                    {label}
                </label>
            </div>
        );
    }
}

export default CustomRadio;
