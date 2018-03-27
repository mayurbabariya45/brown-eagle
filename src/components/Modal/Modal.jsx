import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
class Modals extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            show,
            onHide,
            bsSize,
            bContent,
            bHeader,
            bFooter,
            className
        } = this.props;
       
        return (
            <Modal
                show={show}
                onHide={onHide}
                bsSize={bsSize}
                className={className}
                aria-labelledby="contained-modal">
                {bHeader && <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{bHeader}</Modal.Title>
                </Modal.Header>}
                <Modal.Body>
                    {bContent}
                </Modal.Body>
                {bFooter && <Modal.Footer>
                   {bFooter}
                </Modal.Footer>}
            </Modal>
        )
    }
}

export default Modals;