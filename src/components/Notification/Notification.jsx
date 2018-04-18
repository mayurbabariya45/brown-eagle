import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationSystem from "react-notification-system";
import { Alert } from "react-bootstrap";
import { style } from "../../variables/Variables";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationSystem: null
    };
  }
  componentDidMount() {
    const { notificationSystem } = this;
    console.log(notificationSystem);
    const color = Math.floor(Math.random() * 4 + 1);
    let level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: "info",
      position: "bc",
      autoDismiss: 15
    });
  }
  render() {
    const { success, message } = this.props;
    if (success && this.state.show) {
      return <Alert bsStyle="success">{message}</Alert>;
    }
    return (
      <NotificationSystem
        ref={ref => {
          this.notificationSystem = ref;
        }}
        style={style}
      />
    );
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
