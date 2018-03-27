import React, { Component } from "react";
import Modal from "../../components/Modal/Modal";
import Button from "../../elements/CustomButton/CustomButton";
import Login from "./Login";
import Register from "./Register";
import Message from "./OtpMessage";
import Logo from "../../assets/img/logo.png";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: "default",
      showBackButton: false
    };
    this.handleOnClickButton = this.handleOnClickButton.bind(this);
    this.handleOnClickBackButton = this.handleOnClickBackButton.bind(this);
  }
  handleOnClickButton(tab) {
    this.setState({ showContent: tab, showBackButton: true });
  }
  handleOnClickBackButton() {
    this.setState({ showContent: "default" });
  }
  render() {
    const { authShow } = this.props.auth;
    const { authModal } = this.props;
    let content;
    switch (this.state.showContent) {
      case "login":
        content = (
          <div className="content">
            <div className="login brand-logo">
              <a href="/#/">
                <img src={Logo} alt="Brown Eagle" />
              </a>
            </div>
            <Login />
          </div>
        );
        break;
      case "register":
        content = (
          <div className="content">
            <div className="register brand-logo">
              <a href="/#/">
                <img src={Logo} alt="Brown Eagle" />
              </a>
            </div>
            <Register />
          </div>
        );
        break;
      case "opt":
        content = (
          <div className="content">
            <div className="otp brand-logo">
              <a href="/#/">
                <img src={Logo} alt="Brown Eagle" />
              </a>
            </div>
            <Message />
          </div>
        );
        break;
      default:
        content = (
          <div className="content">
            <div className="brand-logo-flex">
              <a href="/#/">
                <img src={Logo} alt="Brown Eagle" />
              </a>
            </div>
            <div className="buttons">
              <Button
                block
                border
                bsStyle="warning"
                onClick={() => this.handleOnClickButton("login")}
              >
                Login
              </Button>
              <Button
                block
                border
                bsStyle="warning"
                onClick={() => this.handleOnClickButton("register")}
              >
                Register
              </Button>
            </div>
          </div>
        );
        break;
    }

    return (
      <Modal
        className="login-modal"
        bHeader={
          this.state.showBackButton && (
            <div className="back-button" onClick={this.handleOnClickBackButton}>
              {" "}
              <i className="fa fa-chevron-left" />{" "}
            </div>
          )
        }
        show={authShow}
        bsSize="small"
        onHide={authModal}
        bContent={content}
      />
    );
  }
}

export default Auth;
