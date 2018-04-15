import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState({ show: true });
      setTimeout(() => {
        this.setState({ show: false });
      }, 2000);
    }
  }
  render() {
    const { success, message } = this.props;
    if (success && this.state.show) {
      return <Alert bsStyle="success">{message}</Alert>;
    }
    return <div />;
  }
}

Notification.propTypes = {
  success: PropTypes.bool.isRequired,
  message: PropTypes.string
};
Notification.defaultProps = {
  message: ""
};
export default Notification;
