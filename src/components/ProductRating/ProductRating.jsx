import React from 'react';
import PropTypes from 'prop-types';
import Rating  from "react-rating";
import {
    Modal,
    Row,
    Col,
    ControlLabel,
    FormGroup 
} from "react-bootstrap";
import { FormInputs } from "../FormInputs/FormInputs";
import Button from "../../elements/CustomButton/CustomButton";

const ProductRating = props => {
    const { show, onHide, translate} = props;
    return (
        <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal"
      >
        <Modal.Header closeButton>
            <Modal.Title id="product-rating-modal">
                {translate("product_rating_modal")}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12}>
                    <FormGroup>
                        <Row>
                            <Col xs={2} componentClass="label">{props.translate("product_rating_label_modal")}</Col>
                            <Col xs={10}><Rating /></Col>
                        </Row>
                    </FormGroup>
                </Col>
            </Row>
            <FormInputs
                proprieties={[
                {
                    label: translate("product_review_modal"),
                    type: "text",
                    componentClass: "textarea",
                    style: { height: 100 },
                    bsClass: "form-control form-control-simple",
                    placeholder: translate("product_review_placeholder"),
                    name: "review"
                }
                ]}
            />
        </Modal.Body>
        <Modal.Footer>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Button
                    radius
                    fill
                    bsStyle="warning"
                    className="text-capitalize"
                    type="submit"
                    >
                    {translate("d_submit")}
                    </Button>
                </Col>
            </Row>
        </Modal.Footer>
      </Modal>
    );
};

ProductRating.propTypes = {
    translate: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

export default ProductRating;
