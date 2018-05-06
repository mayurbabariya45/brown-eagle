import React, { Component } from "react";
import PropTypes from "prop-types";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openFileUploader = this.openFileUploader.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }
  onChangeFile(event) {
    const { updateAvatar, showNotification, id } = this.props;
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      this.setState({ picture: window.URL.createObjectURL(file) });
      const formData = new FormData();
      formData.append("image", file);
      updateAvatar(formData, id).then(payload => {
        if (payload.type === "UPDATE_AVATAR_SUCCESS") {
          showNotification(
            <span data-notify="icon" className="pe-7s-check" />,
            <div>Profile has been changed successfully.</div>,
            false
          );
        } else {
          showNotification(
            <span data-notify="icon" className="pe-7s-shield" />,
            <div>Profile has not been changed.</div>,
            true
          );
        }
      });
    }
  }
  openFileUploader() {
    this.profileUploader.click();
  }
  render() {
    const { name, avatar, translate, role } = this.props;
    return (
      <div className="author" onClick={this.openFileUploader}>
        <div className="avatar border-gray">
          <img
            src={this.state.picture ? this.state.picture : avatar}
            alt="..."
          />
          <p className="text-label">
            <i className="pe-7s-camera" />
            {translate("upload_text")}
          </p>
          <input
            className="imageUpload"
            ref={input => {
              this.profileUploader = input;
            }}
            onChange={this.onChangeFile}
            type="file"
            name="profile_photo"
            placeholder="Photo"
            capture
          />
        </div>
        <h4 className="title">{name}</h4>
        <h6>
          {role === "seller" ? translate("r_supplier") : translate("r_buyer")}
        </h6>
      </div>
    );
  }
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
  role: PropTypes.string,
  showNotification: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  id: PropTypes.string
};
Avatar.defaultProps = {
  role: "",
  id: ""
};
export default Avatar;
